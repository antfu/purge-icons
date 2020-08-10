import axios from 'axios'
import type { IconifyJSON } from '@iconify/iconify'
import { CollectionId } from './generated/collections'
import { IconSource, CollectionCache } from './types'
import { DEFAULT_API_PATH } from './constants'
import { debug } from './utils'

const default_cache: CollectionCache = {}

export async function fetchCollection(
  name: CollectionId,
  source: IconSource = 'auto',
  cache: CollectionCache = default_cache,
  apiPath = DEFAULT_API_PATH,
): Promise<IconifyJSON> {
  if (cache[name])
    return cache[name]!

  if (source === 'local' || source === 'auto') {
    try {
      debug(`fetching collection "${name}" from local packages`)
      const collection = await import(`@iconify/json/json/${name}.json`)
      cache[name] = collection
      return collection
    }
    catch (e) {
      debug(`error on fetching collection "${name}"`, e)
      if (source === 'local')
        throw e
    }
  }

  if (source === 'api' || source === 'auto') {
    try {
      const url = `${apiPath}/${name}.json`
      debug(`loading collection "${name}" from remote ${url}`)
      const { data } = await axios.get(url)
      const collection = typeof data === 'string' ? JSON.parse(data) : data
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
