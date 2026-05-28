import ImageKit from 'imagekit';
import { writeFileSync } from 'node:fs';

const imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.URL_ENDPOINT,
});

const files = await imagekit.listFiles({ path: '/manga', limit: 1000 });
console.log('FILES', files);
/*const cleanFiles = files
  .filter(file => file.fileType === 'image' && file.name.endsWith('.webp'))
  .map(file => ({
    name: file.name,
    filePath: file.filePath,
    url: file.url
  }));*/

writeFileSync('manga.json', JSON.stringify(files, null, 2));
