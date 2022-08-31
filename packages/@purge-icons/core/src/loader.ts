import axios from 'axios'
import type { IconifyJSON } from '@iconify/types'
import type { CollectionId } from './generated/collections'
import type { CollectionCache, IconSource } from './types'
import { DEFAULT_API_PATH } from './constants'
import { debug } from './utils'

const default_cache: CollectionCache = {}

export async function fetchCollection(
  name: CollectionId,
  source: IconSource = 'auto',
  remoteDataAPI = DEFAULT_API_PATH,
  cache: CollectionCache = default_cache,
): Promise<IconifyJSON> {
  if (cache[name])
    return cache[name]!

  if (source === 'local' || source === 'auto') {
    try {
      const { icons: collection } = await import (`@iconify-json/${name}`)
      resolveAliases(collection)

      cache[name] = collection
      // If an error is reported, it will not be printed here
      debug(`fetching collection "${name}" from local packages`)
      return collection
    }
    catch (e) {
      // try to import from `@iconify/json` so do nothing here
    }

    try {
      debug(`fetching collection "${name}" from local packages`)
      const collection = await import(`@iconify/json/json/${name}.json`)
      resolveAliases(collection)

      cache[name] = collection
      return collection
    }
    catch (e) {
      debug(`error on fetching collection "${name}"`, e)
      if (source === 'local')
        throw e
    }
  }

  if (source === 'remote' || source === 'auto') {
    try {
      const url = `${remoteDataAPI}/${name}.json`
      debug(`loading collection "${name}" from remote ${url}`)
      const { data } = await axios.get(url)
      const collection = typeof data === 'string' ? JSON.parse(data) : data
      resolveAliases(collection)

      cache[name] = collection
      return collection
    }
    catch (e) {
      debug(`error on fetching collection "${name}" from remote`, e)
      throw e
    }
  }

  throw new Error(`Unabled to fetch collection "${name}"`)
}


function resolveAliases(collection: IconifyJSON) {
  Object.entries(collection.aliases || {}).forEach(([name, data]) => {
    const { parent: parentIcon, ...other } = data

    const parentIconData = collection.icons[parentIcon]


    collection.icons[name] = {
      ...parentIconData,
      ...other
    }
  })

}