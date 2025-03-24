export interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface ReadingText {
  id: number;
  content: string;
  readingTimeLimit: number;
  testingTimeLimit: number;
  questions: Question[];
}

export interface Player {
  id: string;
  name: string;
  readingTime: number;
  score: number;
}

export interface GameState {
  currentPhase: 'setup' | 'reading' | 'testing' | 'results';
  currentTextIndex: number;
  players: Player[];
  timeRemaining: number;
  currentPlayerAnswers: Record<number, number>;
}