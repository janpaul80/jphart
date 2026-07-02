const fs = require('fs');
const path = require('path');

const htmlFiles = fs.readdirSync('.').filter((file) => file.endsWith('.html') && !file.startsWith('chatbot'));
const routeMap = new Set([
  '/', '/work', '/about', '/pricing', '/contact', '/login', '/privacy-policy', '/terms-of-service', '/links',
  '/work/nextcoder', '/work/vidhart', '/work/heftcoder'
]);
const errors = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const h1Count = (html.match(/<h1\b/g) || []).length;
  if (h1Count !== 1) errors.push(`${file}: expected one h1, found ${h1Count}`);

  const ids = [...html.matchAll(/\sid=["']([^"']+)["']/g)].map((match) => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) errors.push(`${file}: duplicate ids: ${[...new Set(duplicates)].join(', ')}`);

  for (const match of html.matchAll(/<img\b([^>]*)>/g)) {
    if (!/\salt=["'][^"']*["']/.test(match[1])) errors.push(`${file}: image without alt text`);
  }
  for (const match of html.matchAll(/<a\b([^>]*)target=["']_blank["']([^>]*)>/g)) {
    if (!/rel=["'][^"']*noopener/.test(match[1] + match[2])) errors.push(`${file}: external target missing noopener`);
  }
  for (const match of html.matchAll(/(?:href|src)=["']([^"'#?]+)["']/g)) {
    const url = match[1];
    if (!url.startsWith('/') || url.startsWith('//') || url.startsWith('/api/')) continue;
    if (routeMap.has(url)) continue;
    const local = decodeURIComponent(url.slice(1));
    if (!fs.existsSync(path.normalize(local))) errors.push(`${file}: missing local target ${url}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Validated ${htmlFiles.length} HTML files, headings, media, and local links.`);
