import { expect, test } from 'vitest';
import { L10n } from '../lib/L10n';

test('L10n instance creation', () => {
  const l10n = new L10n({ locale: 'en' });
  expect(l10n).toBeTruthy();
});

test('L10n translation', () => {
  const l10n = new L10n({ locale: 'es' });
  l10n.messages = {
    'eiHe3D': 'Hola, {0}!',
  };
  let name = "Alice";
  expect(l10n.t`Hello, ${name}!`).toBe('Hola, Alice!');
  expect(l10n.t`${name}, Hello!`).that.toBe('Alice, Hello!');
});