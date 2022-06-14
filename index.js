const puppeteer = require('puppeteer')

async function main () {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  // await page.setViewport({ width: 1920, height: 1080 })
  await page.goto('http://127.0.0.1:5500/index.html')

  const nameInput = await page.$('#text > input[type=text]')
  const emailInput = await page.$('#email > input')
  const telInput = await page.$('#tel > input')

  const okBtn = await page.$('body > form > fieldset > div > button')

  await nameInput.type('an', { delay: 50 })
  await emailInput.type('andrei@etajul3.ro', { delay: 50 })
  await telInput.type('0712345678', { delay: 50 })

  await okBtn.click()

  const nameErrorElement = await page.$('#text > p')
  const emailErrorElement = await page.$('#email > p')
  const telErrorElement = await page.$('#tel > p')

  const nameError = await nameErrorElement.evaluate(el => el.textContent)
  const emailError = await emailErrorElement.evaluate(el => el.textContent)
  const telError = await telErrorElement.evaluate(el => el.textContent)

  if (nameError === '' && emailError === '' && telError === '') {
    await page.screenshot({ path: 'all_good.png' })
  } else {
    await page.screenshot({ path: 'some_bad.png' })
  }

  await wait(2)

  await browser.close()
}

async function wait (howLong) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(true), howLong * 1000)
  })
}

main()