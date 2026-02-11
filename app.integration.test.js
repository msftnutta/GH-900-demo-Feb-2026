// Deprecated: Use app.simple.test.js instead
/*
const http = require('http');

describe('World Clock & Weather Dashboard - Integration Tests', () => {
    let server;
    const PORT = 3001; // Using different port to avoid conflicts

    beforeAll((done) => {
        // Mock config before requiring app
        jest.mock('./config.json', () => ({
            azureMapsApiKey: 'test-api-key-12345'
        }), { virtual: true });

        // Start a simple test server
        const mockConfig = { azureMapsApiKey: 'test-api-key' };
        jest.doMock('./config.json', () => mockConfig);
        done();
    });

    afterAll((done) => {
        if (server) {
            server.close(done);
        } else {
            done();
        }
    });

    describe('Server Response Tests', () => {
        test('Should return 200 status code for GET request', (done) => {
            const mockReq = {};
            const mockRes = {
                statusCode: 200,
                writeHead: jest.fn(),
                end: jest.fn()
            };

            // Simulate the server response
            mockRes.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            
            expect(mockRes.writeHead).toHaveBeenCalledWith(
                200,
                { 'Content-Type': 'text/html; charset=utf-8' }
            );
            done();
        });

        test('Should return HTML content with proper charset', (done) => {
            const mockRes = {
                headers: {},
                writeHead: jest.fn(function(status, headers) {
                    this.headers = headers;
                }),
                end: jest.fn()
            };

            mockRes.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            
            expect(mockRes.headers['Content-Type']).toBe('text/html; charset=utf-8');
            done();
        });
    });

    describe('DateTime Elements - DOM Structure Tests', () => {
        let htmlContent;

        beforeAll(() => {
            const fs = require('fs');
            const appPath = require.resolve('./app.js');
            const appContent = fs.readFileSync(appPath, 'utf8');
            
            // Extract HTML content - improved extraction
            const startIdx = appContent.indexOf('const html = `');
            if (startIdx !== -1) {
                const contentAfterStart = appContent.substring(startIdx + 14);
                const endIdx = contentAfterStart.lastIndexOf('`');
                htmlContent = endIdx !== -1 ? contentAfterStart.substring(0, endIdx) : '';
            } else {
                htmlContent = '';
            }
        });

        describe('Singapore Time Display', () => {
            test('Should have time element with id "sg-time"', () => {
                expect(htmlContent).toContain('id="sg-time"');
            });

            test('Should have date element with id "sg-date"', () => {
                expect(htmlContent).toContain('id="sg-date"');
            });

            test('Should display Singapore city name', () => {
                expect(htmlContent).toContain('Singapore');
            });

            test('Should display Singapore flag emoji', () => {
                expect(htmlContent).toContain('🇸🇬');
            });

            test('Time element should have time-display class', () => {
                const sgTimeSection = htmlContent.match(/<div class="d-flex align-items-center">[\s\S]*?🇸🇬[\s\S]*?<\/div>\s*<\/div>/);
                expect(sgTimeSection).toBeTruthy();
                expect(htmlContent).toContain('class="time-display" id="sg-time"');
            });
        });

        describe('Australia Time Display', () => {
            test('Should have time element with id "au-time"', () => {
                expect(htmlContent).toContain('id="au-time"');
            });

            test('Should have date element with id "au-date"', () => {
                expect(htmlContent).toContain('id="au-date"');
            });

            test('Should display Australia (Sydney) city name', () => {
                expect(htmlContent).toContain('Australia (Sydney)');
            });

            test('Should display Australia flag emoji', () => {
                expect(htmlContent).toContain('🇦🇺');
            });
        });

        describe('India Time Display', () => {
            test('Should have time element with id "in-time"', () => {
                expect(htmlContent).toContain('id="in-time"');
            });

            test('Should have date element with id "in-date"', () => {
                expect(htmlContent).toContain('id="in-date"');
            });

            test('Should display India (New Delhi) city name', () => {
                expect(htmlContent).toContain('India (New Delhi)');
            });

            test('Should display India flag emoji', () => {
                expect(htmlContent).toContain('🇮🇳');
            });
        });

        describe('Japan Time Display', () => {
            test('Should have time element with id "jp-time"', () => {
                expect(htmlContent).toContain('id="jp-time"');
            });

            test('Should have date element with id "jp-date"', () => {
                expect(htmlContent).toContain('id="jp-date"');
            });

            test('Should display Japan (Tokyo) city name', () => {
                expect(htmlContent).toContain('Japan (Tokyo)');
            });

            test('Should display Japan flag emoji', () => {
                expect(htmlContent).toContain('🇯🇵');
            });
        });
    });

    describe('Weather Data Elements - DOM Structure Tests', () => {
        let htmlContent;

        beforeAll(() => {
            const fs = require('fs');
            const appPath = require.resolve('./app.js');
            const appContent = fs.readFileSync(appPath, 'utf8');
            
            // Extract HTML content - improved extraction
            const startIdx = appContent.indexOf('const html = `');
            if (startIdx !== -1) {
                const contentAfterStart = appContent.substring(startIdx + 14);
                const endIdx = contentAfterStart.lastIndexOf('`');
                htmlContent = endIdx !== -1 ? contentAfterStart.substring(0, endIdx) : '';
            } else {
                htmlContent = '';
            }
        });

        describe('Weather Container', () => {
            test('Should have weather container element', () => {
                expect(htmlContent).toContain('id="weather-container"');
            });

            test('Weather container should have loading class initially', () => {
                expect(htmlContent).toContain('class="loading"');
            });

            test('Should display initial loading message', () => {
                expect(htmlContent).toContain('Loading weather data...');
            });

            test('Should have weather card section', () => {
                expect(htmlContent).toContain('class="weather-card"');
            });

            test('Should have weather forecast heading', () => {
                expect(htmlContent).toContain('🌤️ Weather Forecast');
            });
        });

        describe('Weather Error Handling', () => {
            test('Should have error message element', () => {
                expect(htmlContent).toContain('id="error-message"');
            });

            test('Error element should be hidden initially', () => {
                expect(htmlContent).toContain('style="display: none;"');
            });

            test('Should display warning for missing API key', () => {
                expect(htmlContent).toContain('Azure Maps API key not configured');
            });
        });

        describe('Weather API Integration', () => {
            test('Should reference Azure Maps weather API endpoint', () => {
                expect(htmlContent).toContain('https://atlas.microsoft.com/weather/currentConditions/json');
            });

            test('Should include api-version parameter', () => {
                expect(htmlContent).toContain('api-version=1.1');
            });

            test('Should request detailed weather information', () => {
                expect(htmlContent).toContain('details=true');
            });

            test('Should include city coordinates for Singapore', () => {
                expect(htmlContent).toContain('{ name: \'Singapore\', lat: 1.3521, lon: 103.8198 }');
            });

            test('Should include city coordinates for Sydney', () => {
                expect(htmlContent).toContain('Sydney, Australia');
                expect(htmlContent).toContain('-33.8688');
                expect(htmlContent).toContain('151.2093');
            });

            test('Should include city coordinates for New Delhi', () => {
                expect(htmlContent).toContain('New Delhi, India');
                expect(htmlContent).toContain('28.7041');
                expect(htmlContent).toContain('77.1025');
            });

            test('Should include city coordinates for Tokyo', () => {
                expect(htmlContent).toContain('Tokyo, Japan');
                expect(htmlContent).toContain('35.6762');
                expect(htmlContent).toContain('139.6503');
            });
        });

        describe('Weather Data Display Fields', () => {
            test('Should display temperature data', () => {
                expect(htmlContent).toContain('Temperature:');
                expect(htmlContent).toContain('${weather.temperature.value}');
            });

            test('Should display weather condition', () => {
                expect(htmlContent).toContain('Condition:');
                expect(htmlContent).toContain('${weather.phrase}');
            });

            test('Should display humidity percentage', () => {
                expect(htmlContent).toContain('Humidity:');
                expect(htmlContent).toContain('${weather.relativeHumidity}%');
            });

            test('Should display wind speed', () => {
                expect(htmlContent).toContain('Wind:');
                expect(htmlContent).toContain('${weather.wind.speed.value}');
            });

            test('Should use proper Bootstrap grid for weather items', () => {
                expect(htmlContent).toContain('col-md-6');
                expect(htmlContent).toContain('col-lg-3');
            });

            test('Weather items should have consistent styling', () => {
                expect(htmlContent).toContain('class="weather-item"');
            });
        });

        describe('Weather Error Fallback', () => {
            test('Should provide fallback UI for failed weather requests', () => {
                expect(htmlContent).toContain('Unable to load weather data');
            });

            test('Should maintain structure even if individual city weather fails', () => {
                // The code catches errors per city and still renders the card
                expect(htmlContent).toContain('catch (error)');
            });
        });
    });

    describe('JavaScript Functionality Tests', () => {
        let htmlContent;

        beforeAll(() => {
            const fs = require('fs');
            const appPath = require.resolve('./app.js');
            const appContent = fs.readFileSync(appPath, 'utf8');
            
            // Extract HTML content - improved extraction
            const startIdx = appContent.indexOf('const html = `');
            if (startIdx !== -1) {
                const contentAfterStart = appContent.substring(startIdx + 14);
                const endIdx = contentAfterStart.lastIndexOf('`');
                htmlContent = endIdx !== -1 ? contentAfterStart.substring(0, endIdx) : '';
            } else {
                htmlContent = '';
            }
        });

        describe('Timezone Configuration', () => {
            test('Should define timezones object', () => {
                expect(htmlContent).toContain('const timezones = {');
            });

            test('Should have Singapore timezone', () => {
                expect(htmlContent).toContain("'sg': 'Asia/Singapore'");
            });

            test('Should have Australia timezone', () => {
                expect(htmlContent).toContain("'au': 'Australia/Sydney'");
            });

            test('Should have India timezone', () => {
                expect(htmlContent).toContain("'in': 'Asia/Kolkata'");
            });

            test('Should have Japan timezone', () => {
                expect(htmlContent).toContain("'jp': 'Asia/Tokyo'");
            });
        });

        describe('Time Update Function', () => {
            test('Should have updateTime function', () => {
                expect(htmlContent).toContain('function updateTime()');
            });

            test('Should call updateTime on page load', () => {
                expect(htmlContent).toContain('updateTime()');
            });

            test('Should update time every second', () => {
                expect(htmlContent).toContain('setInterval(updateTime, 1000)');
            });

            test('Should use Intl.DateTimeFormat for formatting', () => {
                expect(htmlContent).toContain('Intl.DateTimeFormat');
            });

            test('Should format time as HH:MM:SS', () => {
                expect(htmlContent).toContain("hour: '2-digit'");
                expect(htmlContent).toContain("minute: '2-digit'");
                expect(htmlContent).toContain("second: '2-digit'");
            });

            test('Should use 24-hour format', () => {
                expect(htmlContent).toContain("hour12: false");
            });
        });

        describe('Weather Loading Function', () => {
            test('Should have loadWeather async function', () => {
                expect(htmlContent).toContain('async function loadWeather()');
            });

            test('Should call loadWeather on page load', () => {
                expect(htmlContent).toContain('loadWeather()');
            });

            test('Should validate API key before making requests', () => {
                expect(htmlContent).toContain('if (!apiKey || apiKey === \'YOUR_AZURE_MAPS_API_KEY\')');
            });

            test('Should iterate through all cities', () => {
                expect(htmlContent).toContain('for (const city of cities)');
            });

            test('Should use fetch API for weather requests', () => {
                expect(htmlContent).toContain('fetch(');
            });
        });
    });

    describe('UI Styling and Layout Tests', () => {
        let htmlContent;

        beforeAll(() => {
            const fs = require('fs');
            const appPath = require.resolve('./app.js');
            const appContent = fs.readFileSync(appPath, 'utf8');
            
            // Extract HTML content - improved extraction
            const startIdx = appContent.indexOf('const html = `');
            if (startIdx !== -1) {
                const contentAfterStart = appContent.substring(startIdx + 14);
                const endIdx = contentAfterStart.lastIndexOf('`');
                htmlContent = endIdx !== -1 ? contentAfterStart.substring(0, endIdx) : '';
            } else {
                htmlContent = '';
            }
        });

        test('Should use Bootstrap framework', () => {
            expect(htmlContent).toContain('bootstrap');
        });

        test('Should have gradient background', () => {
            expect(htmlContent).toContain('linear-gradient');
        });

        test('Clock cards should have hover effects', () => {
            expect(htmlContent).toContain('clock-card:hover');
        });

        test('Should have responsive design classes', () => {
            expect(htmlContent).toContain('col-md-6');
            expect(htmlContent).toContain('col-lg-4');
        });

        test('Should have proper spacing and padding', () => {
            expect(htmlContent).toContain('padding');
            expect(htmlContent).toContain('margin');
        });

        test('Time display should use monospace font', () => {
            expect(htmlContent).toContain('Courier New');
        });

        test('Should have shadow effects for depth', () => {
            expect(htmlContent).toContain('box-shadow');
        });
    });

    describe('Accessibility and Metadata Tests', () => {
        let htmlContent;

        beforeAll(() => {
            const fs = require('fs');
            const appPath = require.resolve('./app.js');
            const appContent = fs.readFileSync(appPath, 'utf8');
            
            // Extract HTML content - improved extraction
            const startIdx = appContent.indexOf('const html = `');
            if (startIdx !== -1) {
                const contentAfterStart = appContent.substring(startIdx + 14);
                const endIdx = contentAfterStart.lastIndexOf('`');
                htmlContent = endIdx !== -1 ? contentAfterStart.substring(0, endIdx) : '';
            } else {
                htmlContent = '';
            }
        });

        test('Should have proper HTML5 structure', () => {
            expect(htmlContent).toContain('<!DOCTYPE html>');
            expect(htmlContent).toContain('<html');
            expect(htmlContent).toContain('<head>');
            expect(htmlContent).toContain('<body>');
        });

        test('Should have UTF-8 charset defined', () => {
            expect(htmlContent).toContain('UTF-8');
        });

        test('Should have viewport meta tag for mobile', () => {
            expect(htmlContent).toContain('viewport');
            expect(htmlContent).toContain('initial-scale=1.0');
        });

        test('Should have descriptive page title', () => {
            expect(htmlContent).toContain('World Clock & Weather Dashboard');
        });

        test('Should have language attribute', () => {
            expect(htmlContent).toContain('lang="en"');
        });
    });
});
*/
