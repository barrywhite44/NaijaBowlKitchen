import { $, esc, naira, spice, store, setupNav, fetchSoups } from './shared.js';
setupNav();
let soups = [];
const saved = new Set(store.get('naijabowl:favs', []));
const filters = store.get('naijabowl:filters', {cat:'all',savedOnly:false});
const dialog = $('#dlg');
let selectedSoup = null;
function cardHTML(s) {
    const isSaved = saved.has(s.id);

    return `
        <article class="card soup-card">
            <img
                class="soup-image"
                src="${esc(s.image)}"
                alt="${esc(s.name)}"
                width="640"
                height="400"
                loading="lazy"
                decoding="async"
            >
            <div class="soup-card-content">
                <h2>${esc(s.name)}</h2>
                <p class="soup-region">${esc(s.region)} cuisine</p>
                <p class="soup-price">${naira(s.price)} <span>per bowl</span></p>
                <ul class="facts">
                    <li><strong>Spice:</strong> ${esc(spice[s.spice - 1])}</li>
                    <li><strong>Prep:</strong> ${s.mins} min</li>
                    <li><strong>Type:</strong> ${esc(s.cat)}</li>
                </ul>
                <p class="soup-description">${esc(s.desc)}</p>
                <div class="actions">
                    <button class="btn" type="button" data-details="${s.id}">View details</button>
                    <button
                        class="btn ghost"
                        type="button"
                        data-fav="${s.id}"
                        aria-pressed="${isSaved}"
                    >${isSaved ? '★ Saved' : '☆ Save'}</button>
                </div>
            </div>
        </article>
    `;
}

function render() {
    const visible = soups
        .filter(soup => filters.cat === 'all' || soup.cat === filters.cat)
        .filter(soup => !filters.savedOnly || saved.has(soup.id));

    $('#menu-grid').innerHTML = visible.length
        ? visible.map(cardHTML).join('')
        : '<p>No soups match your filters.</p>';

    $('#count').textContent = `${visible.length} of ${soups.length} soups`;
}
function openDetails(id) {
 selectedSoup = soups.find(s => s.id === id);
 if (!selectedSoup) return;
 $('#dlg-title').textContent = selectedSoup.name;
 $('#dlg-body').textContent = selectedSoup.desc;
 $('#dlg-facts').innerHTML = [['Origin',selectedSoup.region],['Price',naira(selectedSoup.price)],['Spice',spice[selectedSoup.spice-1]],['Preparation',`${selectedSoup.mins} minutes`]].map(([key,value]) => `<li><strong>${esc(key)}:</strong> ${esc(value)}</li>`).join('');
 dialog.showModal();
}
$('#menu-grid').addEventListener('click', event => {
 const detail = event.target.closest('[data-details]');
 const favorite = event.target.closest('[data-fav]');
 if (detail) openDetails(Number(detail.dataset.details));
 if (favorite) {
  const id = Number(favorite.dataset.fav);
  if (saved.has(id)) saved.delete(id); else saved.add(id);
  store.set('naijabowl:favs', [...saved]);
    render();
  $(`[data-fav="${id}"]`)?.focus();
 }
});
$('#dlg-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
$('#dlg-order').addEventListener('click', () => { if (selectedSoup) window.location.href = `order.html?soup=${encodeURIComponent(selectedSoup.id)}`; });
$('#cat').addEventListener('change', event => { filters.cat = event.target.value; store.set('naijabowl:filters',filters);
    render(); });
$('#saved-only').addEventListener('change', event => { filters.savedOnly = event.target.checked; store.set('naijabowl:filters',filters);
    render(); });
async function init() {
 try {
  soups = await fetchSoups();
  $('#cat').value = ['all','Leafy','Thickened','Peppery'].includes(filters.cat) ? filters.cat : 'all';
  $('#saved-only').checked = Boolean(filters.savedOnly);
  render();
 } catch (error) {
  console.error('Could not load menu:',error);
  $('#menu-grid').innerHTML = '<p role="alert">Unable to load the menu. Please reload this page.</p>';
  $('#count').textContent = 'Menu unavailable';
 }
}
init();
