/**
 * Simplified Unit Tests for World Clock & Weather Dashboard
 * Focused on verifying datetime and weather display elements
 */

const fs = require('fs');
const path = require('path');

// Read the app.js file
const appFilePath = path.join(__dirname, 'app.js');
const appContent = fs.readFileSync(appFilePath, 'utf8');

describe('World Clock & Weather Dashboard - DateTime & Weather Tests', () => {
    
    describe('DateTime Display Elements - Singapore', () => {
        test('should have Singapore time display element', () => {
            expect(appContent).toContain('id="sg-time"');
        });

        test('should have Singapore date display element', () => {
            expect(appContent).toContain('id="sg-date"');
        });

        test('should have Singapore city name', () => {
            expect(appContent).toContain('Singapore');
        });

        test('should have Singapore flag emoji', () => {
            expect(appContent).toContain('🇸🇬');
        });
    });

    describe('DateTime Display Elements - Australia', () => {
        test('should have Australia time display element', () => {
            expect(appContent).toContain('id="au-time"');
        });

        test('should have Australia date display element', () => {
            expect(appContent).toContain('id="au-date"');
        });

        test('should have Australia city name (Sydney)', () => {
            expect(appContent).toContain('Australia (Sydney)');
        });

        test('should have Australia flag emoji', () => {
            expect(appContent).toContain('🇦🇺');
        });
    });

    describe('DateTime Display Elements - India', () => {
        test('should have India time display element', () => {
            expect(appContent).toContain('id="in-time"');
        });

        test('should have India date display element', () => {
            expect(appContent).toContain('id="in-date"');
        });

        test('should have India city name (New Delhi)', () => {
            expect(appContent).toContain('India (New Delhi)');
        });

        test('should have India flag emoji', () => {
            expect(appContent).toContain('🇮🇳');
        });
    });

    describe('DateTime Display Elements - Japan', () => {
        test('should have Japan time display element', () => {
            expect(appContent).toContain('id="jp-time"');
        });

        test('should have Japan date display element', () => {
            expect(appContent).toContain('id="jp-date"');
        });

        test('should have Japan city name (Tokyo)', () => {
            expect(appContent).toContain('Japan (Tokyo)');
        });

        test('should have Japan flag emoji', () => {
            expect(appContent).toContain('🇯🇵');
        });
    });

    describe('Weather Data Display Elements', () => {
        test('should have weather container element', () => {
            expect(appContent).toContain('id="weather-container"');
        });

        test('should have weather error message element', () => {
            expect(appContent).toContain('id="error-message"');
        });

        test('should have weather forecast heading', () => {
            expect(appContent).toContain('🌤️ Weather Forecast');
        });

        test('should have loading state message', () => {
            expect(appContent).toContain('Loading weather data...');
        });
    });

    describe('Weather API Integration - City Coordinates', () => {
        test('should have Singapore coordinates', () => {
            expect(appContent).toContain('1.3521');
            expect(appContent).toContain('103.8198');
        });

        test('should have Sydney coordinates', () => {
            expect(appContent).toContain('-33.8688');
            expect(appContent).toContain('151.2093');
        });

        test('should have New Delhi coordinates', () => {
            expect(appContent).toContain('28.7041');
            expect(appContent).toContain('77.1025');
        });

        test('should have Tokyo coordinates', () => {
            expect(appContent).toContain('35.6762');
            expect(appContent).toContain('139.6503');
        });
    });

    describe('Weather Data Fields', () => {
        test('should display temperature data', () => {
            expect(appContent).toContain('Temperature:');
        });

        test('should display weather condition', () => {
            expect(appContent).toContain('Condition:');
        });

        test('should display humidity', () => {
            expect(appContent).toContain('Humidity:');
        });

        test('should display wind speed', () => {
            expect(appContent).toContain('Wind:');
        });
    });

    describe('Timezone Configuration', () => {
        test('should have Singapore timezone', () => {
            expect(appContent).toContain("'sg': 'Asia/Singapore'");
        });

        test('should have Australia timezone', () => {
            expect(appContent).toContain("'au': 'Australia/Sydney'");
        });

        test('should have India timezone', () => {
            expect(appContent).toContain("'in': 'Asia/Kolkata'");
        });

        test('should have Japan timezone', () => {
            expect(appContent).toContain("'jp': 'Asia/Tokyo'");
        });
    });

    describe('Time Update Functionality', () => {
        test('should have updateTime function', () => {
            expect(appContent).toContain('function updateTime()');
        });

        test('should call updateTime on load', () => {
            expect(appContent).toContain('updateTime()');
        });

        test('should update time every second', () => {
            expect(appContent).toContain('setInterval(updateTime, 1000)');
        });

        test('should use Intl.DateTimeFormat', () => {
            expect(appContent).toContain('Intl.DateTimeFormat');
        });
    });

    describe('Weather Loading Functionality', () => {
        test('should have async loadWeather function', () => {
            expect(appContent).toContain('async function loadWeather()');
        });

        test('should call loadWeather on page load', () => {
            expect(appContent).toContain('loadWeather()');
        });

        test('should validate API key', () => {
            expect(appContent).toContain('if (!apiKey');
        });

        test('should use Azure Maps API', () => {
            expect(appContent).toContain('atlas.microsoft.com/weather');
        });

        test('should use fetch API', () => {
            expect(appContent).toContain('fetch(');
        });
    });

    describe('UI/UX Elements', () => {
        test('should have proper HTML5 structure', () => {
            expect(appContent).toContain('<!DOCTYPE html>');
            expect(appContent).toContain('<html');
        });

        test('should use Bootstrap framework', () => {
            expect(appContent).toContain('bootstrap');
        });

        test('should have responsive grid classes', () => {
            expect(appContent).toContain('col-md-6');
            expect(appContent).toContain('col-lg');
        });

        test('should have page title', () => {
            expect(appContent).toContain('World Clock & Weather Dashboard');
        });

        test('should have UTF-8 charset', () => {
            expect(appContent).toContain('UTF-8');
        });

        test('should have viewport meta tag', () => {
            expect(appContent).toContain('viewport');
        });
    });

    describe('Error Handling and Fallbacks', () => {
        test('should have error message for missing API key', () => {
            expect(appContent).toContain('Azure Maps API key');
        });

        test('should provide API key setup instructions', () => {
            expect(appContent).toContain('accounts.azure.com/signup');
        });

        test('should handle weather fetch errors', () => {
            expect(appContent).toContain('catch (error)');
        });

        test('should show fallback message when weather fails', () => {
            expect(appContent).toContain('Unable to load weather data');
        });
    });
});
