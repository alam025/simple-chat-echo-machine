
# Python backend service for MindSphere
# This script analyzes content and determines mood scores

import json
import random
from datetime import datetime, timedelta
import os

# Simple sentiment analysis function (in a real app, this would use libraries like TextBlob or VADER)
def analyze_sentiment(content):
    """
    Analyze text content and return a mood score between 0 and 1
    0 = negative mood, 1 = positive mood
    """
    # This is a simplified mock implementation
    # In a real app, we would use TextBlob, VADER, or a ML model
    
    negative_words = ["sad", "angry", "depressed", "anxious", "worried", "stressed",
                    "unhappy", "miserable", "frustrated", "upset", "negative"]
    
    positive_words = ["happy", "joy", "excited", "grateful", "peaceful", "relaxed",
                     "positive", "good", "wonderful", "amazing", "calm"]
    
    content = content.lower()
    
    # Count word occurrences
    neg_count = sum(content.count(word) for word in negative_words)
    pos_count = sum(content.count(word) for word in positive_words)
    
    # Calculate score (avoid division by zero)
    total = pos_count + neg_count
    if total == 0:
        return 0.5  # Neutral if no sentiment words
    
    score = pos_count / total
    return score

def generate_mock_data(days=30):
    """Generate mock mood data for visualization"""
    today = datetime.now()
    
    mood_history = []
    for i in range(days):
        date = (today - timedelta(days=days-i-1)).strftime("%Y-%m-%d")
        
        # Generate a somewhat realistic mood pattern with some randomness but also trends
        base_mood = 0.5 + 0.2 * (i % 7) / 7  # Weekly pattern
        if i > 0 and i % 7 == 0:  # Mondays are harder
            base_mood -= 0.15
        
        # Add random fluctuation
        mood = max(0.1, min(0.9, base_mood + random.uniform(-0.2, 0.2)))
        
        mood_history.append({
            "date": date,
            "score": round(mood, 2)
        })
    
    # Generate group data - simulated global mood map
    group_data = []
    regions = ["Campus", "Downtown", "Suburbs", "Online Community", "Workplace"]
    
    for region in regions:
        base_score = random.uniform(0.3, 0.8)
        group_data.append({
            "region": region,
            "score": round(base_score, 2),
            "users": random.randint(50, 500)
        })
    
    # Calculate current mood (slightly weighted toward recent days)
    recent_moods = [entry["score"] for entry in mood_history[-5:]]
    current_mood = sum(recent_moods) / len(recent_moods)
    
    # Calculate resilience score - based on imaginary completed activities
    completed_activities = random.randint(3, 15)
    resilience = min(1.0, completed_activities / 20)
    
    result = {
        "currentMood": round(current_mood, 2),
        "moodHistory": mood_history,
        "groupMoodData": group_data,
        "resilience": round(resilience, 2)
    }
    
    # Save the data to a JSON file that the frontend can fetch
    with open("src/data/mood_data.json", "w") as f:
        json.dump(result, f, indent=2)
    
    return result

def analyze_content(content):
    """Analyze a piece of content and return mood impact info"""
    score = analyze_sentiment(content)
    
    if score < 0.3:
        impact = "negative"
        suggestion = random.choice([
            "Try reading something uplifting next",
            "Consider a short breathing exercise",
            "How about listening to a happy song?"
        ])
    elif score < 0.7:
        impact = "neutral"
        suggestion = random.choice([
            "This content seems balanced",
            "Your mood seems stable right now",
            "Remember to take regular breaks"
        ])
    else:
        impact = "positive"
        suggestion = random.choice([
            "Great choice of content!",
            "Keep engaging with positive material",
            "You're on a positive track"
        ])
    
    return {
        "score": round(score, 2),
        "impact": impact,
        "suggestion": suggestion
    }

# When run directly, generate mock data
if __name__ == "__main__":
    # Create data directory if it doesn't exist
    os.makedirs("src/data", exist_ok=True)
    
    # Generate and save mock data
    data = generate_mock_data()
    print(f"Generated mock data with current mood: {data['currentMood']}")
    
    # Example content analysis
    sample_content = "I'm feeling a bit stressed about the upcoming deadline, but excited about the project."
    analysis = analyze_content(sample_content)
    print(f"Sample content analysis: {analysis}")
