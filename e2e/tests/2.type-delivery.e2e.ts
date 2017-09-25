import { MainPage } from "../pages/main-page.po";

describe('Checking cost on type of delivery', () => {
    let mainPage = new MainPage();
    const name: string = 'Иванов Иван Иванович';
    const email: string = 'test19891307@gmail.com';
    const phone: string = '+380993457213';
    const country: string = 'Беларусь';
    const region: string = 'Минская область';
    const city: string = 'Минск';
    const purchase: string = '160';
    const weight: string = '20';
    const seats: string = '1';

    beforeAll(() => {
        mainPage.navigeteTo();
        mainPage.fillNameEmailPhone(name, email, phone);
        mainPage.pointDispatch.click();
        mainPage.chooseCityDispatch.get(2).click();
        mainPage.waitForLoading(3);

        mainPage.recipientCountry.click();
        mainPage.chooseCountry(country).click();
        mainPage.waitForLoading(4);

        mainPage.recipientRegion.click();
        mainPage.chooseRegion(region).click();
        mainPage.waitForLoading(2);

        mainPage.recipientCity.click();
        mainPage.chooseCity(city).click();

        mainPage.fillDeliveryParams(purchase, weight, seats);
        mainPage.typeCargo.get(3).click();
    });

    it('Type auto', () => {
        mainPage.typeDelivery.first().click();
        mainPage.waitForLoading(2);
        expect(mainPage.total.getText()).toEqual('112,00');
    });

    it('Type railway', () => {
        mainPage.typeDelivery.get(1).click();
        mainPage.waitForLoading(2);
        expect(mainPage.total.getText()).toEqual('122,00');
    });

    it('Type avia', () => {
        mainPage.typeDelivery.get(2).click();
        mainPage.waitForLoading(2);
        expect(mainPage.total.getText()).toEqual('132,00');
    });
});