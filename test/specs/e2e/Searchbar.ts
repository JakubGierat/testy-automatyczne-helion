import GlobalPage from "../../pages/GlobalPage";
import SearchBarPage from "../../pages/components/SearchbarPage";
import SearchResultPage from "../../pages/SearchResultPage";
import { helionHomeUrl, notFoundUrl, seeAllBooksButtonUrl } from "../../config/pagesUrl";
import { amountBooks, incorrectSearchPhrase, notFoundMessage, searchPhrase, searchResultTitle } from "../../config/data";


describe("E2E searchbar",async () => {
    it("Should open home page and verify url and visible searchbar",async () => {
        // Metoda odpowiedzialna za sprawdzenie poprawności otwarcia strony głownej helion
        await GlobalPage.openPage(helionHomeUrl, helionHomeUrl + "/");
        // Metoda odpowiedzialna za widoczność paska wyszukiwania - najpierw wywołuje się class a po kropce metodę z tej class. 
        await SearchBarPage.searchBarIsVisible();
    })

    it("Should click on search Icon and verify url",async () => {
        await SearchBarPage.clickOnSearchIcon();
        await expect(browser).toHaveUrl(helionHomeUrl + "/")
    })

    it("Should type search value and verify visible of popup",async () => {
        await SearchBarPage.typeSearchPhrase(searchPhrase);
        await browser.pause(200);
        await SearchBarPage.suggestPopupIsVisible();
    })

    it("Should click on see all books button",async () => {
        await SearchBarPage.clickSeeAllBooksBtn();
        await expect(browser).toHaveUrl(seeAllBooksButtonUrl);
    })

    it("Should verify visible correctly title and number of books", async () => {
        // Pobranie do zmiennej title rezulatu - treści szukanej frazy w nagłówku h1
        const title:string = await SearchResultPage.getPageTitle();
        // Pobranie do zmienej ilości książek na stronie
        const numberOfBooks:number = await SearchResultPage.getNumberOfBooks();
        // Asercja tutułu h1
        await expect(title).toContain(searchResultTitle);
        // Asercja ilości książek
        await expect(numberOfBooks).toEqual(20);
    })

    it("Should clear input value",async () => {
        // Czyszczenie pola wyszukiwania 
        await SearchBarPage.clearSearchBar();
        // Sprawdzenie czy pole wyszukiwania nie zawiera wyszukiwanej frazy
        await expect(await SearchBarPage.getInputValue()).toContain("");
    })
    
    it("Should type incorrect book name and verify alert",async () => {
        // Wpisanie w pole wyszukiwania tekstu
        await SearchBarPage.typeSearchPhrase(incorrectSearchPhrase);
        // Kliknięcie na ikonkę wyszukiwania
        await SearchBarPage.clickOnSearchIcon();
        // Asercja sprawdzająca poprawność Alertu
        await expect(await SearchBarPage.getNotFoundAlertText()).toContain(notFoundMessage);
    })

    it("Should clear input value, click search icon and verify site refresh",async () => {
        // Wyczyszczenie search input
        await SearchBarPage.clearSearchBar();
        // Pauza dająca możliwość reakcji przeglądarki na usunięcie danych z pola input
        await browser.pause(500);
        // Kliknięcie na ikonkę szukaj
        await SearchBarPage.clickOnSearchIcon();
        // Sprawdzenie czy strona się odświeżyła
        await expect(browser).toHaveUrl(notFoundUrl);
        // Sprawdzenie czy input zawiera wyszukiwaną frazę 'blablabla'
        await expect(await SearchBarPage.getInputValue()).toContain(incorrectSearchPhrase);

    })
})