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
  whitelistCollections?: string[]
  extractors?: Extractor[]
  useLocale?: boolean
}

export function PurgeIcons(options: PurgeIconsOptions = {}) {

}
