const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 6'];

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

(async () => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('https://appcenter.ms/sign-in')

    // await browser.close()
})();