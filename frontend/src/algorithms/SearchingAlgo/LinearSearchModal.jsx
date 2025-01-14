import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import AnimationControls from "../Animations/AnimationControl";

const LinearSearchModal = ({ id, name, topic, isOpen, onClose, array, target, userId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speed, setSpeed] = useState(500);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false); // Track completion
  const d3Container = useRef(null);
  const modalContainerRef = useRef(null);
  const intervalIdRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !array.length) return;

    const container = modalContainerRef.current;
    const svgWidth = container.offsetWidth - 40; // Subtract padding
    const svgHeight = Math.min(400, container.offsetHeight - 80); // Ensure height fits

    const barWidth = svgWidth / array.length;

    const svg = d3.select(d3Container.current)
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    svg.selectAll("rect")
      .data(array)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * barWidth)
      .attr("y", (d) => svgHeight - d * 2)
      .attr("width", barWidth - 5)
      .attr("height", (d) => d * 2)
      .attr("fill", "steelblue")
      .attr("stroke", "black");

    return () => {
      clearInterval(intervalIdRef.current);
      d3.select(d3Container.current).select("svg").remove();
    };
  }, [isOpen, array]);

  useEffect(() => {
    if (!isRunning || isPaused) return;

    const svg = d3.select(d3Container.current).select("svg");

    const search = () => {
      if (currentIndex >= array.length) {
        clearInterval(intervalIdRef.current);
        setIsRunning(false);
        setIsCompleted(true); // Mark as completed
        return;
      }

      const bar = svg.select(`rect:nth-child(${currentIndex + 1})`);

      bar.transition()
        .duration(speed / 2)
        .attr("fill", array[currentIndex] === target ? "green" : "orange")
        .on("end", () => {
          if (array[currentIndex] === target) {
            clearInterval(intervalIdRef.current);
            setIsRunning(false);
            setIsCompleted(true); // Mark as completed
          } else {
            bar.transition().duration(speed / 2).attr("fill", "red");
            setCurrentIndex((prevIndex) => prevIndex + 1);
          }
        });
    };

    intervalIdRef.current = setInterval(search, speed);

    return () => clearInterval(intervalIdRef.current);
  }, [isRunning, isPaused, currentIndex, array, target, speed]);

  const handlePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setCurrentIndex(0);
    setIsCompleted(false); // Reset completion state
    const svg = d3.select(d3Container.current).select("svg");
    svg.selectAll("rect").attr("fill", "steelblue");
  };

  const handleSave = () => {
    const arrayStr = JSON.stringify(array); // Convert array to string
    const targetStr = target || "Not Provided"; // Default if no target is provided

    alert(`
      User ID: ${id}
      Topic: ${topic || "Unknown Topic"}
      Array: ${arrayStr}
      Target: ${targetStr}
    `);
  };

  useEffect(() => {
    if (!isOpen) {
      handleReset();
    }
  }, [isOpen]);

  return (
    isOpen ? (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div
          className="bg-white p-6 rounded-md w-4/5 max-w-4xl h-4/5 max-h-[90vh] relative overflow-auto"
          ref={modalContainerRef}
        >
          <button
            onClick={() => {
              onClose();
              handleReset();
            }}
            className="absolute top-2 right-2 text-xl text-red-600"
          >
            ✖️
          </button>

          <div className="flex flex-col items-center">
            <div ref={d3Container} className="w-full"></div>

            <AnimationControls
              speed={speed}
              setSpeed={setSpeed}
              isRunning={isRunning}
              isPaused={isPaused}
              onRun={() => {
                setIsRunning(true);
                setIsPaused(false);
              }}
              onPause={handlePause}
              onReset={handleReset}
            />

            {/* Show Save button only when the search is completed */}
            {isCompleted && (
              <button
                onClick={handleSave}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    ) : null
  );
};

export default LinearSearchModal;
