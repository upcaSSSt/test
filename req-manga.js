import ImageKit from 'imagekit';
import { writeFileSync } from 'node:fs';

const LIMIT = 1000;

const imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.URL_ENDPOINT,
});
const titles = {};

for (let skip = 0; true; skip += LIMIT) {
  const files = await imagekit.listFiles({ limit: LIMIT, skip, sort: 'ASC_NAME' });
  console.log(files);
  for (const f of files.sort((a, b) => a.filePath.localeCompare(b.filePath, [], { numeric: true, sensitivity: 'base' }))) {
    const [, , title, chapter] = f.filePath.split('/');
    if (!titles[title])
      titles[title] = {};
    if (!titles[title][chapter])
      titles[title][chapter] = [];

    titles[title][chapter].push({ name: f.name, url: f.url });
  }

  if (files.length !== LIMIT)
    break;
}

writeFileSync('manga.json', JSON.stringify(titles, null, 2));
