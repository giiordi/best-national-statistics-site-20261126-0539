import { escapeHTML } from './charts.js';
export function sortTable(rows, key, direction = 'asc') {
  const sign = direction === 'desc' ? -1 : 1;
  return [...rows].sort((a,b) => {
    const av = a[key], bv = b[key];
    return sign * (typeof av === 'number' && typeof bv === 'number' ? av-bv : String(av).localeCompare(String(bv), 'en', { numeric:true }));
  });
}
export function filterTable(rows, query) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return rows.filter(row => words.every(word => Object.values(row).some(value => String(value).toLowerCase().includes(word))));
}
export function tableHTML(columns, rows, options = {}) {
  const head = columns.map(c => `<th scope="col"${options.sortKey === c.key ? ` aria-sort="${options.direction === 'desc' ? 'descending' : 'ascending'}"` : ''}><button data-sort="${c.key}">${escapeHTML(c.label)} <span aria-hidden="true">${options.sortKey === c.key ? (options.direction === 'desc' ? '↓' : '↑') : '↕'}</span></button></th>`).join('');
  const body = rows.map(row => `<tr>${columns.map((c,i) => `<${i===0?'th scope="row"':'td'}${c.numeric?' class="numeric"':''}>${c.render ? c.render(row[c.key],row) : escapeHTML(row[c.key])}</${i===0?'th':'td'}>`).join('')}</tr>`).join('');
  return `<div class="table-scroll"><table><caption class="sr-only">${escapeHTML(options.caption || 'Statistics table')}</caption><thead><tr>${head}</tr></thead><tbody>${body || `<tr><td colspan="${columns.length}">No matching records. Try a different search.</td></tr>`}</tbody></table></div>`;
}
