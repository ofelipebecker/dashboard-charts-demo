# Dashboard Charts Demo

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.5-FF6384?logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)
[![Day.js](https://img.shields.io/badge/Day.js-1.11-FF5F4C?logo=dayton&logoColor=white)](https://day.js.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Live Demo:** [fbecker-dashboard-charts-demo.netlify.app](https://fbecker-dashboard-charts-demo.netlify.app/)

A frontend demonstration recreating a telecom dashboard from previous work experience. Built to showcase implementation skills without exposing proprietary code.

---

## 🎯 About

This project faithfully simulates a real dashboard interface I developed at a previous job. While the original exists within proprietary software, this demo demonstrates the technical implementation using modern frontend tools.

### Key Technical Features

- **Reusable chart architecture** - Single `BarChart` component configured via props
- **Lazy loading tabs** - Content renders only when activated
- **Dynamic period filtering** - 3/6/12 month views with real-time data updates
- **Configurable design system** - Zilla Slab font, custom utilities, Bootstrap integration

---

## 🛠️ Built With

| Category         | Technologies                   |
| ---------------- | ------------------------------ |
| **Framework**    | React 19 + Vite                |
| **UI**           | React-Bootstrap 2, Bootstrap 5 |
| **Charts**       | Chart.js 4 + react-chartjs-2   |
| **Dates**        | Day.js + chartjs-adapter       |
| **Code Quality** | ESLint + Prettier              |

---

## 🏗️ Architecture

```
src/
├── components/          # Reusable UI components
├── utils/constants/     # Chart configurations
├── assets/              # Fonts and images
└── App.jsx             # Main layout
```

**Key Pattern:** Chart data lives in external constants, making the system easily extensible:

```javascript
// Adding a new chart type is just a config file
export const voiceChartConfig = {
  label: 'Monthly minutes',
  chartData: [87, 42, 175, 23, 76, 54],
  rgbColor: '120, 94, 240', // Purple
  yAxisTitle: 'Minutes',
};
```

---

## 🚀 Quick Start

```bash
git clone https://github.com/ofelipebecker/dashboard-charts-demo.git
cd dashboard-charts-demo
npm install
npm run dev
```

**Scripts:** `dev` | `build` | `preview` | `lint`

---

## 📫 Contact

**Felipe Becker** - [LinkedIn](https://linkedin.com/in/felipe-b-68968457) · [GitHub](https://github.com/ofelipebecker) · [Portfolio](https://felipebecker.com)

**Project Link:** [github.com/ofelipebecker/dashboard-charts-demo](https://github.com/ofelipebecker/dashboard-charts-demo)

---

**Made by Felipe Becker** | Last Updated: Feb 2026

_This project is a demonstration of frontend skills and does not contain any proprietary code or data from previous employers._
