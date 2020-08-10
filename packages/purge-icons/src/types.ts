import type { IconifyJSON } from '@iconify/iconify'
import { CollectionId } from './generated/collections'

export type ExtractorResult = string[]
export type ExtractorFunction<T = string> = (content: T) => ExtractorResult

export interface RawContent {
  extension: string
  raw: string
}

export interface Extractor {
  extensions: string[]
  extractor: ExtractorFunction
}

export interface PurgeIconsOptions {
  content?: (string | RawContent)[]
  whitelist?: string[]
  whitelistCollections?: CollectionId[]
  defaultExtractor?: Extractor
  extractors?: Extractor[]
  iconSource?: IconSource
  apiPath?: string
}

export type IconSource = 'local' | 'api' | 'auto'

export type CollectionCache = Partial<Record<CollectionId, IconifyJSON>>
