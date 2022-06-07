import { textChangeRangeIsUnchanged } from "typescript"

class CartPage {
    // Selektor odpowiedzialny za zawartość alertu po dodaniu do koszyka
    get alertCartText() {
        return $("div.successbox > p")
    }

    // Selektor odpowiedzialny za cenę książki
    get cartBookPrice() {
        return $("div.cart-summary  #cart-edit-summary")
    }

    // Selektor od checbox w koszyku
    get cartCheckbox() {
        return $("form#formularz tr th.checkbox")
    }

    // Selektor usuń zaznaczone
    get deleteMarkedButton() {
        return $("div#usun > p > a")
    }

    // Selektor komuniaktu o pustym koszyku
    get emptyCartAlert() {
        return $("div.infobox > p")
    }


    // Metoda sprawdzająca zgodność tekstu w alercie
    async cartAlertTextIsCorrect():Promise<string> {
        // Pobranie selektora
        const alert:WebdriverIO.Element = await this.alertCartText;
        await alert.waitForDisplayed();
        return await alert.getText();
    }

    // Metoda sprawdzająca cenę książki 
    async checkBookPrice():Promise<string> {
        const price:WebdriverIO.Element = await this.cartBookPrice;
        await price.waitForDisplayed();
        return await price.getText();
    }

    // Metoda zaznaczająca checbox przy produkcie w koszyku
    async checkProductChecbox() {
        const checkbox:WebdriverIO.Element = await this.cartCheckbox;
        await checkbox.waitForDisplayed();
        await checkbox.scrollIntoView();
        await checkbox.click();
    }   

    // Metoda klikająca w przycisk "Usuń zaznaczone"
    async deleteMarked() {
        const btn:WebdriverIO.Element = await this.deleteMarkedButton;
        await btn.waitForDisplayed();
        await btn.scrollIntoView();
        await btn.click()
    }
    // Metoda sprawdzająca zawartość alertu
    async checkAlertText() {
        //@
        const alertText:string = await browser.getAlertText();
    }

    // Metoda akceptująca alert
    async acceptDeleteAlert() {
        await browser.acceptAlert();
        await expect(await browser.isAlertOpen()).toBeFalsy();
    }

    // Metoda weryfikująca czy pojawił się komunikat "Twój koszyk jest pusty"
    async checkEmptyCartAlert():Promise<string> {
        const alert:WebdriverIO.Element = await this.emptyCartAlert;
        await alert.waitForDisplayed();
        return await alert.getText();
    }
}
export default new CartPage();