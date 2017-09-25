import { browser, ElementFinder, $, $$, ElementArrayFinder, element, by } from "protractor";

export class MainPage {

    userName: ElementFinder = $('.input');
    userPhone: ElementFinder = $('.customer_phone.js_phone_calc');
    userEmail: ElementFinder = $('input[name="user_email"]');

    userNameErrorMsg: ElementFinder = $('#user_name-error');
    userEmailErrorMsg: ElementFinder = $('#user_email-error');

    pointDispatch: ElementFinder = $('.jq-selectbox__trigger');
    chooseCityDispatch: ElementArrayFinder = $$('.jq-selectbox__dropdown>ul>li');

    recipientCountry: ElementFinder = $$('.select2-selection__arrow').first();
    chooseCountry = (country: string): ElementFinder => {
        return element(by.cssContainingText('li[id*="select2-countries"]', country))
    };

    recipientRegion: ElementFinder = $$('.select2-selection__arrow').get(1);
    chooseRegion = (region: string): ElementFinder => {
        return element(by.cssContainingText('li[id*="select2-regions"]', region))
    };

    recipientCity: ElementFinder = $$('.select2-selection__arrow').last();
    chooseCity = (city: string): ElementFinder => {
        return element(by.cssContainingText('li[id*="select2-cities"]', city))
    };

    typeDelivery: ElementArrayFinder = $$('.name-input-none');
    typeCargo: ElementArrayFinder = $$('.name-input-none');

    fullTextContent: ElementFinder = $('.text');


    purchasePrice: ElementFinder = $('input[name="purchase_price"]');
    weightСargo: ElementFinder = $('input[name="weight"]');
    numberSeats: ElementFinder = $('input[name="number_seats"]');
    checkboxInsurance: ElementFinder = $('.label-input-none');
    deliveryTime: ElementFinder = $('.js_delivery_time');
    costPacking: ElementFinder = $('.js_cost_packing');
    costDelivery: ElementFinder = $('.js_price_delivery');
    costInsurance: ElementFinder = $('.js_cost_insurance');
    total: ElementFinder = $('.js_total_cost');

    countryUndefined: ElementFinder = $$('.calc-container__label').get(8);

    fillNameEmailPhone(name: string, email: string, phone: string) {
        this.userName.sendKeys(name);
        this.userEmail.sendKeys(email);
        this.userPhone.sendKeys(phone);
    };

    choosePointDispatch() {
        this.pointDispatch.click();
        this.chooseCityDispatch.get(2).click();
    };

    fillRecipientData(country: string, region: string, city: string) {
        this.recipientCountry.click();
        this.chooseCountry(country).click();
        this.waitForLoading(5);
        this.recipientRegion.click();
        this.chooseRegion(region).click();
        this.waitForLoading(4);
        this.recipientCity.click();
        this.chooseCity(city).click();
        this.waitForLoading(2);
    };

    fillDeliveryParams(price: string, weight: string, seats: string) {
        this.typeDelivery.first().click();
        this.purchasePrice.sendKeys(price);
        this.weightСargo.sendKeys(weight);
        this.numberSeats.sendKeys(seats);
        this.waitForLoading(2);
    };

    navigeteTo() {
        browser.get("/")
    };

    waitForLoading(timeSec: number) {
        browser.sleep(timeSec * 1000);
    };
}