import { L10n, type L10nConfig } from "./L10n";

let l10n: L10n;

export function createL10n(config: L10nConfig): L10n {
  l10n = new L10n(config);
  return new L10n(config);
}

export function t(descriptor: TemplateStringsArray, ...args: any[]): string {
  if (!l10n) {
    throw new Error('L10n instance not created');
  }
  return l10n.t(descriptor,...args);
}

export function plural(num: number, variations: Record<string, string>): string {
  if (!l10n) {
    throw new Error('L10n instance not created');
  }
  return l10n.plural(num, variations);
}