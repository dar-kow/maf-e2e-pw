import { test, expect, Page } from '@playwright/test';

test.describe("MAF Dashboard Tests", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://maf.sdet.pl")
    })

    test('url should contain substring ;) easy but difficult when yout troat tigh ', async ({ page }) => {
        //this is it document.title - helloł ! 

        const substring = "Portfolio"

        const title = await page.title()

        expect(title).toContain(substring);
    });

    test('url should contain substring faster way', async ({ page }) => {
        //one line test :P

        expect(await page.title()).toContain("Portfolio");
    });

    test("should url contain substring with async function", async ({ page }) => {
        const substring = "Portfolio"
        const succes = checkIfUrlContainsSubsting(page, substring)

        expect(succes).toBeTruthy()
    })

    async function checkIfUrlContainsSubsting(page: Page, substring: string): Promise<boolean> {
        const title = await page.title()
        return title.includes(substring)
    }

})

