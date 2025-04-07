
# MindSphere: Mental Health Resilience Hub

MindSphere is a mental health application that helps users track their mood, build resilience, and connect with a global community of users.

## Project Overview

This application combines:
- React frontend for user interface and visualizations
- Python backend for data analysis and mood detection

## Features

- Mood tracking and visualization
- Interactive mental health interventions
- Group mood pulse visualization
- Confetti celebrations for completed activities
- Resilience score tracking

## Getting Started

### Prerequisites

- Node.js and npm (for the React frontend)
- Python 3.7+ (for the backend analysis)
- Python packages: json, random, datetime (standard library)

### Running the Application

1. **Start the React frontend:**
```
npm install
npm run dev
```

2. **Generate mock data with Python:**
```
cd src/python
python mood_analyzer.py
```

This will generate data files in the `src/data` directory that the frontend will use.

3. **Trigger confetti effects:**
```
python confetti_trigger.py
```

## Python-React Integration

The Python backend and React frontend communicate through JSON files:

1. Python scripts analyze content and generate mood data
2. Data is saved to JSON files in the `src/data` directory
3. React frontend reads these files to display visualizations

## For Python Developers

If you're primarily a Python developer, you can focus on enhancing:

- `mood_analyzer.py` - Improve sentiment analysis by adding TextBlob or VADER
- Create new Python scripts for more advanced analysis
- Add machine learning models for better mood prediction

## Future Enhancements

- Real-time sentiment analysis of user input
- Machine learning for personalized interventions
- Integration with external mental health resources
