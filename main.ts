import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repository = path.dirname(fileURLToPath(import.meta.url));
const destination = path.resolve(process.env.MAKEFUN_OUTPUT_DIR || '/output');
// Fail before copying when the local screenshot step has not yet run.
const screenshotDirectory = path.join(repository, 'screenshots');
if (!fs.existsSync(screenshotDirectory) || !fs.readdirSync(screenshotDirectory).some(name => /\.(png|jpe?g)$/i.test(name))) {
  throw new Error('Add the local browser screenshots to screenshots/ before producing the final dossier.');
}
if (destination === repository || ['app', 'screenshots', 'vendor'].some(folder => destination === path.join(repository, folder) || destination.startsWith(path.join(repository, folder) + path.sep))) {
  throw new Error('Choose an output directory outside the application source.');
}
fs.mkdirSync(destination, { recursive: true });
for (const folder of ['app', 'screenshots']) {
  const origin = path.join(repository, folder);
  const target = path.join(destination, folder);
  if (fs.existsSync(origin)) {
    // Remove only our two output folders so repeated runs cannot retain stale assets.
    fs.rmSync(target, { recursive: true, force: true });
    fs.cpSync(origin, target, { recursive: true });
  }
  else if (folder === 'screenshots') fs.mkdirSync(target, { recursive: true });
  else throw new Error('The app directory is required.');
}
const dossier = buildDossier(destination, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216
});
fs.writeFileSync(path.join(destination, 'dossier.json'), dossier);
console.log('Nusaraya static site and dossier written to ' + destination);
