export const $ = (selector, root = document) => root.querySelector(selector);
export const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export const naira = amount => '₦' + Number(amount).toLocaleString('en-NG');
export const spice = ['Mild','Medium','Hot'];
export const store = {
 get(key, fallback) { try { const raw = localStorage.getItem(key); return raw === null ? fallback : JSON.parse(raw); } catch { return fallback; } },
 set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Storage can be disabled */ } }
};
export function setupNav() {
 const nav = $('#site-nav');
  const toggle = $('#menu-toggle');
 toggle?.addEventListener('click', () => { const expanded = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.setAttribute('aria-label', expanded ? 'Close navigation menu' : 'Open navigation menu'); });
 $('#year').textContent = new Date().getFullYear();
}
export async function fetchSoups() {
 const response = await fetch('data/soups.json');
 if (!response.ok) throw new Error(`Menu request failed: ${response.status}`);
 const data = await response.json();
 if (!data || !Array.isArray(data.soups)) throw new Error('Invalid soup data format');
 return data.soups;
}
