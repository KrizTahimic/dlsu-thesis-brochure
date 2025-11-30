import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mode = process.argv[2] || 'pdf'; // 'pdf', 'screenshot', or 'both'

async function run() {
  console.log(`Mode: ${mode}`);
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();

  // Set viewport for better rendering
  await page.setViewport({
    width: 1056, // 11 inches at 96 DPI
    height: 816,  // 8.5 inches at 96 DPI
    deviceScaleFactor: 2 // Higher quality
  });

  // Load the HTML file
  const htmlPath = path.join(__dirname, 'brochure.html');
  console.log(`Loading ${htmlPath}...`);
  await page.goto(`file://${htmlPath}`, {
    waitUntil: 'networkidle0'
  });

  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready');

  if (mode === 'screenshot' || mode === 'both') {
    // Take full page screenshot showing both pages
    const screenshotFull = path.join(__dirname, 'screenshot_full.png');
    await page.screenshot({
      path: screenshotFull,
      fullPage: true
    });
    console.log(`Full screenshot saved: ${screenshotFull}`);

    // Also take individual page screenshots
    const screenshotPath1 = path.join(__dirname, 'screenshot_page1.png');
    const screenshotPath2 = path.join(__dirname, 'screenshot_page2.png');

    // Get the actual page dimensions
    const dimensions = await page.evaluate(() => {
      const pages = document.querySelectorAll('.page');
      return {
        page1: pages[0] ? pages[0].getBoundingClientRect() : null,
        page2: pages[1] ? pages[1].getBoundingClientRect() : null
      };
    });

    // Screenshot page 1 (inside panels)
    if (dimensions.page1) {
      await page.screenshot({
        path: screenshotPath1,
        clip: {
          x: dimensions.page1.x,
          y: dimensions.page1.y,
          width: dimensions.page1.width,
          height: dimensions.page1.height
        }
      });
      console.log(`Screenshot 1 saved: ${screenshotPath1}`);
    }

    // Screenshot page 2 (back panels with cover)
    if (dimensions.page2) {
      await page.screenshot({
        path: screenshotPath2,
        clip: {
          x: dimensions.page2.x,
          y: dimensions.page2.y,
          width: dimensions.page2.width,
          height: dimensions.page2.height
        }
      });
      console.log(`Screenshot 2 saved: ${screenshotPath2}`);
    }
  }

  if (mode === 'pdf' || mode === 'both') {
    // Generate PDF
    const pdfPath = path.join(__dirname, 'brochure_html.pdf');
    console.log(`Generating PDF at ${pdfPath}...`);

    await page.pdf({
      path: pdfPath,
      width: '11in',
      height: '8.5in',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });

    console.log('PDF generated successfully!');
  }

  await browser.close();
  console.log('Done!');
}

run().catch(console.error);
