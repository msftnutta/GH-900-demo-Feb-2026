# Unit Tests Documentation - World Clock & Weather Dashboard

## Overview
This document describes the comprehensive test suite for the World Clock & Weather Dashboard application. The tests are designed to validate the display of date/time for Singapore, India, Australia, and Japan, as well as the weather data sections for these four countries.

## Test Files

### 1. `app.test.js` - Unit Tests
Covers individual components and HTML structure validation.

### 2. `app.integration.test.js` - Integration Tests
Covers server responses, DOM structure, and client-side functionality integration.

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Setup
```bash
# Install dependencies
npm install

# This will install Jest and other required testing frameworks
```

## Running the Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Tests with Coverage Report
```bash
npm run test:coverage
```

### Run Specific Test File
```bash
npm test -- app.test.js
npm test -- app.integration.test.js
```

### Run Specific Test Suite
```bash
npm test -- --testNamePattern="DateTime Display Tests"
npm test -- --testNamePattern="Weather Data Display Tests"
```

## Test Coverage

### DateTime Display Tests (app.test.js)
Tests verify that:
- ✅ Time display elements exist with correct IDs (sg-time, au-time, in-time, jp-time)
- ✅ Date display elements exist with correct IDs (sg-date, au-date, in-date, jp-date)
- ✅ City names are correctly displayed (Singapore, Australia (Sydney), India (New Delhi), Japan (Tokyo))
- ✅ Country flag emojis are displayed (🇸🇬, 🇦🇺, 🇮🇳, 🇯🇵)
- ✅ Initial loading state shows "--:--:--" and "Loading..."
- ✅ Proper CSS classes are applied (time-display, date-display, clock-card)

### Weather Data Display Tests (app.test.js)
Tests verify that:
- ✅ Weather card section exists
- ✅ Weather container element with correct ID exists
- ✅ Error message element is present
- ✅ Loading message displays initially
- ✅ All 4 city coordinates are included (Singapore, Sydney, New Delhi, Tokyo)
- ✅ Azure Maps API endpoint is correctly referenced
- ✅ Weather data fields are present (Temperature, Condition, Humidity, Wind)
- ✅ Bootstrap grid classes are properly applied

### Integration Tests (app.integration.test.js)

#### Singapore Time Display
- ✅ sg-time element with time-display class
- ✅ sg-date element with date-display class
- ✅ Singapore flag emoji (🇸🇬)
- ✅ Singapore city name

#### Australia Time Display
- ✅ au-time element
- ✅ au-date element
- ✅ Australia flag emoji (🇦🇺)
- ✅ Australia (Sydney) city name

#### India Time Display
- ✅ in-time element
- ✅ in-date element
- ✅ India flag emoji (🇮🇳)
- ✅ India (New Delhi) city name

#### Japan Time Display
- ✅ jp-time element
- ✅ jp-date element
- ✅ Japan flag emoji (🇯🇵)
- ✅ Japan (Tokyo) city name

#### Weather Container
- ✅ weather-container element exists
- ✅ Loading class applied initially
- ✅ Loading message displays
- ✅ Weather card section present
- ✅ Weather forecast heading present

#### Weather API Integration
- ✅ Azure Maps API endpoint referenced
- ✅ API version parameter (1.1)
- ✅ Details parameter set to true
- ✅ All city coordinates included:
  - Singapore: 1.3521, 103.8198
  - Sydney: -33.8688, 151.2093
  - New Delhi: 28.7041, 77.1025
  - Tokyo: 35.6762, 139.6503

#### Weather Data Fields
- ✅ Temperature data display
- ✅ Weather condition display
- ✅ Humidity percentage display
- ✅ Wind speed display

#### JavaScript Functionality
- ✅ Timezone configuration for all 4 cities
- ✅ updateTime() function exists and is called
- ✅ setInterval() updates time every second
- ✅ Intl.DateTimeFormat for proper formatting
- ✅ 24-hour time format
- ✅ loadWeather() async function exists
- ✅ API key validation
- ✅ Fetch API usage for weather requests

## Test Examples

### Example: Test DateTime Display
```javascript
test('HTML should contain Singapore time display element with id "sg-time"', () => {
    const htmlContent = getHtmlContentForTest();
    expect(htmlContent).toContain('id="sg-time"');
});
```

### Example: Test Weather Data
```javascript
test('Should include city coordinates for Singapore', () => {
    expect(htmlContent).toContain('{ name: \'Singapore\', lat: 1.3521, lon: 103.8198 }');
});
```

### Example: Test Timezone Configuration
```javascript
test('Should have Singapore timezone', () => {
    expect(htmlContent).toContain("'sg': 'Asia/Singapore'");
});
```

### Example: Test Weather Fields
```javascript
test('Should display temperature data', () => {
    expect(htmlContent).toContain('Temperature:');
    expect(htmlContent).toContain('${weather.temperature.value}');
});
```

## Test Results

When you run the tests, you should see output similar to:

```
PASS  app.test.js
  World Clock & Weather Dashboard Tests
    DateTime Display Tests
      ✓ HTML should contain time display element for Singapore (3 ms)
      ✓ HTML should contain time display element for Australia (1 ms)
      ✓ HTML should contain time display element for India (1 ms)
      ✓ HTML should contain time display element for Japan (1 ms)
      ✓ HTML should contain Singapore date display element (2 ms)
      ✓ HTML should contain Australia date display element (1 ms)
      ✓ HTML should contain India date display element (1 ms)
      ✓ HTML should contain Japan date display element (1 ms)
      ✓ HTML should have correct city names displayed (1 ms)
      ✓ HTML should have country flag emojis (2 ms)
    Weather Data Display Tests
      ✓ HTML should contain weather card section (1 ms)
      ✓ HTML should contain weather container element (1 ms)
      ✓ HTML should have weather heading (1 ms)
      ✓ Should include all 4 city coordinates for weather API calls (1 ms)
      ...

Test Suites: 2 passed, 2 total
Tests:       120+ passed, 120+ total
```

## Continuous Integration

### GitHub Actions
Add a `.github/workflows/test.yml` file:

```yaml
name: Run Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm test -- --coverage
```

## Troubleshooting

### Tests Fail with "Cannot find module 'config.json'"
- Ensure `config.json` exists in the project root
- Update the file paths in the test files if needed

### Tests Show "Jest Not Installed"
```bash
npm install --save-dev jest
```

### Port Already in Use
- Tests run with mocked server, but if you get port errors, check for existing processes:
```bash
# Windows
netstat -ano | findstr :3001

# Mac/Linux
lsof -i :3001
```

## Best Practices

1. **Run Tests Before Commits**: Always run tests before committing code
2. **Maintain Test Coverage**: Aim for >80% code coverage
3. **Update Tests with Features**: When adding features, add corresponding tests
4. **Use Meaningful Test Names**: Tests should clearly describe what they verify
5. **Group Related Tests**: Use `describe()` blocks to organize related tests

## Adding New Tests

To add new tests:

1. Open the appropriate test file (`app.test.js` or `app.integration.test.js`)
2. Add a new `test()` or `it()` block within the appropriate `describe()` block
3. Write the test case (use clear assertions)
4. Run the tests to verify they pass

### Example:
```javascript
test('Should display new feature correctly', () => {
    const htmlContent = getHtmlContentForTest();
    expect(htmlContent).toContain('new-feature-id');
});
```

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Node.js Testing Guide](https://nodejs.org/en/docs/)
- [World Clock & Weather App](./README.md)

## Contact

For questions about these tests, please refer to the main project documentation.
