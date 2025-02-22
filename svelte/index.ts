import { derived, writable } from "svelte/store";
import { setLocale, t as _t, plural as _plural } from "../core";

function createLocale(defaultLocale = "en-US", defaultMessages = {}) {
	const { subscribe, set } = writable(defaultLocale);

	// Necessary for plural to work; it expects a locale to be set.
  setLocale(defaultLocale, defaultMessages);

	return {
		subscribe,
		set: (locale: string, messages: Record<string, string>) => {
      setLocale(locale, messages);
			set(locale);
		},
	};
}
export const locale = createLocale();

export let gt = _t;
export let t = derived(locale, () => gt);

export let gPlural = _plural;
export let plural = derived(locale, () => gPlural);

export { default as T } from './Trans.svelte';