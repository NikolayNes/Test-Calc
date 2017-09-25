import { MainPage } from "../pages/main-page.po";
import { DataProvider } from "../data/data-provider";
const using = require('jasmine-data-provider');

using(DataProvider.validData, (data: any, description: string) => { //applying different data for locations, purchase, weight, seats, etc.
    describe('Input valid data and hard check results with: ' + description, () => {

        let mainPage = new MainPage();
        let packingCost, deliveryCost, insuranceCost;

        it('Open home page and fill data', () => {
            mainPage.navigeteTo();
            mainPage.fillNameEmailPhone(data.name, data.email, data.phone);
            mainPage.pointDispatch.click();
            mainPage.chooseCityDispatch.get(2).click();
            mainPage.recipientCountry.click();
            mainPage.chooseCountry(data.country).click();
            mainPage.waitForLoading(4);

            mainPage.recipientRegion.click();
            mainPage.chooseRegion(data.region).click();
            mainPage.waitForLoading(2);

            mainPage.recipientCity.click();
            mainPage.chooseCity(data.city).click();

            expect(mainPage.fullTextContent.getText()).toContain(data.country);
            expect(mainPage.fullTextContent.getText()).toContain(data.region);
            expect(mainPage.fullTextContent.getText()).toContain(data.city);
        });

        it('Add delivery param and check calculation results', () => {
            mainPage.typeDelivery.first().click();
            mainPage.fillDeliveryParams(data.purchase, data.weight, data.seats);
            mainPage.typeCargo.get(3).click();
            mainPage.waitForLoading(4); //wait for price changing

            mainPage.costPacking.getText().then((txt) => packingCost = parseInt(txt));
            mainPage.costDelivery.getText().then((txt) => deliveryCost = parseInt(txt));
            mainPage.costInsurance.getText().then((txt) => insuranceCost = parseInt(txt));

            expect(mainPage.deliveryTime.getText()).toEqual('30 - 35 ДНЕЙ');
            expect(mainPage.costPacking.getText()).toEqual(data.costPacking);
            expect(mainPage.costDelivery.getText()).toEqual(data.costDelivery);
            expect(mainPage.costInsurance.getText()).toEqual(data.costInsurance);
            expect(mainPage.total.getText()).toEqual(data.totalCost);
        });

        it('Check that total is a summ of packing, delivery, insurance', () => {
            expect(mainPage.total.getText()).toEqual(packingCost + deliveryCost + insuranceCost + ',00');
        });
    });
});