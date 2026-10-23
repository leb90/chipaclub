// Genera public/data/calles-valencia.json: las calles de València con nombre, de OpenStreetMap
// (© colaboradores de OpenStreetMap, licencia ODbL), para sugerir calles al instante en el
// formulario. Cada fila es [nombre oficial, ...otras formas (castellano, nombres anteriores)].
// Uso: node scripts/calles-valencia.mjs   (volver a correrlo si cambian calles; Overpass a veces
// está saturado: probar más tarde). Con un archivo, usa esa respuesta de Overpass ya descargada:
// node scripts/calles-valencia.mjs respuesta.json
import { readFileSync, writeFileSync } from "node:fs";

const QUERY = `[out:json][timeout:90];
area(3600344953)->.city;
(
  way(area.city)["highway"~"^(primary|secondary|tertiary|residential|living_street|pedestrian|unclassified|trunk)$"]["name"];
  way(area.city)["place"="square"]["name"];
);
out tags;`;
const SERVERS = ["https://overpass-api.de/api/interpreter", "https://overpass.private.coffee/api/interpreter"];

let data = process.argv[2] ? JSON.parse(readFileSync(process.argv[2], "utf8")) : null;
for (const url of data ? [] : SERVERS) {
  try {
    const res = await fetch(url, { method: "POST", body: new URLSearchParams({ data: QUERY }), headers: { "user-agent": "chipaclub-build (+https://chipaclub.es)" } });
    if (res.ok) { data = await res.json(); break; }
    console.error(`${url}: ${res.status}`);
  } catch (e) {
    console.error(`${url}: ${e.message}`);
  }
}
if (!data) throw new Error("ningún servidor de Overpass respondió; probá de nuevo en un rato");

const streets = new Map();
for (const { type, tags = {} } of data.elements) {
  if (type === "relation" || !tags.name || tags.name.length < 3) continue;
  const forms = streets.get(tags.name) ?? new Set();
  for (const key of ["name:es", "alt_name", "old_name"]) if (tags[key] && tags[key] !== tags.name) forms.add(tags[key]);
  streets.set(tags.name, forms);
}
const rows = [...streets].map(([name, forms]) => [name, ...[...forms].sort()]).sort((a, b) => a[0].localeCompare(b[0], "ca"));
writeFileSync(new URL("../public/data/calles-valencia.json", import.meta.url), JSON.stringify(rows));
console.log(`${rows.length} calles → public/data/calles-valencia.json`);
