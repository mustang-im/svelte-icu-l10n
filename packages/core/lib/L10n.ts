import { MessageFormatter, pluralTypeHandler, TypeHandler, type FormatValues } from '@ultraq/icu-message-formatter';
import { generateMessageId } from './utils';

export class L10n {
  locales: string = 'en';
  messages: object = {};
  commentsSeparator: string = "*=>";
  formatter: MessageFormatter;
  typeHandlers: Record<string, TypeHandler>;

  constructor(config: L10nConfig) {
    this.locales = config.locale || 'en';
    this.messages = config.messages || {};
    this.formatter = new MessageFormatter(this.locales, { plural: pluralTypeHandler });
  }

  /**
   * Translates based on a message descriptor and values
   * @param descriptor
   * @param values 
   * @returns translated string
   */
  translateString(descriptor: MessageDescriptor, values: FormatValues): string {
    let message: string;
    if (descriptor.id) {
      message = this.messages[descriptor.id];
    }
    // @ts-ignore
    if (!message) {
      message = descriptor.defaultMessage;
    }
    return this.formatter.format(message, values);
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
  t(descriptor: TemplateStringsArray, ...args: any[]): string {
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

    return this.translateString(msg, values);
  }
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
