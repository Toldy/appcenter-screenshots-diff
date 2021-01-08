const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 6'];

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

async function navigateToLatestTest(page) {
    await page.goto('https://appcenter.ms/users/ld16testsui-outlook.fr/apps/LD16-iOS/test/runs')
    await delay(4000) // Mieux avec un await page.waitForSelector('div...')

    // Ici: Récupérer le dernier test de la liste au lieu d'utiliser un url en dur
    await page.goto('https://appcenter.ms/users/ld16testsui-outlook.fr/apps/LD16-iOS/test/runs/354a6083-3c1f-46c2-bcf4-396b3df1802e')
    await delay(4000) // Mieux avec un await page.waitForSelector('div...')
}

async function logInWithGoogle(page) {
    const navigationPromise = page.waitForNavigation()

    await page.waitForSelector('a[icon="google"]')
    await page.click('a[icon="google"]')
    await page.screenshot({ path: 'after.png' })

    await navigationPromise
    await page.waitForSelector('input[type="email"]')
    await page.type('input[type="email"]', process.env.GOOGLE_USER)
    await page.click('#identifierNext')

    await page.waitForSelector('input[type="password"]', { visible: true })
    await page.type('input[type="password"]', process.env.GOOGLE_PWD)

    await page.waitForSelector('#passwordNext', { visible: true })
    await page.click('#passwordNext')

    await navigationPromise

    await delay(4000)
}

(async () => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('https://appcenter.ms/sign-in')

    await logInWithGoogle(page)

    await navigateToLatestTest(page)

    // await browser.close()
})();