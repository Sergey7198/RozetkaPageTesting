const rozetkaPage = require('../src/data/page_selectors/rozetka-page.js');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;


describe('Go to rozetka page', function () {
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
    });
    it('Go to page', function () {
        browser.waitForAngularEnabled(false);
        browser.get(rozetkaPage.rozetkaUrl);
        browser.sleep(3000);
        let popup = element(by.css(".popup-close"));
        popup.isDisplayed().then(function (exists) {
            if (exists) {
                popup.click();
            } else {
            }
        let newPopup = element(by.css(".exponea-close"));
            newPopup.isDisplayed().then(function (exists) {
            if (exists) {
            newPopup.click();
            } else {
                }
            });
        });
        browser.sleep(4000);
        const note = element(by.css(rozetkaPage.howerOnElements));
        browser.actions().mouseMove(note).perform();
        browser.sleep(1000);
    });

    it('Search some notebooks and change view', function () {

        element(by.cssContainingText(rozetkaPage.chooseNotebook, " Asus ")).click();
        browser.sleep(2000);
        element(by.css(rozetkaPage.filterView)).click();
        browser.sleep(2000);
    });

    it('Choose two notebooks for compare and go to results', function () {
        element(by.css(rozetkaPage.firstToCompare)).click();
        browser.sleep(2000);
        element(by.css(rozetkaPage.secondToCompare)).click();
        browser.sleep(1000);
        element(by.css(rozetkaPage.clickOnComparison)).click();
        browser.sleep(2000);
        element(by.css(rozetkaPage.results)).click();
        browser.sleep(2000);
    });

    it('Go through table rows and look for differences', function () {
        let array1 = [];
        let array2 = [];
        element.all(by.css(rozetkaPage.tableWithInfo)).getText().then(text => {
            toString();
            // Get info for first good and push it into array1
            for (let i = 1; i < text.length; i += 2) {
                array1.push(text[i])
            }
            // console.log(array1);
            // Get info for second good and push it into array2
            for (let i = 0; i < text.length; i += 2) {
                array2.push(text[i]);
            }
            // console.log(array2);
            //Check how many differences between 2 arrays
            let counter = 0;
            for (let i = 0; i < Math.max(array1.length, array2.length); i++) {
                if (array1[i] !== array2[i]) {
                    counter++;
                }
            }
            console.log(counter);
            browser.sleep(3000);
            element(by.css(rozetkaPage.onlyDifferences)).click();
            browser.sleep(2000);
            let differences = element.all(by.css(rozetkaPage.rowsExceptHidden));
            differences.count().then(function (counter2) {
                console.log(counter2);
                return expect(counter).to.equal(counter2);

            });
        });
    });
});


