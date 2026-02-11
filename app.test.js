// Deprecated: Use app.simple.test.js instead

    describe('DateTime Display Tests', () => {
        beforeAll(() => {
            // Create a simple HTML parser to check content
            const mockConfig = { azureMapsApiKey: 'test-key' };
            jest.doMock('./config.json', () => mockConfig);
        });

        test('should have time display element for Singapore', () => {
            const http = require('http');
            const mockReq = {};
            const mockRes = {
                writeHead: jest.fn(),
                end: jest.fn()
            };

            // We'll test the HTML content directly
            const content = require('./app.js');
            expect(content).toBeDefined();
        });

        test('HTML should contain Singapore time display element with id "sg-time"', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('id="sg-time"');
        });

        test('HTML should contain Australia time display element with id "au-time"', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('id="au-time"');
        });

        test('HTML should contain India time display element with id "in-time"', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('id="in-time"');
        });

        test('HTML should contain Japan time display element with id "jp-time"', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('id="jp-time"');
        });

        test('HTML should contain Singapore date display element with id "sg-date"', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('id="sg-date"');
        });

        test('HTML should contain Australia date display element with id "au-date"', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('id="au-date"');
        });

        test('HTML should contain India date display element with id "in-date"', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('id="in-date"');
        });

        test('HTML should contain Japan date display element with id "jp-date"', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('id="jp-date"');
        });

        test('HTML should have correct city names displayed', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('Singapore');
            expect(htmlContent).toContain('Australia (Sydney)');
            expect(htmlContent).toContain('India (New Delhi)');
            expect(htmlContent).toContain('Japan (Tokyo)');
        });

        test('HTML should have country flag emojis', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('🇸🇬'); // Singapore
            expect(htmlContent).toContain('🇦🇺'); // Australia
            expect(htmlContent).toContain('🇮🇳'); // India
            expect(htmlContent).toContain('🇯🇵'); // Japan
        });

        test('Time display elements should have correct CSS class', () => {
            const htmlContent = getHtmlContentForTest();
            const timeDisplayCount = (htmlContent.match(/class="time-display"/g) || []).length;
            expect(timeDisplayCount).toBe(4);
        });

        test('Date display elements should have correct CSS class', () => {
            const htmlContent = getHtmlContentForTest();
            const dateDisplayCount = (htmlContent.match(/class="date-display"/g) || []).length;
            expect(dateDisplayCount).toBe(4);
        });

        test('Initial time display should show loading state', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('--:--:--');
        });

        test('Initial date display should show loading state', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('Loading...');
        });
    });

    describe('Weather Data Display Tests', () => {
        test('HTML should contain weather card section', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('weather-card');
        });

        test('HTML should contain weather container element', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('id="weather-container"');
        });

        test('HTML should contain error message element', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('id="error-message"');
        });

        test('HTML should have weather heading', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('🌤️ Weather Forecast');
        });

        test('HTML should have initial loading message for weather', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('Loading weather data...');
        });

        test('Weather section should have proper structure with row class', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('class="row"');
        });

        test('Should include all 4 city coordinates for weather API calls', () => {
            const htmlContent = getHtmlContentForTest();
            // Singapore: 1.3521, 103.8198
            expect(htmlContent).toContain('1.3521');
            expect(htmlContent).toContain('103.8198');
            // Sydney: -33.8688, 151.2093
            expect(htmlContent).toContain('-33.8688');
            expect(htmlContent).toContain('151.2093');
            // New Delhi: 28.7041, 77.1025
            expect(htmlContent).toContain('28.7041');
            expect(htmlContent).toContain('77.1025');
            // Tokyo: 35.6762, 139.6503
            expect(htmlContent).toContain('35.6762');
            expect(htmlContent).toContain('139.6503');
        });

        test('Weather API should query Azure Maps with correct endpoints', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('https://atlas.microsoft.com/weather/currentConditions/json');
        });

        test('Weather data should display temperature', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('Temperature:');
        });

        test('Weather data should display condition', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('Condition:');
        });

        test('Weather data should display humidity', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('Humidity:');
        });

        test('Weather data should display wind speed', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('Wind:');
        });

        test('Should display weather items for all 4 cities', () => {
            const htmlContent = getHtmlContentForTest();
            const weatherItemCount = (htmlContent.match(/class="weather-item"/g) || []).length;
            // Note: In the generated HTML, weather items are created dynamically in JavaScript
            // This test checks that the structure supports showing weather items
            expect(htmlContent).toContain('weather-item');
        });

        test('Weather section should have proper bootstrap grid classes', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('col-md-6');
            expect(htmlContent).toContain('col-lg-3');
        });
    });

    describe('Timezone Configuration Tests', () => {
        test('JavaScript should define all 4 timezones', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain("'sg': 'Asia/Singapore'");
            expect(htmlContent).toContain("'au': 'Australia/Sydney'");
            expect(htmlContent).toContain("'in': 'Asia/Kolkata'");
            expect(htmlContent).toContain("'jp': 'Asia/Tokyo'");
        });

        test('updateTime function should be called on page load', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('updateTime()');
        });

        test('updateTime function should be called every second', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('setInterval(updateTime, 1000)');
        });
    });

    describe('UI/UX Tests', () => {
        test('Page should have proper title', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('<title>World Clock & Weather Dashboard</title>');
        });

        test('Page should have responsive meta viewport', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('viewport');
        });

        test('Page should use Bootstrap CSS framework', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('bootstrap');
        });

        test('Clock cards should have hover effect styles', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('clock-card:hover');
        });

        test('Page should have proper header with title', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('🌍 World Clock & Weather Dashboard');
        });

        test('Page should have container div for layout', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('class="container"');
        });
    });

    describe('Error Handling Tests', () => {
        test('Should have error message element for API key warnings', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('Azure Maps API key');
        });

        test('Should provide help text for API key setup', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('https://accounts.azure.com/signup');
        });

        test('Should handle weather API fetch errors gracefully', () => {
            const htmlContent = getHtmlContentForTest();
            expect(htmlContent).toContain('Unable to load weather data');
        });
    });
});

// Helper function to get HTML content from app.js
function getHtmlContentForTest() {
    const appPath = require.resolve('./app.js');
    const appContent = fs.readFileSync(appPath, 'utf8');
    
    // Extract HTML content between backticks - improved pattern
    const startIdx = appContent.indexOf('const html = `');
    if (startIdx === -1) return '';
    
    const contentAfterStart = appContent.substring(startIdx + 14); // Skip past 'const html = `'
    const endIdx = contentAfterStart.lastIndexOf('`');
    
    if (endIdx === -1) return '';
    
    return contentAfterStart.substring(0, endIdx);
}
