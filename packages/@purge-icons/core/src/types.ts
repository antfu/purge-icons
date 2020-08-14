import type { IconifyJSON } from '@iconify/types'
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
  included?: string[]
  // TODO:
  includedCollections?: CollectionId[]
  defaultExtractor?: Extractor
  extractors?: Extractor[]
  iconSource?: IconSource
  remoteDataAPI?: string
  iconifyImportName?: string
  format?: OutputFormat
}

export type IconSource = 'local' | 'remote' | 'auto'
export type OutputFormat = 'mjs' | 'cjs' | 'ts' | 'json' | 'js'

export type CollectionCache = Partial<Record<CollectionId, IconifyJSON>>
