import { defineConfig, devices } from "@playwright/test";

// Puerto distinto al de `npm run dev` (3000) para no probar el servidor de desarrollo por accidente.
const PORT = 3100;
const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: "./tests/a11y",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: 0,
  workers: isCI ? 2 : undefined,
  reporter: [
    ["list"],
    ["junit", { outputFile: "reports/a11y/junit.xml" }],
    ["html", { open: "never", outputFolder: "playwright-report" }],
  ],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "movil", use: { ...devices["Pixel 7"] } },
    { name: "escritorio", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } } },
  ],
  // Siempre se prueba la compilación de producción. En CI el paso anterior ya compiló.
  webServer: {
    command: isCI ? `npm run start -- --port ${PORT}` : `npm run build && npm run start -- --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
    timeout: 180_000,
  },
});
