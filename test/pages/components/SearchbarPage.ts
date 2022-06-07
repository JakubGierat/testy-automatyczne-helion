
import { helionHomeUrl } from "../../config/pagesUrl";

class SearchBarPage {
    // Pobranie lokalizatora odpowiedzialnego za search bar
    get searchInput() {
        return $("#inputSearch");
    }
    // Pobieranie selektora odpowiedzialnego za lupkę  
    get searchIcon() {
        return $("//button[contains(text(),'Szukaj')]")
    }
    // Pobieranie selektora odpowiedzialnego za popUp
    get suggestPopup() {
        return $("form#szukanie .suggest-list")
    }
    // Pobieranie selektora odpowiedzianlnego za button zobacz wszystkie
    get seeAllBooksBtn() {
        return $("form#szukanie .button >a")
    }
    // Pobranie lokalizatora "Nie znaleziono strony"
    get notFoundAlert() {
        return $("div.not-found")
    }


    // Metoda umożliwiająca kliknięcie na ikonę lupki
    async clickOnSearchIcon() {
        // Pobieranie inputa ikonki
        const searchIcon:WebdriverIO.Element = await this.searchIcon;
        // Sprawdzenie czy ikonka jest widoczna
        await searchIcon.waitForDisplayed();
        // Kliknięcie
        await searchIcon.click()
    }
    
    // Metoda weryfikująca czy faktycznie widoczny jest searchbar
    async searchBarIsVisible() {
        // Pobranie inputa do zmiennej input
        const input:WebdriverIO.Element = await this.searchInput;
        // Czekaj aż input będzie widoczny - jeśli nie będzie widoczny to zwróci fail
        await input.waitForDisplayed();
        // Może być też asercja - zwróci true jeżeli input się wyświetli
        await expect(input.isDisplayed()).toBeTruthy;
    }

    //Metoda weryfikująca wpisanie do inputa
    async typeSearchPhrase(value: string) {
        // Pobranie input searchbar
        const input:WebdriverIO.Element = await this.searchInput;
        // Sprawdzenie widoczności input
        await input.waitForDisplayed();
        // Wpisanie wartości do input
        await input.setValue(value);
    }
    
    // Metoda weryfikująca czy Popup jest widoczny
    async suggestPopupIsVisible() {
        // Pobranie selektora do popup
        const popup:WebdriverIO.Element = await this.suggestPopup;
        // Sprawdzenie widoczności popup
        await popup.waitForDisplayed();
    }

    // Metoda wywołująca kliknięcie w button 'Zobacz wszytskie'
    async clickSeeAllBooksBtn() {
        // Pobieranie selektora do przycisku 'zobacz wszystkie'
        const btn:WebdriverIO.Element = await this.seeAllBooksBtn;
        // Sprawdzenie widoczności 
        await btn.waitForDisplayed();
        // Przed kliknięciem zescrollować do button
        await btn.scrollIntoView();
        // Kliknięcie na button
        await btn.click();
    }
    // Metoda odpowiedzialna za czyszczenie inputa
    async clearSearchBar() {
        const input:WebdriverIO.Element = await this.searchInput;
        await input.waitForDisplayed();
        await input.clearValue();

    }
    // Metoda pobierająca zawartość input
    async getInputValue():Promise<string> {
        const input:WebdriverIO.Element = await this.searchInput;
        await input.waitForDisplayed();
        return await input.getValue();
    }
    // Metoda sprawdzająca widoczność alertu oraz zwracająca tekst
    async getNotFoundAlertText():Promise<string> {
        const alert:WebdriverIO.Element = await this.notFoundAlert;
        await alert.waitForDisplayed();
        return await alert.getText();
    }
}

export default new SearchBarPage();