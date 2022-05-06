const { Builder, By} = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');

async function addCadastreTest() {
    const options = new chrome.Options()
    options.setAcceptInsecureCerts(true)
    let driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .usingServer("http://127.0.0.1:4444/wd/hub/")
        .build();
    
    await driver.get("http://127.0.0.1:3000")
    await driver.findElement(By.id("fit")).click()
    assert(await driver.switchTo().alert().getText() == "Quel est le nom de votre commune ?")
    {
        const alert = await driver.switchTo().alert()
        await alert.sendKeys("Lons le saunier")
        await alert.accept()
    }

    driver.quit();

}

addCadastreTest()