import { annual, years, provinces } from '../data/nusaraya.js';
import * as charts from './charts.js';
import { createRouter } from './router.js';
import * as views from './views.js';
import { sortTable } from './tables.js';

document.querySelector('.skip').addEventListener('click', event => {
  event.preventDefault();
  document.getElementById('view').focus();
});
const state = {
  year: 2026, chart: 'line', unit: 'total', scope: '', priceUnit: 'index', envUnit: 'perCapita',
  regionQuery: '', regionSort: 'population', regionDirection: 'desc',
  tableQuery: '', topic: '', allYears: false, tableSort: 'indicator', tableDirection: 'asc'
};
const yearControl = document.getElementById('year-select');
yearControl.innerHTML = [...years].reverse().map(y => `<option value="${y}" ${y === state.year ? 'selected' : ''}>${y}</option>`).join('');
const provinceControl = document.getElementById('province-select');
provinceControl.insertAdjacentHTML('beforeend',provinces.map(p=>`<option value="${p.id}">${charts.escapeHTML(p.name)}</option>`).join(''));
const router = createRouter({ views, state });
yearControl.addEventListener('change', () => {
  const year = Number(yearControl.value);
  if (annual.some(d => d.year === year)) { state.year=year; router.render(); }
});
provinceControl.addEventListener('change', () => {
  if (provinceControl.value) location.hash = '#/regions/' + provinceControl.value;
  else location.hash = '#/regions';
});
document.getElementById('global-search').addEventListener('submit', event => {
  event.preventDefault();
  state.tableQuery = document.getElementById('site-search').value.trim();
  state.topic = '';
  if (location.hash === '#/tables') router.render(); else location.hash = '#/tables';
});
function announce(message) { document.getElementById('announcement').textContent=message; }
function downloadCSV() {
  const rows=views.getDataRows(state);
  const keys=['indicator','topic','year','value','unit','source','status'];
  const quote=v=>'"'+String(v).replaceAll('"','""')+'"';
  const csv=[keys,...rows.map(row=>keys.map(key=>row[key]))].map(row=>row.map(quote).join(',')).join('\r\n');
  const url=URL.createObjectURL(new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'}));
  const anchor=document.createElement('a');
  anchor.href=url;
  anchor.download=`nusaraya-${state.allYears?'2019-2026':state.year}-statistics.csv`;
  anchor.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  announce(`Downloaded ${rows.length} observations as CSV.`);
}
// Small comparison tables share accessible DOM sorting without losing their cells.
function sortComparison(button) {
  const table=button.closest('table');
  const header=button.closest('th');
  const index=[...header.parentElement.children].indexOf(header);
  const direction=header.getAttribute('aria-sort')==='ascending'?'desc':'asc';
  const rows=[...table.tBodies[0].rows];
  const items=rows.map((row,i)=>{
    const label=row.cells[index].textContent.trim();
    const numeric=Number(label.replaceAll(',',''));
    return { value:label!==''&&Number.isFinite(numeric)?numeric:label, index:i };
  });
  sortTable(items,'value',direction).forEach(item=>table.tBodies[0].append(rows[item.index]));
  table.querySelectorAll('thead th').forEach(th=>{
    th.removeAttribute('aria-sort');
    th.querySelector('button span').textContent='↕';
  });
  header.setAttribute('aria-sort',direction==='asc'?'ascending':'descending');
  button.querySelector('span').textContent=direction==='asc'?'↑':'↓';
  announce(`${button.textContent.trim()} sorted ${direction==='asc'?'ascending':'descending'}.`);
}
document.getElementById('view').addEventListener('click',event=>{
  const button=event.target.closest('button');
  const section=event.target.closest('[data-section]');
  if (section) {
    event.preventDefault();
    document.getElementById(section.dataset.section)?.scrollIntoView({behavior:'smooth',block:'start'});
    return;
  }
  if (!button) return;
  let refresh=true;
  if (button.dataset.chart) state.chart=button.dataset.chart;
  else if (button.dataset.unit) state.unit=button.dataset.unit;
  else if (button.dataset.priceUnit) state.priceUnit=button.dataset.priceUnit;
  else if (button.dataset.envUnit) state.envUnit=button.dataset.envUnit;
  else if (button.id==='download-csv') { downloadCSV(); refresh=false; }
  else if (button.dataset.sort) {
    refresh=false;
    const province=Boolean(button.closest('#province-table'));
    if (province || button.closest('#data-table')) {
      const key=province?'regionSort':'tableSort';
      const dir=province?'regionDirection':'tableDirection';
      state[dir]=state[key]===button.dataset.sort&&state[dir]==='asc'?'desc':'asc';
      state[key]=button.dataset.sort;
      views.updateTables(state,province);
      document.querySelector(`${province?'#province-table':'#data-table'} [data-sort="${state[key]}"]`)?.focus({preventScroll:true});
      announce(`Sorted by ${button.dataset.sort}, ${state[dir]}.`);
    } else sortComparison(button);
  } else refresh=false;
  if (refresh) {
    const key=Object.keys(button.dataset)[0], value=button.dataset[key];
    router.render();
    // Restore keyboard focus after replacing a chart panel's controls.
    document.querySelector(`[data-${key.replace(/[A-Z]/g,c=>'-'+c.toLowerCase())}="${value}"]`)?.focus({preventScroll:true});
  }
});
document.getElementById('view').addEventListener('input',event=>{
  if (event.target.id==='table-search') { state.tableQuery=event.target.value; views.updateTables(state); }
  if (event.target.id==='region-search') { state.regionQuery=event.target.value; views.updateTables(state,true); }
});
document.getElementById('view').addEventListener('change',event=>{
  if (event.target.matches('[data-scope]')) { state.scope=event.target.value; router.render(); document.querySelector('[data-scope]')?.focus({preventScroll:true}); }
  if (event.target.id==='topic-filter') { state.topic=event.target.value; views.updateTables(state); }
  if (event.target.id==='all-years') { state.allYears=event.target.checked; views.updateTables(state); }
});
const shotRoutes={overview:'overview',economy:'economy',regions:'regions',table:'tables'};
const requestedShot=new URLSearchParams(location.search).get('shot');
if (shotRoutes[requestedShot]) history.replaceState(null,'','#/'+shotRoutes[requestedShot]);
if (!location.hash || location.hash==='#') history.replaceState(null,'','#/overview');
router.render();
