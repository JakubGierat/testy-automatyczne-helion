// Testy związane z rezultatem działań na stronie głownej

class SearchResultPage {

    // Pobranie selektora odpowiedzialnego za nagłówek wyświetlający frazę szukaną tj. "Szukasz 'testowanie oprogramowania'"
    get resultHeader() {
        return $("h1#pageTitle")
    }

    // Pobranie selektorów odpowiedzialnych za wszystkie książki
    get booksItem() {
        return $$("ul.list > li");
    }

    // Pobranie selektora odpowiedzialnego za pierwszy kafelek z książką
    get firstBookCover() {
        return $("ul.list > li:nth-child(1) > a");
    }


    // Metoda weryfikująca poprawność nagłówka wyświetlającego szukaną frazę - dodanie string ponieważ chcemy aby metoda zwróciła string
    async getPageTitle():Promise<string> {
        // Pobranie selektora nagłówka
        const h1:WebdriverIO.Element = await this.resultHeader;
        // Sprawdzenie czy wyświetla się h1
        await h1.waitForDisplayed();
        // Pobranie tekstu z nagłówka h1
        return await h1.getText();
    }

    // Metoda zwracająca ilość książek na stronie
    async getNumberOfBooks():Promise<number> {
        // Pobranie selektora nagłówka
        const books:WebdriverIO.ElementArray = await this.booksItem;
        // Pobranie ilości wyświetlonych elementów
        return await books.length;
    }
    // Metoda odpowiedzialna z kliknięcie w pierwszy kafelek
    async clickFirstCover() {
        // Pobranie selektora kafelka
        const cover:WebdriverIO.Element = await this.firstBookCover;
        // Sprawdzenie czy się wyświetla:
        await cover.waitForDisplayed();
        // Kliknięcie w pierwszy kafelek
        await cover.click();
    }

    
}
export default new SearchResultPage();




