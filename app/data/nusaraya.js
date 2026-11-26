// Statistical record of the fictional Republic of Nusaraya. Values are annual.
export const source = 'Nusaraya Statistics Office';
export const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
// Population in millions; GDP, exports and imports in billion current NUR.
export const annual = [
  { year: 2019, population: 44.1, gdp: 286, realGrowth: 4.8, inflation: 2.8, unemployment: 5.8, urban: 56.8, labourForce: 21.4, literacy: 95.9, life: 72.8, enrolment: 92.2, beds: 2.1, forest: 60.1, renewable: 24.2, co2: 2.7, exports: 73, imports: 78 },
  { year: 2020, population: 44.7, gdp: 278, realGrowth: -3.6, inflation: 1.6, unemployment: 7.2, urban: 57.4, labourForce: 21.5, literacy: 96.1, life: 72.4, enrolment: 91.8, beds: 2.2, forest: 59.8, renewable: 25.5, co2: 2.5, exports: 65, imports: 69 },
  { year: 2021, population: 45.3, gdp: 303, realGrowth: 6.2, inflation: 2.4, unemployment: 6.8, urban: 58.0, labourForce: 21.9, literacy: 96.4, life: 72.6, enrolment: 92.5, beds: 2.3, forest: 59.5, renewable: 26.8, co2: 2.6, exports: 78, imports: 80 },
  { year: 2022, population: 45.9, gdp: 332, realGrowth: 5.7, inflation: 5.9, unemployment: 6.3, urban: 58.6, labourForce: 22.3, literacy: 96.7, life: 73.0, enrolment: 93.2, beds: 2.4, forest: 59.2, renewable: 28.0, co2: 2.8, exports: 90, imports: 94 },
  { year: 2023, population: 46.6, gdp: 354, realGrowth: 4.5, inflation: 4.6, unemployment: 6.0, urban: 59.2, labourForce: 22.7, literacy: 97.0, life: 73.3, enrolment: 93.8, beds: 2.5, forest: 58.9, renewable: 29.5, co2: 2.9, exports: 96, imports: 101 },
  { year: 2024, population: 47.3, gdp: 374, realGrowth: 4.1, inflation: 3.7, unemployment: 5.8, urban: 59.8, labourForce: 23.1, literacy: 97.3, life: 73.6, enrolment: 94.4, beds: 2.6, forest: 58.6, renewable: 31.0, co2: 2.9, exports: 102, imports: 107 },
  { year: 2025, population: 47.9, gdp: 392, realGrowth: 3.8, inflation: 3.4, unemployment: 5.6, urban: 60.4, labourForce: 23.5, literacy: 97.6, life: 73.9, enrolment: 94.9, beds: 2.7, forest: 58.3, renewable: 32.5, co2: 2.8, exports: 109, imports: 112 },
  { year: 2026, population: 48.6, gdp: 412, realGrowth: 4.2, inflation: 3.1, unemployment: 5.4, urban: 61.0, labourForce: 23.9, literacy: 97.8, life: 74.2, enrolment: 95.5, beds: 2.8, forest: 58.0, renewable: 34.0, co2: 2.8, exports: 116, imports: 118 }
];
// The twelve population and GDP observations sum to 48.6m and NUR 412bn.
// Map paths are an original schematic, not geographic boundaries.
export const provinces = [
  { id: 'sagara', name: 'Sagara', capital: 'Teluk Sagara', population: 7.8, area: 28000, gdp: 91, industry: 'Finance & logistics', color: '#184f4b', path: 'M87 174 L107 143 143 134 173 150 169 178 142 196 107 191Z', x: 130, y: 169 },
  { id: 'tirana', name: 'Tirana', capital: 'Kota Tirana', population: 6.2, area: 35000, gdp: 66, industry: 'Electronics', color: '#2a6860', path: 'M179 154 L199 133 230 138 251 164 239 188 206 190 181 177Z', x: 215, y: 165 },
  { id: 'banyara', name: 'Banyara', capital: 'Banyu Kota', population: 5.4, area: 42000, gdp: 51, industry: 'Food processing', color: '#3c7d70', path: 'M264 168 L287 157 315 177 328 202 308 219 278 208 260 188Z', x: 293, y: 189 },
  { id: 'meranti', name: 'Meranti', capital: 'Rimba Baru', population: 4.8, area: 61000, gdp: 40, industry: 'Sustainable forestry', color: '#528e7d', path: 'M166 61 L192 37 229 43 249 67 238 100 207 120 182 103 173 83Z', x: 207, y: 78 },
  { id: 'suradipa', name: 'Suradipa', capital: 'Sura Jaya', population: 4.3, area: 31000, gdp: 34, industry: 'Tourism', color: '#609e88', path: 'M340 196 L365 183 391 195 408 222 391 242 364 230 348 216Z', x: 374, y: 212 },
  { id: 'kaluna', name: 'Kaluna', capital: 'Kalu Timur', population: 3.9, area: 47000, gdp: 28, industry: 'Mining & metals', color: '#73ab92', path: 'M279 53 L301 39 325 57 322 87 346 108 334 129 307 111 288 85Z', x: 308, y: 77 },
  { id: 'wairu', name: 'Wairu', capital: 'Wai Utara', population: 3.5, area: 26000, gdp: 25, industry: 'Fisheries', color: '#84b79d', path: 'M45 71 L67 48 88 59 95 86 78 114 53 105 41 89Z', x: 69, y: 82 },
  { id: 'lontara', name: 'Lontara', capital: 'Lontar', population: 3.2, area: 38000, gdp: 21, industry: 'Agriculture', color: '#93c1a8', path: 'M376 79 L399 68 416 89 409 115 431 134 413 153 389 133 383 109Z', x: 399, y: 108 },
  { id: 'nusabela', name: 'Nusabela', capital: 'Bela Laut', population: 2.8, area: 22000, gdp: 17, industry: 'Marine services', color: '#a4cbb4', path: 'M424 232 L445 220 470 234 479 253 461 269 437 259Z', x: 451, y: 245 },
  { id: 'palaran', name: 'Palaran', capital: 'Pala', population: 2.5, area: 29000, gdp: 15, industry: 'Spice farming', color: '#b4d3be', path: 'M97 258 L121 241 145 249 154 268 134 284 111 280Z', x: 126, y: 264 },
  { id: 'seruni', name: 'Seruni', capital: 'Seru Bay', population: 2.3, area: 19000, gdp: 13, industry: 'Renewable energy', color: '#c2dbc8', path: 'M238 263 L263 245 287 255 290 274 268 291 246 284Z', x: 264, y: 269 },
  { id: 'ambar', name: 'Ambar', capital: 'Ambar Kecil', population: 1.9, area: 24000, gdp: 11, industry: 'Cocoa & coffee', color: '#d1e3d3', path: 'M465 106 L484 89 505 99 514 123 501 145 478 136Z', x: 490, y: 117 }
];
export const landArea = provinces.reduce((sum, p) => sum + p.area, 0);
export const sectors = [
  { name: 'Agriculture', color: '#dbb87f', gdp: [13,13,12.7,12.2,11.8,11.5,11.2,11], jobs: [27,27.5,26.5,25.5,24.7,24.0,23.5,23] },
  { name: 'Industry', color: '#e7856e', gdp: [28,27,28,28.5,28.8,29.0,29.0,29], jobs: [25,24.0,24.5,25.0,25.3,25.5,25.8,26] },
  { name: 'Services', color: '#266b60', gdp: [59,60,59.3,59.3,59.4,59.5,59.8,60], jobs: [48,48.5,49,49.5,50,50.5,50.7,51] }
];
// Percent of total population, both sexes; cohorts exactly total 100 each year.
export const ageStructure = [
  { name: '0–14', values: [26.8,26.5,26.2,25.9,25.7,25.4,25.2,25] },
  { name: '15–64', values: [66.2,66.4,66.6,66.8,66.9,67.1,67.2,67.3] },
  { name: '65+', values: [7.0,7.1,7.2,7.3,7.4,7.5,7.6,7.7] }
];
// Each cohort has male share of its own total, to derive actual counts for any year.
export const pyramid = [
  { age: '0–4', group: 0, weight: .32, male: .512 },
  { age: '5–9', group: 0, weight: .336, male: .511 },
  { age: '10–14', group: 0, weight: .344, male: .510 },
  { age: '15–24', group: 1, weight: .235, male: .507 },
  { age: '25–34', group: 1, weight: .24, male: .502 },
  { age: '35–44', group: 1, weight: .218, male: .498 },
  { age: '45–54', group: 1, weight: .177, male: .493 },
  { age: '55–64', group: 1, weight: .13, male: .482 },
  { age: '65–74', group: 2, weight: .68, male: .455 },
  { age: '75+', group: 2, weight: .32, male: .413 }
];
export const tradePartners = [
  { name: 'Avelin', exports: 31, imports: 27 },
  { name: 'Kantara', exports: 24, imports: 30 },
  { name: 'Orensa', exports: 19, imports: 22 },
  { name: 'Sundari', exports: 16, imports: 15 },
  { name: 'Other partners', exports: 26, imports: 24 }
];
// Annual-average CPI: 2019 = 100. Index growth agrees exactly with inflation.
export const prices = annual.map((d, i) => ({
  year: d.year,
  inflation: d.inflation,
  cpi: annual.slice(1, i + 1).reduce((v, row) => v * (1 + row.inflation / 100), 100)
}));
export const cpiBasket = [
  { name: 'Food & non-alcoholic drinks', weight: 30 },
  { name: 'Housing & utilities', weight: 24 },
  { name: 'Transport', weight: 15 },
  { name: 'Health & education', weight: 12 },
  { name: 'Other goods & services', weight: 19 }
];
export const education = {
  primary: [96.5,96.0,96.8,97.0,97.3,97.5,97.7,97.9],
  lowerSecondary: [92.0,91.2,92.1,92.9,93.5,94.0,94.6,95.0],
  upperSecondary: [81.8,81.3,82.0,83.7,85.2,86.6,87.6,89.1],
  femaleLife: [75.0,74.6,74.8,75.2,75.5,75.8,76.1,76.4],
  maleLife: [70.6,70.2,70.4,70.8,71.1,71.4,71.7,72.0]
};
export const indicators = [
  { key: 'population', label: 'Population', unit: 'million people', topic: 'Population' },
  { key: 'gdp', label: 'Gross domestic product', unit: 'billion NUR', topic: 'Economy' },
  { key: 'gdpPerCapita', label: 'GDP per capita', unit: 'NUR per person', topic: 'Economy' },
  { key: 'realGrowth', label: 'Real GDP growth', unit: '% annual change', topic: 'Economy' },
  { key: 'inflation', label: 'Consumer price inflation', unit: '% annual average', topic: 'Prices' },
  { key: 'cpi', label: 'Consumer price index', unit: '2019 = 100', topic: 'Prices' },
  { key: 'unemployment', label: 'Unemployment rate', unit: '% of labour force', topic: 'Labour' },
  { key: 'employed', label: 'Employed people', unit: 'million people', topic: 'Labour' },
  { key: 'labourForce', label: 'Labour force', unit: 'million people', topic: 'Labour' },
  { key: 'urban', label: 'Urban population share', unit: '% of population', topic: 'Population' },
  { key: 'literacy', label: 'Adult literacy', unit: '% age 15+', topic: 'Education & health' },
  { key: 'life', label: 'Life expectancy at birth', unit: 'years', topic: 'Education & health' },
  { key: 'enrolment', label: 'School enrolment, age 6–17', unit: '% net', topic: 'Education & health' },
  { key: 'beds', label: 'Hospital beds', unit: 'per 1,000 people', topic: 'Education & health' },
  { key: 'forest', label: 'Forest cover', unit: '% of land area', topic: 'Environment' },
  { key: 'renewable', label: 'Renewable electricity', unit: '% of generation', topic: 'Environment' },
  { key: 'co2', label: 'Territorial CO₂ emissions', unit: 'tonnes per person', topic: 'Environment' },
  { key: 'exports', label: 'Goods exports', unit: 'billion NUR', topic: 'Economy' },
  { key: 'imports', label: 'Goods imports', unit: 'billion NUR', topic: 'Economy' }
];
export const releases = [
  { date: '26 NOV 2026', title: 'A growing nation, a changing economy', description: 'The annual statistical portrait of Nusaraya.', route: 'population', type: 'STATISTICAL PORTRAIT' },
  { date: '26 NOV 2026', title: 'Services account for 60% of output', description: 'National accounts · 2026 annual estimate', route: 'economy', type: 'ECONOMY' },
  { date: '26 NOV 2026', title: 'Renewable power reaches 34%', description: 'Energy and environment · 2026 estimate', route: 'environment', type: 'ENVIRONMENT' }
];
