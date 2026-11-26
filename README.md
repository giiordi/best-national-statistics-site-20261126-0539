# Nusaraya in numbers

An original, offline national statistics portal for the fictional archipelago of Nusaraya. Deep teal, warm sand and coral frame a complete statistical record for 2019–2026. Every number comes from the single authored dataset; sources and reference years accompany the views.

## Explore

Overview, Population, Economy, Regions with twelve linked provincial profiles, Labour, Prices & inflation, Education & health, Environment, searchable and sortable Data tables, and Methodology & notes. SVG charts offer native value tooltips. Year, geographic scope, chart type and sensible unit controls update the views. Filtered tables export as CSV.

## Run locally

No dependencies or build step. From the repository root, run:

```sh
python3 -m http.server 8080 --directory app
```

Open localhost on port 8080 in a browser. Once served, all assets and content are local; the application makes no external requests. ES modules require a static server rather than opening the HTML with a file URL. Mobile layouts support 390px widths.

Screenshot hooks: `?shot=overview`, `?shot=economy`, `?shot=regions`, `?shot=table`. Normal navigation uses the hash routes shown by the navigation links. The local submission workflow supplies real screenshots under `screenshots/`; this builder does not create that directory.

## Hand-in

Node 22.18 or newer runs `main.ts`. It copies `app/` and `screenshots/` to the directory specified by `MAKEFUN_OUTPUT_DIR` (default `/output`) and writes the official dossier using the unchanged kit library. Supply three or four genuine screenshots before the hand-in run. A missing screenshot directory produces an actionable error, rather than an invented image.

The figures are internally consistent fictional illustrations, not real-world official measurements. See Methodology for denominators, source names, regional allocations and the provisional status of the 2026 annual estimates.

MIT license · Copyright 2026 giiordi.

make.fun referral code: **v0wjehd6**
