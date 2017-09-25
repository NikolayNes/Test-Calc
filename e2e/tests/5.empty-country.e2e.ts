import { MainPage } from "../pages/main-page.po";

describe('Country field is empty', () => {
    let mainPage = new MainPage();
    const name: string = 'Иванов Иван Иванович';
    const email: string = 'test1907@gmail.com';
    const phone: string = '+380993457213';

    beforeAll(() => {
        mainPage.navigeteTo();
        mainPage.fillNameEmailPhone(name, email, phone);
        mainPage.pointDispatch.click();
        mainPage.chooseCityDispatch.get(2).click();
        mainPage.waitForLoading(3);
    });

    it('Check error message and calculation results', () => {
        expect(mainPage.countryUndefined.getText()).toEqual('Страна не выбрана');
        expect(mainPage.deliveryTime.getText()).toEqual('0');
        expect(mainPage.costPacking.getText()).toEqual('0,00');
        expect(mainPage.costDelivery.getText()).toEqual('0,00');
        expect(mainPage.costInsurance.getText()).toEqual('0,00');
        expect(mainPage.total.getText()).toEqual('0,00');
    });
});