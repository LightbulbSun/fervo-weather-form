# 🌦️ Fervo Weather Form

An Angular application that allows users to input an address and visualize historical weather data (temperature and precipitation) in a dynamic chart. The app uses geocoding via OpenCage and weather data from Open-Meteo.

## 🚀 Features

- Responsive form with address fields
- Date range input and validation
- Dynamic chart generation with temperature data
- JSON export of past year's weather data
- Loading spinner and error handling
- Internationalization (i18n) support for Italian 🇮🇹 and English 🇬🇧

## 📦 Technologies

- Angular 15
- Bootstrap 5
- ngx-echarts
- @ngx-translate/core
- OpenCage API
- Open-Meteo API

---

## 📁 Project Structure

```txt
fervo-weather-form/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── address-form/
│   │   │   └── weather-chart/
│   │   ├── services/
│   │   │   ├── geocoding.service.ts
│   │   │   └── weather.service.ts
│   │   ├── app.module.ts
│   │   └── app.component.ts
│   ├── assets/
│   │   └── i18n/
│   │       ├── en.json
│   │       └── it.json
│   └── environments/
│       └── environment.ts
```

## ⚙️ Installation & Setup

### Prerequisites

- Node.js v18+ and npm
- Angular CLI

### Step-by-step

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/fervo-weather-form.git
cd fervo-weather-form

2. Install dependencies:

npm install

3. Set your API key:

Add your OpenCage API key to src/environments/environment.ts:

export const environment = {
  production: false,
  opencageApiKey: 'YOUR_OPENCAGE_API_KEY'
}

4. Run the application:

ng serve
Then open your browser at http://localhost:4200


🌐 Change Language
Use the dropdown menu at the top to switch between Italian 🇮🇹 and English 🇬🇧.

You can add more languages in the assets/i18n/ folder and update TranslateModule accordingly.

📤 Export Weather Data
Click the green "Download Weather JSON" button after submitting a valid address and date range. The app will generate and download the data for the previous year (Jan 1st – Dec 31st).

🧪 Development Tools

To build the project:
ng build


