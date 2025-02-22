import { FormatValues, MessageFormatter, pluralTypeHandler } from "@ultraq/icu-message-formatter";
import { generateMessageId } from "./generateMessageId";

const defaultHanlders = { plural: pluralTypeHandler };
let messages: Record<string, string> = {};
let msgCache: Record<string, string> = {};
let formatter: MessageFormatter;

/**
 * Loads messages and sets the locale
 * @param locale 
 * @param msgs 
 */
export function setLocale(locale: string, msgs: Record<string, string>) {
  msgCache = {};
  messages = msgs;
  formatter = new MessageFormatter(locale, defaultHanlders);
}

export function plural(num: number, variations: Record<string, string>) {
  let pluralOptions = "";
  Object.entries(variations).forEach(([key, value]) => {
    pluralOptions += ` ${key} {${value}}`;
  });
  let str = `{num, plural,${pluralOptions}}`;
  let message: MessageDescriptor = {
    id: generateMessageId(str),
    defaultMessage: str,
  };
  return translateString(message, { num });
}

/**
 * Interpolates and translates the given string
 * ```
 * $t`${num} apples`
 * ```
 * @param descriptor 
 * @param values 
 * @returns translated string
 */
export function t(descriptor: TemplateStringsArray, ...args: any[]): string {
  let str: string = "";
  // let segments = descriptor.findIndex((s) => this.commentsSeparator);
  // if (segments.length > 2) {
  //   str = segments[0];
  // }
  str = descriptor[0];
  args.forEach((_arg, i) => {
    str += `{${i}}` + descriptor[i + 1];
  });
  let msg: MessageDescriptor = {
    id: generateMessageId(str),
    defaultMessage: str,
  }
  let values = { ...args };

  return translateString(msg, values);
}

/**
 * Translates based on a message descriptor and values
 * @param descriptor
 * @param values 
 * @returns translated string
 */
export function translateString(descriptor: MessageDescriptor, values: FormatValues): string {
  if (!formatter) {
    throw new Error("Locale not set");
  }
  let message: string = getTranslatedString(descriptor.id) ?? descriptor.defaultMessage;
  try {
    return formatter.format(message, values);
  } catch (ex) {
    return message;
  };
}

function getTranslatedString(strID: string): string {
  if (msgCache[strID]) {
    return msgCache[strID];
  }
  let str = messages[strID];
  msgCache[strID] = str;
  return str;
}

export interface L10nConfig {
  locale?: string;
  messages?: object;
}

export interface MessageDescriptor {
  id: string;
  defaultMessage: string;
  description?: string;
}