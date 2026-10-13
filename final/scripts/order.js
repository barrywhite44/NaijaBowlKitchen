import { $, esc, naira, store, setupNav, fetchSoups } from './shared.js';
setupNav();
let soups = [];
const form = $('#order-form');
function updateTotal() {
 const soup = soups.find(item => item.id === Number($('#soup').value));
 const qty = Math.max(1, Number($('#qty').value) || 1);
 $('#total').textContent = `Total: ${naira(soup ? soup.price * qty : 0)}`;
}
form.addEventListener('input', updateTotal);
form.addEventListener('submit', () => { store.set('naijabowl:contact', {name:$('#name').value,email:$('#email').value,phone:$('#phone').value}); });
async function init() {
 const localToday = new Date(); localToday.setMinutes(localToday.getMinutes() - localToday.getTimezoneOffset());
 $('#date').min = localToday.toISOString().slice(0,10);
 const contact = store.get('naijabowl:contact', {});
 for (const key of ['name','email','phone']) if (contact[key]) $(`#${key}`).value = contact[key];
 try {
  soups = await fetchSoups();
  $('#soup').insertAdjacentHTML('beforeend', soups.map(s => `<option value="${s.id}">${esc(s.name)} (${naira(s.price)})</option>`).join(''));
  const requested = new URLSearchParams(location.search).get('soup');
  if (soups.some(s => String(s.id) === requested)) $('#soup').value = requested;
  updateTotal();
 } catch (error) {
  console.error('Could not load soup choices:',error);
  $('#form-status').textContent = 'Soup choices are unavailable. Please reload this page.';
  form.querySelector('button[type="submit"]').disabled = true;
 }
}
init();
