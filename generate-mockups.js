const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const imagesDir = path.resolve(__dirname, 'img');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const products = require('./products.json');

const imgBase = path.resolve(__dirname, 'img');
const imgFiles = fs.readdirSync(imgBase);

function findSourceImage(productName) {
  const baseName = productName.toLowerCase()
    .replace(/ — /g, ' ')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  const match = imgFiles.find(f => {
    const fclean = f.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/\.png$/, '');
    return fclean.includes(baseName) || baseName.includes(fclean);
  });

  if (match) return path.join(imgBase, match);
  return null;
}

async function generateMockups() {
  console.log(`Generating ${products.length} mockups...`);

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const imgPath = findSourceImage(p.name);

    if (!imgPath) {
      console.log(`  [${i + 1}/${products.length}] SKIP - No source found for: ${p.name}`);
      continue;
    }

    try {
      const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--allow-file-access-from-files']
      });

      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 900 });

      const htmlPath = `file://${path.resolve(__dirname, 'mockup-generator.html')}`;
      await page.goto(htmlPath, { waitUntil: 'networkidle0' });

      await page.evaluate((productImgPath) => {
        const img = new Image();
        img.src = `file://${productImgPath}`;
        return new Promise((resolve, reject) => {
          img.onload = () => {
            window.loadImage(`file://${productImgPath}`);
            resolve();
          };
          img.onerror = reject;
        });
      }, imgPath);

      const ingredient = p.name.includes(' — ') ? p.name.split(' — ')[1].trim() : p.name;
      const displayName = p.category + ' ' + ingredient;
      await page.evaluate((name, desc, price) => {
        canvasW = 1200;
        canvasH = 628;
        document.getElementById('prod-name').value = name;
        document.getElementById('prod-desc').value = desc;
        document.getElementById('prod-price').value = price;
        window.scheduleRender();
      }, ingredient, p.desc, p.price);

      await page.waitForTimeout(800);

      const canvasData = await page.evaluate(() => {
        const canvas = document.getElementById('mockup-canvas');
        return canvas.toDataURL('image/png');
      });

      await browser.close();

      const base64Data = canvasData.replace(/^data:image\/png;base64,/, '');
      const fileName = `${p.id}-${displayName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.png`;
      const outputPath = path.resolve(__dirname, 'img', fileName);

      fs.writeFileSync(outputPath, base64Data, 'base64');
      console.log(`  [${i + 1}/${products.length}] DONE - ${fileName}`);

    } catch (err) {
      console.log(`  [${i + 1}/${products.length}] ERROR - ${p.name}: ${err.message}`);
    }
  }

  console.log('Done!');
}

generateMockups().catch(console.error);
