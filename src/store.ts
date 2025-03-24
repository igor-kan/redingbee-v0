import { create } from 'zustand';
import { GameState } from './types';

export const useGameStore = create<GameState>((set) => ({
  currentPhase: 'setup',
  currentTextIndex: 0,
  players: [],
  timeRemaining: 0,
  currentPlayerAnswers: {},
  
  setPhase: (phase: GameState['currentPhase']) => set({ currentPhase: phase }),
  setTimeRemaining: (time: number) => set({ timeRemaining: time }),
  addPlayer: (name: string) => set((state) => ({
    players: [...state.players, { id: crypto.randomUUID(), name, readingTime: 0, score: 0 }]
  })),
  updatePlayerScore: (playerId: string, score: number) => set((state) => ({
    players: state.players.map(player =>
      player.id === playerId ? { ...player, score: player.score + score } : player
    )
  })),
  setPlayerReadingTime: (playerId: string, time: number) => set((state) => ({
    players: state.players.map(player =>
      player.id === playerId ? { ...player, readingTime: time } : player
    )
  })),
  nextText: () => set((state) => ({ currentTextIndex: state.currentTextIndex + 1 })),
  resetAnswers: () => set({ currentPlayerAnswers: {} }),
  setAnswer: (questionIndex: number, answerIndex: number) => set((state) => ({
    currentPlayerAnswers: { ...state.currentPlayerAnswers, [questionIndex]: answerIndex }
  })),
}));