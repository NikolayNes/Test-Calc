import { MainPage } from "../pages/main-page.po";
import { DataProvider } from "../data/data-provider";
const using = require('jasmine-data-provider');

using(DataProvider.validData, (data: any, description: string) => { //applying different data for locations, purchase, weight, seats, etc.
    describe('Insurance check with ' + description, () => {
        let mainPage = new MainPage();
        let totalCostWithoutInsurance;

        beforeAll(() => {
            mainPage.navigeteTo();
            mainPage.fillNameEmailPhone(data.name, data.email, data.phone);
            mainPage.choosePointDispatch();
            mainPage.fillRecipientData(data.country, data.region, data.city);
            mainPage.fillDeliveryParams(data.purchase, data.weight, data.seats);
            mainPage.typeCargo.get(3).click();
        });

        it('Price without insurance', () => {
            mainPage.checkboxInsurance.click();
            mainPage.waitForLoading(3);
            mainPage.total.getText().then((txt) => totalCostWithoutInsurance = parseInt(txt));
            expect(mainPage.costInsurance.getText()).toEqual('0,00');
        });

        it('Price with insurance', () => {
            mainPage.checkboxInsurance.click();
            mainPage.waitForLoading(3);
            expect(mainPage.costInsurance.getText()).toEqual(data.costInsurance);
            expect(mainPage.total.getText()).toEqual((totalCostWithoutInsurance + parseInt(data.costInsurance)) + ',00');
        });
    });
});