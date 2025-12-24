
export enum ExperienceLevel {
  STUDENT = 'Student',
  FRESHER = 'Fresher',
  EXPERIENCED = 'Experienced'
}

export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
  MIXED = 'Mixed'
}

export interface UserProfile {
  jobRole: string;
  experienceLevel: ExperienceLevel;
  skills: string[];
  preferredDifficulty: Difficulty;
}

export interface InterviewQuestion {
  id: string;
  category: 'Technical' | 'Problem-Solving' | 'Scenario-Based' | 'Behavioral' | 'HR';
  difficulty: Difficulty;
  question: string;
  expectedKeyPoints: string[];
  sampleAnswer: string;
  userRating?: number;
}

export interface InterviewData {
  questions: InterviewQuestion[];
  summary: {
    strengths: string[];
    improvementAreas: string[];
    readinessScore: number;
    overallFeedback: string;
  };
}
