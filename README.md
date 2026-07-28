# Risk Diabetes Predictor

A machine learning-powered web application that helps people currently living with diabetes understand how their condition may progress over the coming years. Users get a personalized dashboard showing predicted risk trends, and can compare their outlook against aggregated, anonymized trends from other users on the platform.

## Overview

Diabetes management is easier when people can see where they're headed, not just where they are today. Risk Diabetes Predictor uses historical health data to forecast how a user's diabetes risk/progression is likely to trend over the next several years, and visualizes it in an easy-to-read dashboard.

## Features

- **Personal risk dashboard** — visualize predicted diabetes progression over the next 1–5 years based on your own health data
- **Community trends** — see anonymized, aggregated predictions from other users to understand broader patterns
- **Model-backed predictions** — forecasts powered by a trained machine learning model, not static rules
- **Historical tracking** — log health metrics over time to improve prediction accuracy
- *(add/remove features as needed)*

## Tech Stack

| Layer | Technology |
|---|---|
| Model training & experimentation | Jupyter Notebook |
| Data processing | pandas, NumPy |
| Machine learning | scikit-learn |
| Frontend | React.js |
| Backend API | *TBD — e.g. Flask / FastAPI / Node.js* |
| Database | *TBD — e.g. PostgreSQL / MongoDB* |

> Backend framework and database are still being decided — update this table once finalized.

## Project Structure

```
risk-diabetes-predictor/
├── notebooks/          # Jupyter notebooks for data exploration & model training
├── data/                # Raw and processed CSV datasets
├── model/               # Saved/trained model artifacts (e.g. .pkl files)
├── backend/             # API server connecting frontend to model & database
├── frontend/            # React application
│   ├── src/
|     └── components
|         └──       
│   └── public/
|   └── services/
|   └── App.css
|   └── App.jsx
|   └── index.css
|   └── main.jsx
├── requirements.txt      # Python dependencies
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.x
- Node.js & npm
- *Database of choice (e.g. PostgreSQL) installed and running*

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/risk-diabetes-predictor.git
cd risk-diabetes-predictor
```

### 2. Set up the model training environment

```bash
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
jupyter notebook
```

Open the notebooks in `notebooks/` to explore the dataset and retrain the model if needed.

### 3. Set up the frontend

```bash
cd frontend
npm install
npm start
```

### 4. Set up the backend & database

```bash
# TODO: add backend setup instructions once framework is finalized
```

## Dataset

Model training data is read from CSV files using pandas. *(Add details here: source of the dataset, what features/columns it includes, size, and any preprocessing steps.)*

## Model

*(Briefly describe the ML approach: e.g. classification vs. regression, which scikit-learn algorithm(s) were used — such as logistic regression, random forest, or gradient boosting — and how predictions are generated for multi-year forecasting.)*

## Roadmap

- [ ] Finalize backend framework
- [ ] Finalize database choice and schema
- [ ] Connect trained model to backend API
- [ ] Build out community trends aggregation
- [ ] Deploy to production

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

*(Add your chosen license here, e.g. MIT)*

## Disclaimer

This application is intended for informational and educational purposes only and does not constitute medical advice. Users should consult a qualified healthcare professional regarding their diabetes management and treatment.
