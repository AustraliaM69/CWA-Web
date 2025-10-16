'use client';
import { useEffect, useState } from 'react';

interface GameSession {
  id: number;
  playerName: string | null;
  completed: boolean;
  timeUsed: number;
  stagesCompleted: number;
  score: number | null;
  createdAt: string;
}

export default function Leaderboard() {
  const [games, setGames] = useState<GameSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await fetch('/api/games');
      if (response.ok) {
        const data = await response.json();
        setGames(data);
      }
    } catch (error) {
      console.error('Failed to fetch games');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-800 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-white">Loading...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-white">
          Escape Room Leaderboard
        </h1>
        
        <div className="bg-gray-700 p-6" style={{border: '2px solid #555'}}>
          {games.length === 0 ? (
            <p className="text-white">no games saved yet</p>
          ) : (
            <div className="space-y-3">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="bg-gray-600 p-4"
                  style={{border: '1px solid #444'}}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white font-bold">
                        {game.playerName || 'Anonymous'}
                      </div>
                      <div className="text-gray-300 text-sm">
                        {game.completed ? '✅ ESCAPED' : '❌ Failed'} - 
                        Stages: {game.stagesCompleted}/7 - 
                        Time: {Math.floor(game.timeUsed / 60)}:{(game.timeUsed % 60).toString().padStart(2, '0')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold" style={{color: game.completed ? '#4ade80' : '#ef4444'}}>
                        {game.score || 0}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(game.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <button
            onClick={fetchGames}
            className="mt-4 px-4 py-2 bg-blue-600 text-white"
          >
            refresh
          </button>
        </div>
      </div>
    </main>
  );
}
