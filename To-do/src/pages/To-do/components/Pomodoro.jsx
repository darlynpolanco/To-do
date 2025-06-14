// src/pages/To-do/components/Pomodoro.jsx
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

const Pomodoro = () => {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);

  const timerRef = useRef(null);

  useEffect(() => {
    setSecondsLeft(workMinutes * 60);
  }, [workMinutes]);

  useEffect(() => {
    if (!isRunning) return;
    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          setIsBreak(!isBreak);
          setSecondsLeft((!isBreak ? breakMinutes : workMinutes) * 60);
          return (!isBreak ? breakMinutes : workMinutes) * 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [isRunning, isBreak]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setIsBreak(false);
    setSecondsLeft(workMinutes * 60);
  };

  return (
    <motion.div
      className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 shadow-xl rounded-xl space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-white">
        🍅 Pomodoro Timer
      </h2>

      <div className="flex justify-center text-5xl font-mono text-gray-800 dark:text-white">
        {formatTime(secondsLeft)}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setIsRunning((r) => !r)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          {isRunning ? 'Pausar' : 'Iniciar'}
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 flex items-center gap-2"
        >
          <RotateCcw className="w-5 h-5" /> Reiniciar
        </button>
      </div>

      <div className="space-y-2 pt-4">
        <label className="block text-gray-700 dark:text-white font-medium">
          Minutos de enfoque:
        </label>
        <input
          type="number"
          value={workMinutes}
          onChange={(e) => setWorkMinutes(parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="block text-gray-700 dark:text-white font-medium pt-2">
          Minutos de descanso:
        </label>
        <input
          type="number"
          value={breakMinutes}
          onChange={(e) => setBreakMinutes(parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </motion.div>
  );
};

export default Pomodoro;
