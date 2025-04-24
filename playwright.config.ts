import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'local';
const envFile = env === 'local' ? '.env' : `.env.${env}`;
const envPath = path.resolve(__dirname, envFile);

console.log(`Loading environment from: ${envPath}`);
dotenv.config({ path: envPath });

export default defineConfig({
    testDir: './tests',
    testMatch: ['**/*.test.ts', '**/*spec.ts', '**/test.ts'],
    timeout: 30000,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : 2,
    reporter: [
        ['list'],
        ['html', { outputFolder: 'playwright-report', open: 'on-failure' }],
        ['junit', { outputFile: 'test-results/junit.xml' }]
    ],
    outputDir: 'test-results/',
    use: {
        baseURL: process.env.BASE_URL || 'http://localhost:3005',
        headless: true,
        ignoreHTTPSErrors: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        viewport: { width: 1280, height: 720 },
        acceptDownloads: true,
        actionTimeout: 10000,
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
        },
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
            },
        },
        // {
        //     name: 'webkit',
        //     use: {
        //         ...devices['Desktop Safari'],
        //     },
        // },
    ],
});