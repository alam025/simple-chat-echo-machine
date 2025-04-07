
# Python script to generate a confetti trigger file
# This would be called when a user completes an intervention

import json
import os
from datetime import datetime

def trigger_confetti(reason="intervention_completed"):
    """
    Create a trigger file for the frontend to read and display confetti
    """
    trigger = {
        "timestamp": datetime.now().isoformat(),
        "reason": reason,
        "triggered": True
    }
    
    # Ensure directory exists
    os.makedirs("src/data", exist_ok=True)
    
    # Write trigger file
    with open("src/data/confetti_trigger.json", "w") as f:
        json.dump(trigger, f, indent=2)
    
    return trigger

if __name__ == "__main__":
    # Example: Trigger confetti for completing a breathing exercise
    trigger = trigger_confetti(reason="breathing_completed")
    print(f"Confetti triggered: {trigger}")
