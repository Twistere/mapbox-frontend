const { Builder, By} = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert')

async function addCadastreTest() {
    const options = new chrome.Options()
    options.setAcceptInsecureCerts(true)
    let driver = await new Builder()
        .forBrowser("chrome")
        .usingServer('http://127.0.0.1:4444/wd/hub/')
        .setChromeOptions(options)
        .build();
    
    await driver.get("http://127.0.0.1:8080/");
    await driver.findElement(By.id("fit")).click()

    assert(await driver.switchTo().alert().getText() == "Quel est le nom de votre commune ?")
    {
      const alert = await driver.switchTo().alert()
      await alert.sendKeys("Lons le Saunier")
      await alert.accept()

    }
    await driver.quit();
}
addCadastreTest();

