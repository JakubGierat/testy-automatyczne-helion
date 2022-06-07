import { deleteAlertText, emptyCartText, searchPhrase,} from "../../config/data";
import { addCartUrl, helionHomeUrl, searchProductUrl } from "../../config/pagesUrl";
import SearchbarPage from "../../pages/components/SearchbarPage";
import SearchResultPage from "../../pages/SearchResultPage";
import ProductPage from "../../pages/ProductPage";
import CartPage from "../../pages/CartPage";

describe("E2E - Products",async () => {
    // Ustalenie typu stałego dla zmiennej tytułu książki
    let productTitle: string = "";
    let productPrice: string = "";

    // Precondition - przed testami otwórz stronę Helion.pl - zastosowanie hook'a
    before(() => { 
        browser.url(helionHomeUrl);
    })

    it("Should type search phrase and click search icon",async () => {
        // Wpisanie wyszukiwanej frazy w input
        await SearchbarPage.typeSearchPhrase(searchPhrase);
        // Kliknięcie search icon
        await SearchbarPage.clickOnSearchIcon();
        // Sprawdzenie czy przekierowano na stronę o oczekiwanym url:
        await expect(browser).toHaveUrl(searchProductUrl);
    })

    it("Should click first book cover and verify the title and 'add to cart' button",async () => {
        // Kliknięcie na pierwszy kafelek
        await SearchResultPage.clickFirstCover();
        // Sprawdzenie tytułu
        await ProductPage.getBookTitle();
        // Sprawdzenie wyświetlania się przycisku "Dodaj do koszyka"
        await ProductPage.AddToCartBtnIsVisible();
        // Zapis do wcześniej zdefiniowanego typu stałego let tytułu książki:
        productTitle= await ProductPage.getProductTitleValue();
        // Zapis do wcześniej zdefiniowanego typu stałego ceny książki:
        productPrice = await ProductPage.getBookPriceOnProductPage();
    })

    it("Should click 'add to cart' button and verify url and prize",async () => {
        // Kliknięcie na przycisk 
        await ProductPage.ClickAddToCardBtn();
        // Asercja
        await expect(browser).toHaveUrlContaining(addCartUrl);

        //Pobranie tekstu alertu dodania do koszyka
        const alert:string = await CartPage.cartAlertTextIsCorrect();
        // Sprawdzenie poprawności alertu
        await expect(await CartPage.cartAlertTextIsCorrect()).toContain(productTitle);

        // Weryfikacja ceny
        // Porównanie ceny z koszyka z cena z strony produktu
        await expect(await CartPage.checkBookPrice()).toContain(productPrice);
    })

    it("Should click product Checkbox and delete",async () => {
        // Wywołanie zaznaczenia produktów w koszyku
        await CartPage.checkProductChecbox();
        // Metoda usunięcia zaznaczonych produktów w koszyku
        await CartPage.deleteMarked();
        // Sprawdzenie alertu
        //console.log(await browser.getAlertText())
        await expect(await browser.getAlertText()).toContain(deleteAlertText);
        // Zaakceptowanie alertu
        await CartPage.acceptDeleteAlert();
        // Sprawdzenie poprawności alertu " Twój koszyk jest pusty "
        console.log(await CartPage.checkEmptyCartAlert());
        await expect(await CartPage.checkEmptyCartAlert()).toContain(emptyCartText);
    })

})