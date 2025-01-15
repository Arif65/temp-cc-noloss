import React from 'react';

const AnimationControls = ({ speed, setSpeed, isRunning, isPaused, onRun, onPause, onReset }) => {
  const handleSpeedChange = (e) => {
    const value = Number(e.target.value);
    // Invert the speed behavior: higher range value makes the animation slower.
    setSpeed(value);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Step Delay: {speed}ms
        </label>
        <input
          type="range"
          min="100"
          max="2000"
          step="100"
          value={speed}
          onChange={handleSpeedChange}
          className="w-full"
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={onRun}
          disabled={(isRunning && !isPaused) || isPaused} // Disable "Run" when paused
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Run
        </button>

        <button
          onClick={onPause}
          disabled={!isRunning} // "Pause/Continue" button is enabled only when running
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
        >
          {isPaused ? "Continue" : "Pause"}
        </button>

        <button
          onClick={onReset}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default AnimationControls;
