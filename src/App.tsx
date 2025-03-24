import React from 'react';
import { Brain, Timer, Trophy } from 'lucide-react';
import { useGameStore } from './store';
import { texts } from './data';

function SetupPhase() {
  const [playerName, setPlayerName] = React.useState('');
  const addPlayer = useGameStore((state) => state.addPlayer);
  const players = useGameStore((state) => state.players);
  const setPhase = useGameStore((state) => state.setPhase);

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      addPlayer(playerName.trim());
      setPlayerName('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
        <Brain className="w-8 h-8" /> Reading Bee
      </h1>
      <form onSubmit={handleAddPlayer} className="mb-6">
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter player name"
          className="w-full p-2 border rounded mb-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Player
        </button>
      </form>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Players:</h2>
        <ul className="space-y-2">
          {players.map((player) => (
            <li key={player.id} className="bg-gray-100 p-2 rounded">
              {player.name}
            </li>
          ))}
        </ul>
      </div>
      {players.length > 0 && (
        <button
          onClick={() => setPhase('reading')}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Start Game
        </button>
      )}
    </div>
  );
}

function ReadingPhase() {
  const currentTextIndex = useGameStore((state) => state.currentTextIndex);
  const timeRemaining = useGameStore((state) => state.timeRemaining);
  const setTimeRemaining = useGameStore((state) => state.setTimeRemaining);
  const setPhase = useGameStore((state) => state.setPhase);
  const currentText = texts[currentTextIndex];
  const [startTime] = React.useState(Date.now());
  const setPlayerReadingTime = useGameStore((state) => state.setPlayerReadingTime);
  const players = useGameStore((state) => state.players);

  React.useEffect(() => {
    setTimeRemaining(currentText.readingTimeLimit);
    const timer = setInterval(() => {
      setTimeRemaining((time) => {
        if (time <= 1) {
          clearInterval(timer);
          const readingTime = Math.floor((Date.now() - startTime) / 1000);
          players.forEach(player => {
            setPlayerReadingTime(player.id, readingTime);
          });
          setPhase('testing');
          return 0;
        }
        return time - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentTextIndex]);

  const handleFinishReading = () => {
    const readingTime = Math.floor((Date.now() - startTime) / 1000);
    players.forEach(player => {
      setPlayerReadingTime(player.id, readingTime);
    });
    setPhase('testing');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Text {currentTextIndex + 1}</h2>
        <div className="bg-white rounded-full p-6 shadow-lg mb-4">
          <div className="flex items-center gap-2">
            <Timer className="w-6 h-6 text-blue-500" />
            <span className="text-3xl font-bold">
              {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-600">Time remaining to read</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <p className="text-lg leading-relaxed">{currentText.content}</p>
      </div>
      <button
        onClick={handleFinishReading}
        className="w-full bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 font-semibold text-lg transition-colors"
      >
        I'm Done Reading
      </button>
    </div>
  );
}

function TestingPhase() {
  const currentTextIndex = useGameStore((state) => state.currentTextIndex);
  const timeRemaining = useGameStore((state) => state.timeRemaining);
  const setTimeRemaining = useGameStore((state) => state.setTimeRemaining);
  const currentPlayerAnswers = useGameStore((state) => state.currentPlayerAnswers);
  const setAnswer = useGameStore((state) => state.setAnswer);
  const setPhase = useGameStore((state) => state.setPhase);
  const nextText = useGameStore((state) => state.nextText);
  const currentText = texts[currentTextIndex];

  React.useEffect(() => {
    setTimeRemaining(currentText.testingTimeLimit);
    const timer = setInterval(() => {
      setTimeRemaining((time) => {
        if (time <= 1) {
          clearInterval(timer);
          if (currentTextIndex < texts.length - 1) {
            nextText();
            setPhase('reading');
          } else {
            setPhase('results');
          }
          return 0;
        }
        return time - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Questions</h2>
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5" />
          <span className="text-xl">{timeRemaining}</span>
        </div>
      </div>
      <div className="space-y-6">
        {currentText.questions.map((question, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <p className="font-semibold mb-3">{question.text}</p>
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  onClick={() => setAnswer(index, optionIndex)}
                  className={`w-full p-2 text-left rounded ${
                    currentPlayerAnswers[index] === optionIndex
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultsPhase() {
  const players = useGameStore((state) => state.players);
  const setPhase = useGameStore((state) => state.setPhase);

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="flex items-center justify-center mb-8">
        <Trophy className="w-12 h-12 text-yellow-500" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-6">Final Results</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        {players.map((player, index) => (
          <div
            key={player.id}
            className={`flex justify-between items-center p-3 ${
              index !== players.length - 1 ? 'border-b' : ''
            }`}
          >
            <span className="font-semibold">{player.name}</span>
            <span className="text-lg">{player.score} points</span>
          </div>
        ))}
      </div>
      <button
        onClick={() => setPhase('setup')}
        className="mt-6 w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
      >
        Play Again
      </button>
    </div>
  );
}

function App() {
  const currentPhase = useGameStore((state) => state.currentPhase);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {currentPhase === 'setup' && <SetupPhase />}
      {currentPhase === 'reading' && <ReadingPhase />}
      {currentPhase === 'testing' && <TestingPhase />}
      {currentPhase === 'results' && <ResultsPhase />}
    </div>
  );
}

export default App;