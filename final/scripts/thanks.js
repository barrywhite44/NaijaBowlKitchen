import { $, esc, naira, setupNav, fetchSoups } from './shared.js';
setupNav();
async function init() {
 const params = new URLSearchParams(location.search);
 const receipt = $('#receipt');
 if (!params.has('name') || !params.has('soup')) {
  receipt.innerHTML = '<p>No order information was supplied. <a href="order.html">Start an order</a>.</p>';
  return;
 }
 try {
  const soups = await fetchSoups();
  const soup = soups.find(item => item.id === Number(params.get('soup')));
  const qty = Number(params.get('qty'));
  if (!soup || !Number.isInteger(qty) || qty < 1 || qty > 20) throw new Error('Invalid order details');
  const rows = [['Name',params.get('name')],['Email',params.get('email')],['Phone',params.get('phone')],['Soup',soup.name],['Bowls',qty],['Preferred date',params.get('date')],['Notes',params.get('notes') || 'None'],['Estimated total',naira(soup.price * qty)]];
  receipt.innerHTML = `<dl>${rows.map(([key,value]) => `<dt>${esc(key)}</dt><dd>${esc(value)}</dd>`).join('')}</dl>`;
 } catch(error) {
  console.error('Could not display receipt:',error);
  receipt.innerHTML = '<p role="alert">Unable to display this order. Please try again from the order page.</p>';
 }
}
init();
