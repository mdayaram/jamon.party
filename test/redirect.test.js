import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const TARGET = "https://joannama.notion.site/jamon-party";
const html = await readFile(new URL("../public/index.html", import.meta.url), "utf8");

test("meta refresh points at the Notion page", () => {
  assert.match(html, new RegExp(`<meta http-equiv="refresh" content="0; url=${TARGET}">`));
});

test("JS redirect points at the Notion page", () => {
  assert.ok(html.includes(`window.location.replace("${TARGET}")`));
});

test("fallback link points at the Notion page", () => {
  assert.ok(html.includes(`<a href="${TARGET}">`));
});
