import path from 'path'
import fg from 'fast-glob'
import fs from 'fs-extra'
import type { IconifyJSON } from '@iconify/iconify'
import { debug } from './utils'
import { ExtractorRegex, CollectionId, CollectionIds } from './generated/collections'
import { fetchCollection } from './loader'
import { PurgeIconsOptions, Extractor, RawContent } from './types'
import { DELIMITER } from './constants'

export async function PurgeIcons(options: PurgeIconsOptions = {}) {
  const icons = await Extract(options)
  const code = await CodeGen([...icons, ...(options.included || [])], options)
  return code
}

export const DefaultExtractor: Extractor = {
  extensions: ['*'],
  extractor(str: string) {
    return Array.from(str.matchAll(ExtractorRegex)).map(i => i[0]).filter(Boolean)
  },
}

export async function Extract(options: PurgeIconsOptions = {}) {
  const content = options.content || []
  const fileGlobs = content.filter(i => typeof i === 'string') as string[]
  const rawContents = content.filter(i => typeof i !== 'string') as RawContent[]
  const filenames = await fg(fileGlobs, {
    onlyFiles: true,
    ignore: [
      '**/node_modules',
    ],
  })

  const files: RawContent[] = [
    ...rawContents,
    ...await Promise.all(
      filenames.map(async(f) => {
        debug(`extracting from ${f}`)
        return {
          extension: path.extname(f),
          raw: await fs.readFile(f, 'utf-8'),
        }
      }),
    ),
  ]

  const extractors = [options.defaultExtractor || DefaultExtractor, ...(options.extractors || [])]

  const keys = new Set<string>()

  for (const file of files) {
    // TODO: by extension
    for (const extractor of extractors) {
      const result = await Promise.resolve(extractor.extractor(file.raw))
      for (const key of result)
        keys.add(key)
    }
  }

  return Array.from(keys)
}

export function VerifyCollection(name: string): name is CollectionId {
  return CollectionIds.includes(name as CollectionId)
}

export function ParseIconNames(icons: string[]) {
  const parsed: Partial<Record<CollectionId, string[]>> = {}

  for (const icon of icons) {
    const [collection, name] = icon.split(DELIMITER, 2)
    if (!VerifyCollection(collection)) {
      throw new Error(`Invalid collection name: "${collection}"`)
    }
    else {
      if (!parsed[collection])
        parsed[collection] = []
      parsed[collection]?.push(name)
    }
  }

  return parsed
}

export async function GetIconsData(icons: string[], options: PurgeIconsOptions = {}): Promise<IconifyJSON[]> {
  const parsed = ParseIconNames(icons)
  return await Promise.all(
    Object
      .entries(parsed)
      .map(
        async([id, icons]) => {
          const collection = await fetchCollection(id as CollectionId, options.iconSource, options.remoteDataAPI)
          return {
            prefix: id,
            width: collection.width,
            height: collection.height,
            icons: Object.fromEntries(
              Object.entries(collection.icons).filter(([k]) => icons?.includes(k)),
            ),
          }
        },
      ),
  )
}

export async function CodeGen(icons: string[], options: PurgeIconsOptions = {}) {
  const data = await GetIconsData(icons, options)
  const json = JSON.stringify(data)

  if (options.format === 'json')
    return json

  // since Iconify does not ship with esm build yet. It required to use `.default` to get the instance.
  const iconifyImport = options.iconifyImportName || '@iconify/iconify'

  let importScript = ''
  let exportScript = ''

  switch (options.format) {
    case 'js':
    case 'cjs':
      importScript = `const Iconify = require('${iconifyImport}').default`
      exportScript = 'module.exports = Iconify'
      break
    case 'mjs':
    case 'ts':
    case undefined: // default
      importScript = `import Module from '${iconifyImport}'\nconst Iconify = Module.default || Module`
      exportScript = 'export default Iconify'
      break
    default:
      throw new Error(`Unknown output format "${options.format}"`)
  }

  return `${importScript}

const collections = JSON.parse('${json.replace(/\\/g, '\\\\').replace(/'/g, '\\\'')}')

collections.forEach(c => Iconify.addCollection(c))

${exportScript}
`
}
