// Small, dependency-free SVG charts. Every visible mark has an accessible value.
export const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const num = (v, digits = 1) => Number(v).toLocaleString('en', { maximumFractionDigits: digits });
const palette = ['#266b60', '#e7856e', '#dbb87f', '#8bb3a0', '#92a7b1'];
function svg(content, title, height = 240) {
  return `<svg class="chart" viewBox="0 0 560 ${height}" role="img" aria-label="${escapeHTML(title)}"><title>${escapeHTML(title)}</title>${content}</svg>`;
}
function axes(max, unit, height = 240, min = 0) {
  const bottom = height - 34;
  return Array.from({ length: 5 }, (_, i) => {
    const v = min + (max - min) * i / 4;
    const y = bottom - i * (bottom - 22) / 4;
    return `<path class="grid" d="M53 ${y}H542"/><text class="axis" x="43" y="${y + 4}" text-anchor="end">${num(v, max < 10 ? 1 : 0)}</text>`;
  }).join('') + `<text class="axis" x="53" y="12">${escapeHTML(unit)}</text>`;
}
export function lineChart(points, options = {}) {
  if (!points.length) return '';
  const height = options.height || 240;
  const max = options.max || Math.max(...points.map(p => p.value)) * 1.15 || 1;
  const min = options.min ?? Math.min(0, ...points.map(p => p.value));
  const bottom = height - 34;
  const coords = points.map((p, i) => [53 + i * 489 / Math.max(points.length - 1, 1), bottom - (p.value - min) / (max - min) * (bottom - 22)]);
  let body = axes(max, options.unit || '', height, min);
  const path = coords.map(([x,y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' ');
  if (min === 0 && points.length > 1) body += `<path d="${path}L542 ${bottom}H53Z" fill="${options.color || palette[0]}" opacity=".08"/>`;
  body += `<path d="${path}" fill="none" stroke="${options.color || palette[0]}" stroke-width="3" stroke-linejoin="round"/>`;
  body += coords.map(([x,y], i) => `<g><circle cx="${x}" cy="${y}" r="${i === points.length - 1 ? 5 : 3.5}" fill="${i === points.length - 1 ? palette[1] : (options.color || palette[0])}" stroke="white" stroke-width="2"><title>${escapeHTML(points[i].label)}: ${num(points[i].value, 2)} ${escapeHTML(options.unit || '')}</title></circle><text class="axis" x="${x}" y="${height - 12}" text-anchor="middle">${escapeHTML(points[i].label)}</text>${i === points.length - 1 ? `<text class="point-label" x="${x - 7}" y="${y - 12}" text-anchor="end">${num(points[i].value, 1)}</text>` : ''}</g>`).join('');
  return svg(body, options.title || 'Annual series', height);
}
export function barChart(points, options = {}) {
  if (!points.length) return '';
  const height = options.height || 240;
  const min = Math.min(0, ...points.map(p => p.value));
  const max = options.max || Math.max(...points.map(p => p.value)) * 1.18 || 1;
  const bottom = height - 34;
  const scale = v => bottom - (v - min) / (max - min) * (bottom - 22);
  const step = 489 / points.length;
  let body = axes(max, options.unit || '', height, min);
  body += points.map((p,i) => {
    const y = scale(Math.max(p.value, 0));
    const h = Math.max(Math.abs(scale(p.value) - scale(0)), .5);
    const x = 53 + i * step + step * .2;
    return `<g><rect x="${x}" y="${y}" width="${step * .6}" height="${h}" rx="3" fill="${p.color || options.color || palette[0]}"><title>${escapeHTML(p.label)}: ${num(p.value, 2)} ${escapeHTML(options.unit || '')}</title></rect><text class="axis" x="${x + step * .3}" y="${height - 12}" text-anchor="middle">${escapeHTML(p.label)}</text><text class="bar-label" x="${x + step * .3}" y="${p.value >= 0 ? y - 7 : scale(p.value) + 14}" text-anchor="middle">${num(p.value, 1)}</text></g>`;
  }).join('');
  return svg(body, options.title || 'Comparison', height);
}
export function donutChart(points, options = {}) {
  const sum = points.reduce((s,p) => s + p.value, 0);
  const radius = 77, length = 2 * Math.PI * radius;
  let offset = 0;
  let body = points.map((p,i) => {
    const arc = p.value / sum * length;
    const shape = `<circle cx="125" cy="118" r="${radius}" fill="none" stroke="${p.color || palette[i % palette.length]}" stroke-width="32" stroke-dasharray="${arc} ${length - arc}" stroke-dashoffset="${-offset}" transform="rotate(-90 125 118)"><title>${escapeHTML(p.label)}: ${num(p.value)} ${escapeHTML(options.unit || '%')}</title></circle>`;
    offset += arc;
    return shape;
  }).join('');
  body += `<text x="125" y="117" text-anchor="middle" class="donut-value">${escapeHTML(options.center || '100%')}</text><text x="125" y="138" text-anchor="middle" class="axis">${escapeHTML(options.centerLabel || 'of total')}</text>`;
  body += points.map((p,i) => `<rect x="254" y="${45+i*34}" width="9" height="9" rx="2" fill="${p.color || palette[i%palette.length]}"/><text x="276" y="${54+i*34}" class="legend-label">${escapeHTML(p.label)}</text><text x="535" y="${54+i*34}" text-anchor="end" class="bar-label">${num(p.value)}${escapeHTML(options.unit || '%')}</text>`).join('');
  return svg(body, options.title || 'Composition');
}
export function pyramidChart(points, options = {}) {
  const max = Math.max(...points.flatMap(p => [p.male,p.female])) * 1.1;
  const height = 304;
  let body = '<text x="160" y="17" class="legend-label" text-anchor="middle">Men</text><text x="400" y="17" class="legend-label" text-anchor="middle">Women</text>';
  for (let i=0;i<4;i++) {
    const x = i*65;
    body += `<path class="grid" d="M${250-x} 28V267 M${310+x} 28V267"/><text class="axis" x="${250-x}" y="287" text-anchor="middle">${num(i*65/210*max)}</text><text class="axis" x="${310+x}" y="287" text-anchor="middle">${num(i*65/210*max)}</text>`;
  }
  [...points].reverse().forEach((p,i) => {
    const y=29+i*23;
    const m=p.male/max*210, f=p.female/max*210;
    body += `<rect x="${250-m}" y="${y}" width="${m}" height="17" rx="2" fill="#266b60"><title>${escapeHTML(p.label)}, men: ${num(p.male,3)} million</title></rect><text class="axis" x="280" y="${y+12}" text-anchor="middle">${escapeHTML(p.label)}</text><rect x="310" y="${y}" width="${f}" height="17" rx="2" fill="#e7856e"><title>${escapeHTML(p.label)}, women: ${num(p.female,3)} million</title></rect>`;
  });
  body += '<text class="axis" x="280" y="303" text-anchor="middle">Population, millions</text>';
  return svg(body, options.title || 'Population by age and sex', height);
}
