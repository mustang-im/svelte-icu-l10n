import { FormatValues } from "@ultraq/icu-message-formatter";
/**
 * Loads messages and sets the locale
 * @param locale
 * @param msgs
 */
export declare function setLocale(locale: string, msgs: Record<string, string>): void;
export declare function plural(num: number, variations: Record<string, string>): string;
/**
 * Interpolates and translates the given string
 * ```
 * $t`${num} apples`
 * ```
 * @param descriptor
 * @param values
 * @returns translated string
 */
export declare function t(descriptor: TemplateStringsArray, ...args: any[]): string;
/**
 * Translates based on a message descriptor and values
 * @param descriptor
 * @param values
 * @returns translated string
 */
export declare function translateString(descriptor: MessageDescriptor, values: FormatValues): string;
export interface L10nConfig {
    locale?: string;
    messages?: object;
}
export interface MessageDescriptor {
    id: string;
    defaultMessage: string;
    description?: string;
}
