const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 6'];

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}


(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.emulate(iPhone);

    await page.goto('https://example.com');

    await page.screenshot({
        path: 'full.png',
        fullPage: true
    })

    await browser.close();
})();