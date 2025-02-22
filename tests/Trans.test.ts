import { expect, it } from "vitest";
import { render, screen, cleanup } from '@testing-library/svelte';
import Trans from "../svelte/Trans.svelte";
import { locale } from '../svelte';

it("Trans component should render correctly", () => {
  render(Trans, { msg: "Press # to continue..."});
  expect(screen.getByText("Press to continue...")).toBeDefined();
});

it("Trans component should translate correctly", () => {
  const messages = {
    "zV1WgN": "Klik # om door te gaan...",
  };
  locale.set("nl", messages);

  render(Trans, { msg: "Press # to continue..." });
  expect(screen.getByText("Klik om door te gaan...")).toBeDefined();
});