import ImageKit from 'imagekit';
import { writeFileSync } from 'node:fs';

const LIMIT = 1000;

const imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.URL_ENDPOINT,
});
const pages = [];
const titles = {};

for (let skip = 0; files.length % LIMIT === 0; skip += LIMIT)
  pages.push(...(await imagekit.listFiles({ limit: LIMIT, skip, sort: 'ASC_NAME' })));
pages.sort(compare);

const titles = {};
for (const p of pages) {
  const [, , title, chapter] = f.filePath.split('/');
  titles[title] ||= {};
  titles[title][chapter] ||= [];
  titles[title][chapter].push({ name: p.name, url: p.url });
}

writeFileSync('manga.json', JSON.stringify(titles));

function compare(a, b) {
  const aReg = a.filePath.matchAll(/d+/g);
  for (const bDigit of b.filePath.matchAll(/d+/g)) {
    const aDigit = aReg.next().value;
    if (aDigit !== bDigit)
      return aDigit - bDigit;
  }
  return 0;
}
