import { defineConfig } from '@playwright/test';

export default defineConfig({

    reporter: [["list"], ["html", { outputFolder: "playwright-report", open: "on-failure" }]],

    use: {
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' },
        },
    ],
});
