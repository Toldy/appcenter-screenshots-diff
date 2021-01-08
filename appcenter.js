const puppeteer = require('puppeteer');

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 10000, height: 10000 })
    await page.goto('https://example.com', {waitUntil: 'networkidle2'});

    await page.screenshot({ path: 'example.png' });

    await browser.close();
})();