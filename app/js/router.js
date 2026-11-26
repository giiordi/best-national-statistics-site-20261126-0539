const pages = {
  overview: 'renderOverview', population: 'renderPopulation', economy: 'renderEconomy',
  regions: 'renderRegions', labour: 'renderLabour', prices: 'renderPrices',
  'education-health': 'renderEducationHealth', environment: 'renderEnvironment',
  tables: 'renderTables', methodology: 'renderMethodology'
};
export function createRouter({ views, state, afterRender }) {
  let previous = '';
  function render() {
    const parts = location.hash.replace(/^#\/?/, '').split('/');
    const route = Object.hasOwn(pages, parts[0]) ? parts[0] : 'overview';
    const detail = route === 'regions' && parts[1];
    state.route = route;
    document.getElementById('view').innerHTML = detail ? views.renderRegionDetail(state, parts[1]) : views[pages[route]](state);
    document.querySelectorAll('#primary-nav a').forEach(link => {
      const active = link.hash === '#/' + route;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current','page'); else link.removeAttribute('aria-current');
    });
    const title = document.querySelector('h1')?.textContent || 'Overview';
    document.title = title + ' · Nusaraya Statistics Office';
    document.getElementById('province-select').value = detail && [...document.getElementById('province-select').options].some(option => option.value === parts[1]) ? parts[1] : '';
    document.getElementById('announcement').textContent = `${title}, ${state.year}`;
    afterRender?.();
    if (previous !== location.hash) {
      window.scrollTo(0,0);
      if (previous) document.getElementById('view').focus({ preventScroll:true });
    }
    previous = location.hash;
  }
  window.addEventListener('hashchange', render);
  return { render };
}
