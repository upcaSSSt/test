import ImageKit from 'imagekit';
import { writeFileSync } from 'node:fs';

const imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.URL_ENDPOINT,
});

const files = await imagekit.listFiles({ path: '/manga', includeFolderItems: true, limit: 1000 });
console.log('FILES', files);

writeFileSync('manga.json', JSON.stringify(files, null, 2));
