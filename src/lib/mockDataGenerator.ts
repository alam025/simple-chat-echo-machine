
// Mock data generator for MindSphere

// Types for our mock data
export interface MockContentSample {
  id: number;
  text: string;
  source: string;
  type: 'article' | 'video' | 'social' | 'message';
  sentiment: number; // 0-1 where 0 is negative, 1 is positive
}

export interface MockGroupMoodData {
  id: number;
  mood: number; // 0-1
  region: string;
}

export interface MockData {
  contentSamples: MockContentSample[];
  groupMoodData: MockGroupMoodData[];
}

// Generate mock content samples
const generateContentSamples = (): MockContentSample[] => {
  const samples: MockContentSample[] = [
    {
      id: 1,
      text: "Global pandemic cases continue to rise in several regions",
      source: "News Article",
      type: "article",
      sentiment: 0.2
    },
    {
      id: 2,
      text: "How to find joy in everyday moments",
      source: "Wellness Blog",
      type: "article",
      sentiment: 0.9
    },
    {
      id: 3,
      text: "Economic downturn threatens job security for millions",
      source: "Financial News",
      type: "article",
      sentiment: 0.15
    },
    {
      id: 4,
      text: "Heartwarming rescue of abandoned puppies goes viral",
      source: "Social Media",
      type: "social",
      sentiment: 0.95
    },
    {
      id: 5,
      text: "Climate crisis worsens with record-breaking temperatures",
      source: "Environmental Report",
      type: "article",
      sentiment: 0.1
    },
    {
      id: 6,
      text: "New study shows benefits of regular meditation",
      source: "Health Journal",
      type: "article",
      sentiment: 0.85
    },
    {
      id: 7,
      text: "Friend: Hey, how are you doing today?",
      source: "Chat Message",
      type: "message",
      sentiment: 0.7
    },
    {
      id: 8,
      text: "I've been feeling really overwhelmed lately with everything going on",
      source: "Your Message",
      type: "message",
      sentiment: 0.3
    },
    {
      id: 9,
      text: "Inspiring documentary about overcoming challenges",
      source: "Streaming Service",
      type: "video",
      sentiment: 0.8
    },
    {
      id: 10,
      text: "Disturbing footage of natural disaster aftermath",
      source: "News Video",
      type: "video",
      sentiment: 0.05
    },
    {
      id: 11,
      text: "Cute animal compilation that will make your day",
      source: "Video Platform",
      type: "video",
      sentiment: 0.95
    },
    {
      id: 12,
      text: "Political tensions escalate as protests turn violent",
      source: "Breaking News",
      type: "article",
      sentiment: 0.1
    }
  ];
  
  return samples;
};

// Generate mock group mood data
const generateGroupMoodData = (): MockGroupMoodData[] => {
  const regions = [
    "North Campus", "South Campus", "Downtown", 
    "East Side", "West End", "Central District",
    "Riverside", "Hillcrest", "Valley View",
    "Lakeshore", "Mountain View", "Sunset District"
  ];
  
  const groupData: MockGroupMoodData[] = [];
  
  for (let i = 0; i < 50; i++) {
    groupData.push({
      id: i + 1,
      mood: Math.random(),
      region: regions[Math.floor(Math.random() * regions.length)]
    });
  }
  
  return groupData;
};

// Main function to generate all mock data
export const generateMockData = (): MockData => {
  return {
    contentSamples: generateContentSamples(),
    groupMoodData: generateGroupMoodData()
  };
};
