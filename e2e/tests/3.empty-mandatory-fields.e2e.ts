import { MainPage } from "../pages/main-page.po";
import { browser, protractor } from "protractor";

describe('Empty mandatory fields', () => {
    let mainPage = new MainPage();
    let name: string = 'Иванов Иван Иванович';
    let email: string = 'test1907@gmail.com';

    it('Add and clear - check notifications', () => {
        mainPage.navigeteTo();
        mainPage.userName.sendKeys(name);
        mainPage.userEmail.sendKeys(email);
        mainPage.userName.clear();
        mainPage.userEmail.clear();
        browser.actions().sendKeys(protractor.Key.ENTER).perform();

        expect(mainPage.userNameErrorMsg.getText()).toContain('Это поле необходимо заполнить.');
        expect(mainPage.userEmailErrorMsg.getText()).toContain('Это поле необходимо заполнить.');
    });
});