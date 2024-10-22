import language from './langs';


/**
 * Main Epub info
 */
export interface InfoType {
    i18n: keyof typeof language
    title: string
    author: string
    publisher: string
    description: string
    tags?: [string]
}

/**
 * JSON language configuration fields
 */
export interface LangType {
    code: string
    cover: string
    toc: string
    info: string
    note: string
}

/**
 * Image type configuration
 */
export interface ImgType {
    type: string
    path: string
    alt?: string
}
