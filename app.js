const http = require('http');
const fs = require('fs');
const config = require('./config.json');

function getHtmlContent() {
    const apiKey = config.azureMapsApiKey;
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>World Clock & Weather Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
        }
        .header {
            text-align: center;
            color: white;
            margin-bottom: 40px;
        }
        .header h1 {
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .clock-card {
            background: white;
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 20px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
            transition: transform 0.3s ease;
        }
        .clock-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 30px rgba(0,0,0,0.3);
        }
        .city-name {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
        }
        .time-display {
            font-size: 32px;
            font-weight: bold;
            color: #667eea;
            font-family: 'Courier New', monospace;
            margin-bottom: 10px;
        }
        .time-format-badge {
            display: inline-block;
            background: #667eea;
            color: white;
            font-size: 11px;
            padding: 3px 8px;
            border-radius: 12px;
            margin-left: 10px;
            font-weight: 600;
            vertical-align: middle;
        }
        .date-display {
            font-size: 14px;
            color: #666;
        }
        .location-flag {
            font-size: 30px;
            margin-right: 10px;
        }
        .weather-card {
            background: white;
            border-radius: 15px;
            padding: 25px;
            margin-top: 30px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }
        .weather-card h2 {
            color: #333;
            margin-bottom: 20px;
            font-weight: bold;
        }
        .weather-item {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 15px;
        }
        .weather-icon {
            font-size: 30px;
            margin-right: 10px;
        }
        .loading {
            text-align: center;
            color: #667eea;
        }
        .error {
            background: #fff3cd;
            padding: 15px;
            border-radius: 10px;
            border-left: 4px solid #ffc107;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌍 World Clock & Weather Dashboard</h1>
            <p>Real-time date and time for major cities across the globe</p>
        </div>

        <div class="row">
            <div class="col-md-6 col-lg-4">
                <div class="clock-card">
                    <div class="d-flex align-items-center">
                        <span class="location-flag">🇸🇬</span>
                        <div>
                            <div class="city-name">Singapore</div>
                            <div>
                                <span class="time-display" id="sg-time">--:--:--</span>
                                <span class="time-format-badge">24H</span>
                            </div>
                            <div class="date-display" id="sg-date">Loading...</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6 col-lg-4">
                <div class="clock-card">
                    <div class="d-flex align-items-center">
                        <span class="location-flag">🇦🇺</span>
                        <div>
                            <div class="city-name">Australia (Sydney)</div>
                            <div>
                                <span class="time-display" id="au-time">--:--:--</span>
                                <span class="time-format-badge">24H</span>
                            </div>
                            <div class="date-display" id="au-date">Loading...</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6 col-lg-4">
                <div class="clock-card">
                    <div class="d-flex align-items-center">
                        <span class="location-flag">🇮🇳</span>
                        <div>
                            <div class="city-name">India (New Delhi)</div>
                            <div>
                                <span class="time-display" id="in-time">--:--:--</span>
                                <span class="time-format-badge">24H</span>
                            </div>
                            <div class="date-display" id="in-date">Loading...</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6 col-lg-4">
                <div class="clock-card">
                    <div class="d-flex align-items-center">
                        <span class="location-flag">🇯🇵</span>
                        <div>
                            <div class="city-name">Japan (Tokyo)</div>
                            <div>
                                <span class="time-display" id="jp-time">--:--:--</span>
                                <span class="time-format-badge">24H</span>
                            </div>
                            <div class="date-display" id="jp-date">Loading...</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6 col-lg-4">
                <div class="clock-card">
                    <div class="d-flex align-items-center">
                        <span class="location-flag">🇹🇭</span>
                        <div>
                            <div class="city-name">Thailand (Bangkok)</div>
                            <div>
                                <span class="time-display" id="th-time">--:--:--</span>
                                <span class="time-format-badge">24H</span>
                            </div>
                            <div class="date-display" id="th-date">Loading...</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6 col-lg-4">
                <div class="clock-card">
                    <div class="d-flex align-items-center">
                        <span class="location-flag">🇬🇧</span>
                        <div>
                            <div class="city-name">United Kingdom (London)</div>
                            <div>
                                <span class="time-display" id="uk-time">--:--:--</span>
                                <span class="time-format-badge">24H</span>
                            </div>
                            <div class="date-display" id="uk-date">Loading...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="weather-card">
            <h2>🌤️ Weather Forecast</h2>
            <div id="weather-container" class="loading">Loading weather data...</div>
            <div id="error-message" class="error" style="display: none;"></div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
    <script>
        const timezones = {
            'sg': 'Asia/Singapore',
            'au': 'Australia/Sydney',
            'in': 'Asia/Kolkata',
            'jp': 'Asia/Tokyo',
            'th': 'Asia/Bangkok',
            'uk': 'Europe/London'
        };

        function updateTime() {
            const now = new Date();

            for (const [key, timezone] of Object.entries(timezones)) {
                const formatter = new Intl.DateTimeFormat('en-US', {
                    timeZone: timezone,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                });

                const dateFormatter = new Intl.DateTimeFormat('en-US', {
                    timeZone: timezone,
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                document.getElementById(\`\${key}-time\`).textContent = formatter.format(now);
                document.getElementById(\`\${key}-date\`).textContent = dateFormatter.format(now);
            }
        }

        // Update time every second
        updateTime();
        setInterval(updateTime, 1000);

        // Weather data from Azure Maps
        async function loadWeather() {
            const weatherContainer = document.getElementById('weather-container');
            const errorMessage = document.getElementById('error-message');

            try {
                // API Key injected from server
                const apiKey = '${apiKey}';
                
                if (!apiKey || apiKey === 'YOUR_AZURE_MAPS_API_KEY') {
                    errorMessage.textContent = '⚠️ Azure Maps API key not configured. Please add your API key in the app.js file. Get one free at https://accounts.azure.com/signup';
                    errorMessage.style.display = 'block';
                    weatherContainer.innerHTML = '<p class="text-muted">Weather data requires Azure Maps API configuration</p>';
                    return;
                }

                // Weather data for the cities
                const cities = [
                    { name: 'Singapore', lat: 1.3521, lon: 103.8198 },
                    { name: 'Sydney, Australia', lat: -33.8688, lon: 151.2093 },
                    { name: 'New Delhi, India', lat: 28.7041, lon: 77.1025 },
                    { name: 'Tokyo, Japan', lat: 35.6762, lon: 139.6503 },
                    { name: 'Bangkok, Thailand', lat: 13.7563, lon: 100.5018 },
                    { name: 'London, United Kingdom', lat: 51.5074, lon: -0.1278 }
                ];

                let weatherHtml = '<div class="row">';
                
                for (const city of cities) {
                    const url = \`https://atlas.microsoft.com/weather/currentConditions/json?api-version=1.1&query=\${city.lat},\${city.lon}&details=true&subscription-key=\${apiKey}\`;
                    
                    try {
                        const response = await fetch(url);
                        const data = await response.json();
                        
                        if (data.results && data.results.length > 0) {
                            const weather = data.results[0];
                            weatherHtml += \`
                                <div class="col-md-6 col-lg-3">
                                    <div class="weather-item">
                                        <div><strong>\${city.name}</strong></div>
                                        <div class="mt-2">
                                            <div>Temperature: <strong>\${weather.temperature.value}°\${weather.temperature.unit}</strong></div>
                                            <div>Condition: \${weather.phrase}</div>
                                            <div>Humidity: \${weather.relativeHumidity}%</div>
                                            <div>Wind: \${weather.wind.speed.value} \${weather.wind.speed.unit}</div>
                                        </div>
                                    </div>
                                </div>
                            \`;
                        }
                    } catch (error) {
                        weatherHtml += \`
                            <div class="col-md-6 col-lg-3">
                                <div class="weather-item">
                                    <div><strong>\${city.name}</strong></div>
                                    <div class="mt-2 text-muted">Unable to load weather data</div>
                                </div>
                            </div>
                        \`;
                    }
                }
                
                weatherHtml += '</div>';
                weatherContainer.innerHTML = weatherHtml;
                errorMessage.style.display = 'none';
                
            } catch (error) {
                errorMessage.textContent = '❌ Error loading weather data: ' + error.message;
                errorMessage.style.display = 'block';
                weatherContainer.innerHTML = '';
            }
        }

        // Load weather when page loads
        loadWeather();
    </script>
</body>
</html>
`;
    return html;
}

const server = http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
	res.end(getHtmlContent());
});

const PORT = 3000;
server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
	console.log(`\n📝 NOTE: To enable weather forecasts:\n`);
	console.log(`1. Create an Azure Maps account: https://account.azure.com/signup`);
	console.log(`2. Get your API key from Azure Portal`);
	console.log(`3. Update the 'YOUR_AZURE_MAPS_API_KEY' placeholder in app.js\n`);
});