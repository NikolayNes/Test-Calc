import { MainPage } from "../pages/main-page.po";

describe('Incorrect email field', () => {
    let mainPage = new MainPage();
    let name: string = 'Иванов Иван Иванович';
    let email: string = 'test@@gmail.com';

    it('Fill and check error message', () => {
        mainPage.navigeteTo();
        mainPage.userName.sendKeys(name);
        mainPage.userEmail.sendKeys(email);

        expect(mainPage.userEmailErrorMsg.getText()).toEqual('Пожалуйста, введите корректный адрес электронной почты.');
    });
});