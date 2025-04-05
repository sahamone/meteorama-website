# Meteorama

Meteorama is a Rust-based application that provides easy access to short- and medium-term weather forecasts based on a statistical forecasting model developed specifically for this application.

## Features

- **Real-time Weather Data**: Retrieve current weather conditions anywhere in France with OpenWeatherMap
- **Advanced Forecasting**: Unique statistical forecasting model for quality short- and medium-term predictions
- **Modern Architecture**: Ergonomic interface using Tauri with React/Vite, combining the best of web technologies with the robustness and speed of Rust

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/meteorama.git
   cd meteorama
   ```

2. Configure your OpenWeatherMap API key by creating a `.env` file at the root of the project:

   ```sh
   echo "OWM_TOKEN=your_api_key_here" > .env
   ```

3. Compile the project:

   ```sh
   cargo tauri build
   ```

## Usage

1. Execute the app:

   ```sh
   ./src-tauri/target/meteorama
   ```

## Project Structure

```plaintext
meteorama
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   ├── logic/
│   ├── assets/
│   ├── App.tsx
│   └── main.tsx
├── src-tauri/
│   ├── src/
│   ├── Cargo.toml
│   ├── tauri.conf.json
│   └── .env
├── index.html
├── package.json      
├── tailwind.config.js   
└── vite.config.ts
```

## Tools used 
- **Frontend**
    - React
    - TypeScript
    - TailwindCSS
    - DaisyUI (Themes and components)
    - Lucide (Icons)
    - OpenLayers (Dynamic Map)
    - Vite (build tool)
- **Backend**
    - Rust
    - Tauri (Framework)
    - Moka (Cache management)
    - Serde (Json using)
    - Tokio (Asynchronous request)
    - Chrono (Date and Time)
    - Reqwest (API requests)
    - Dotenvy (Environmental variables)
    - Lazy (Global variables)
    - Tauri-shell / Tauri-fs (Open website)

## APIs used
- **OpenWeatherMap API** : Provides real-time weather data and forecast
- **Météo France APIs** : For vigilance map and main layers of dynamic maps

## Authors
- Moro Hugo (backend) 
- Sabra Roy (website)
- Thomé Aubin (frontend)
- Vaudey Sacha (backend)