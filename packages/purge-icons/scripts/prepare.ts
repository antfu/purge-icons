import collections from '@iconify/json/collections.json'
import fs from 'fs-extra'

(async() => {
  for (const f of ['README.md', 'LICENSE'])
    await fs.copyFile(`../../${f}`, `./${f}`)

  await fs.ensureDir('./src/generated')
  await fs.writeFile('./src/generated/collections.ts', `
export type CollectionId = ${Object.keys(collections).map(i => `'${i}'`).join(' | ')}

export const CollectionIds: Array<CollectionId> = [
${Object.keys(collections).map(i => `  '${i}'`).join(',\n')}
]

export const ExtractorRegex = /(?:${Object.keys(collections).join('|')}):[\\w\\d-]+/g
`, 'utf-8')
})()
