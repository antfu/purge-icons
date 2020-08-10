import path from 'path'
import fg from 'fast-glob'
import fs from 'fs-extra'
import { PurgeIconsOptions, RawContent, Extractor } from './types'
import { CollectionId, CollectionIds, ExtractorRegex } from './generated/collections'
import { fetchCollection } from './loader'
import { debug } from './utils'

export const Delimiter = ':'

export async function PurgeIcons(options: PurgeIconsOptions = {}) {
  const icons = await Extract(options)
  const code = await CodeGen([...icons, ...(options.whitelist || [])], options)
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
    const [collection, name] = icon.split(Delimiter, 2)
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

export async function GetIconsData(icons: string[], options: PurgeIconsOptions = {}) {
  const parsed = ParseIconNames(icons)
  return await Promise.all(
    Object
      .entries(parsed)
      .map(
        async([id, icons]) => {
          const collection = await fetchCollection(id as CollectionId, options.iconSource, undefined, options.apiPath)
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

  return `
import Iconify from '@iconify/iconify'
  
const collections = JSON.parse('${JSON.stringify(data).replace(/'/g, '\\\'')}')

collections.forEach(c => Iconify.addCollection(c))

export default Iconify`
}
