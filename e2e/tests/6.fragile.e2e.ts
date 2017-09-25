import { MainPage } from "../pages/main-page.po";
import { DataProvider } from "../data/data-provider";
const using = require('jasmine-data-provider');

using(DataProvider.validData, (data: any, description: string) => { //applying different data for locations, purchase, weight, seats, etc.
    describe('Type cargo with ' + description, () => {
        let mainPage = new MainPage();
        let firstInt, secondInt;

        beforeAll(() => {
            mainPage.navigeteTo();
            mainPage.fillNameEmailPhone(data.name, data.email, data.phone);
            mainPage.choosePointDispatch();
            mainPage.fillRecipientData(data.country, data.region, data.city);
            mainPage.fillDeliveryParams(data.purchase, data.weight, data.seats);
            mainPage.waitForLoading(1);
        });

        it('Click to not fragile and check that total not null', () => {
            mainPage.typeCargo.get(3).click();
            mainPage.total.getText().then((res) => {
                firstInt = parseInt(res)
            });
            expect(mainPage.total.getText()).not.toEqual('0,00');
        });

        it('Click to fragile and check that total not null', () => {
            mainPage.typeCargo.get(4).click();
            mainPage.total.getText().then((res) => {
                secondInt = parseInt(res)
            });
            expect(mainPage.total.getText()).not.toEqual('0,00');
        });

        it('Check that not fragile cost less that fragile', () => {
            expect(secondInt).toBeGreaterThan(firstInt);
        });
    });
});