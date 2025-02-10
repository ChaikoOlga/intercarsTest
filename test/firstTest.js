
//const { assert } = require("chai");
const {Builder,Browser, By, Key} = require ("selenium-webdriver");
const assert = require ('assert');

async function example(){

//arange
const cityFrom = 'Мин';
const cityTo = 'Москва';
const dataTrip = "30.01.2025";

   
//launche the browser 
let driver = await new Builder().forBrowser(Browser.FIREFOX).build()

//action 
//navigate to our application
 await driver.get("https://www.intercars-tickets.com/");

//fill loc_start / loc_end
await driver.findElement(By.id("loc_start")).sendKeys(cityFrom);
await driver.sleep(1000);
const cityFromUl = await driver.findElement(By.id('ui-id-1'));
await driver.sleep(1000);
const cities= await cityFromUl.findElements(By.className('ui-menu-item'));

if (cities.length>1) {
    await cities[1].click();
} else {
    throw Error('This city is not found')
}

await driver.sleep(1000);
await driver.findElement(By.id("loc_end")).sendKeys(cityTo);
await driver.sleep(1000);
const cityToUl = await driver.findElement(By.id('ui-id-2')).findElement(By.className('ui-menu-item')).click();
await driver.sleep(1000);
const dateDepart = await driver.findElement(By.id("dateDepart"));
for (let index = 0; index < 10; index++) {
    dateDepart.sendKeys(Key.BACK_SPACE);
}
dateDepart.sendKeys(dataTrip);
await driver.sleep(1000);
await driver.findElement(By.id("submitButton")).click();

//close popover 
await driver.sleep(10000);
const popoverWindow = await driver.findElement(By.className("sp-prompt sp-native-popover sp-pos-left show-prompt")).findElement(By.className("sp-prompt-close")).click();
//await popoverWindow.findElement(By.className("sp-prompt-btn sp-disallow-btn")).click();

await driver.executeScript("window.scrollTo(0, 400)");
const  resultTickets = await driver.findElements(By.className("ticket mt-20"));
const firstTicket = await resultTickets[0].findElement(By.className("small-after-text showAddInfo")).click();
const ticketCity = await driver
    .findElement(By.className("collapse-result"))
    .findElement(By.className("heading-collapse-result d-flex align-items-center justify-content-center"))
    .findElement(By.className("pl-2")).getText();
// for (let index = 0; index < ticketCity.length; index++) {
//     console.log('index: ',index);
//     console.log(await ticketCity[index].getText());
// }
// console.log(ticketCity.length);

await driver.sleep(10000);


//assert
await assert.strictEqual(ticketCity, "МИНЕРАЛЬНЫЕ ВОДЫ - МОСКВА");
 

await driver.close();

//close the browser
await driver.quit();
   
}
example();

