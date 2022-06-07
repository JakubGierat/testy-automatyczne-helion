// Klasy związane z testami na podstronach produktów
class ProductPage {

    // Pobranie selektora odpowiedzialnego za tytuł książki
    get firstBookTitle() {
        return $("div.title-group > h1 > span[itemprop='name']");
    }

    // Pobranie selektora odpowiedzialnego za przycisk dodaj do koszyka
    get addToCartButton() {
        return $("a#addToBasket_vwdtnp_w");
    }

    // Pobranie selektora odpowiedzialnego za cenę książki
    get bookPriceOnProductPage() {
        return $("#cena_w")
    }

    // Metoda weryfikująca tytuł
    async getBookTitle() {
        // Pobranie selektora
        const title:WebdriverIO.Element = await this.firstBookTitle;
        await title.waitForDisplayed();
    }
    // Metoda weryfikująca obecność przycisku "Dodaj do koszyka"
    async AddToCartBtnIsVisible() {
        // Pobranie selektora
        const btn:WebdriverIO.Element = await this.addToCartButton;
        // Sprawdzenie czy jest widoczny
        await btn.waitForDisplayed();
    }
    // Metoda Dodaj do kosztyka
    async ClickAddToCardBtn() {
        // Pobranie selektora
        const btn:WebdriverIO.Element = await this.addToCartButton;
        // Czy jest widoczny
        await btn.waitForDisplayed();
        // Zescrollowanie
        await btn.scrollIntoView();
        // Naciśnięcie
        await btn.click();
    }
    // Metoda odpowiedzialna za pobranie tytułu książki
    async getProductTitleValue():Promise<string> {
        // Pobranie selektora odpowiedzialnego za tytuł książki
        const title:WebdriverIO.Element = await this.firstBookTitle;
        await title.waitForDisplayed();
        // Pobranie tekstu z nagłówka
        return await title.getText();
    }
    // Metoda sprawdzająca cenę książki
    async getBookPriceOnProductPage():Promise<string> {
        const price:WebdriverIO.Element = await this.bookPriceOnProductPage;
        await price.waitForDisplayed();
        return await price.getText();
    }
}

export default new ProductPage();