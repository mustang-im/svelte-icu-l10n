import { expect, test } from 'vitest';
import { setLocale, t, plural } from '../core';

test('Translation', () => {
  let messages = {
    'eiHe3D': 'Hola, {0}!',
    "bxDnZ3": "{num, plural, one {día} other {días}}",
    "D5kr64": "Pulse # para continuar",
  };
  setLocale('es', messages);
  let name = "Alice";
  expect(t`Hello, ${name}!`).toBe('Hola, Alice!');
  expect(t`${name}, Hello!`).that.toBe('Alice, Hello!');

  expect(plural(1, { one: "day", other: "days" })).toBe("día");
  expect(plural(2, { one: "day", other: "days" })).toBe("días");

  expect(t`Press # to continue`).toBe('Pulse # para continuar');
  expect(t(["Press # to continue"])).toBe('Pulse # para continuar');
});