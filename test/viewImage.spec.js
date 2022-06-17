const { Builder, By} = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');

async function viewImageTest() {
    const options = new chrome.Options()
    options.setAcceptInsecureCerts(true)
    let driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
    
    await driver.get("http://localhost:3000/");
    await driver.findElement(By.id("dateUser")).click()
    {
      const dropdown = await driver.findElement(By.id("dateUser"))
      await dropdown.findElement(By.xpath("//option[. = 'Wed Feb 01 2023 01:01:00']")).click()
    }

    await driver.quit();
}
viewImageTest();