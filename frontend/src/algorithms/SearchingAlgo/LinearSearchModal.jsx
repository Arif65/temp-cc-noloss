import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import axios from "axios";
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

  const [label, setLabel] = useState("test");
  const [verdict, setVerdict] = useState("...");

  useEffect(() => {
    if (!isOpen || !array.length) return;
  
    const container = modalContainerRef.current;
    const svgWidth = container.offsetWidth - 40; // Subtract padding
    const svgHeight = Math.min(400, container.offsetHeight - 80); // Ensure height fits
  
    // Remove any previous SVG to reset the container
    d3.select(d3Container.current).select("svg").remove();
  
    const svg = d3.select(d3Container.current)
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
  
    // Ensure input is parsed as an array (if it is a JSON string)
    const processedArray = Array.isArray(array)
      ? array // Use the array directly if it's already an array
      : JSON.parse(array);  // Parse it if it's a JSON string
  
    const barWidth = svgWidth / processedArray.length;
  
    // Create bars
    svg.selectAll("rect")
      .data(processedArray)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * barWidth)
      .attr("y", (d) => svgHeight - d * 2)
      .attr("width", barWidth - 5)
      .attr("height", (d) => d * 2)
      .attr("fill", "steelblue")
      .attr("stroke", "black");
  
    // Add value labels above each bar
    svg.selectAll("text")
      .data(processedArray)
      .enter()
      .append("text")
      .attr("x", (d, i) => i * barWidth + (barWidth - 5) / 2) // Center text above the bar
      .attr("y", (d) => svgHeight - d * 2 - 5) // Position text just above the bar
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .text((d) => d); // Display the value of the bar
  
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
        setVerdict("Not Found");
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
            setVerdict("Found");
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
    setVerdict("...");
    setLabel("test")
    setIsRunning(false);
    setIsPaused(false);
    setCurrentIndex(0);
    setIsCompleted(false); // Reset completion state
    const svg = d3.select(d3Container.current).select("svg");
    svg.selectAll("rect").attr("fill", "steelblue");
  };

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!id || !topic || !verdict) {
        alert("Missing required fields. Ensure ID, topic, and verdict are set.");
        return;
      }
  
      // Prepare data
      const arrayStr = Array.isArray(array) ? JSON.stringify(array) : "[]";
      const targetStr = target || "N/A";
      // const label = "N/A x 2"; // Replace with actual label input
      // setLabel("N/A x 3")
  
      const data = {
        id,
        label,
        topic,
        target: targetStr,
        input: arrayStr,
        verdict,
      };
  
      console.log("Sending data to backend:", data);
  
      // Send POST request
      const response = await axios.post("http://localhost:3000/api/archive", data);
  
      // Handle success
      if (response.status === 200) {
        // alert(`Saved Successfully!
        // User ID: ${id}
        // Topic: ${topic || "Unknown Topic"}
        // Label: ${label}
        // Input: ${arrayStr}
        // Target: ${targetStr}
        // Verdict: ${verdict}`);

        alert('Saved Successfully')
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert(error.response?.data?.message || `An error occurred while saving: ${error.message}`);
    }
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
              <div className="mt-4 flex items-center space-x-4">
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Enter label"
                className="border border-gray-300 rounded-md px-4 py-2 text-lg w-full max-w-xs"
              />
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-6 py-2 rounded-md text-lg w-full max-w-xs"
              >
                Save
              </button>
            </div>
            
            )}
          </div>
        </div>
      </div>
    ) : null
  );
};

export default LinearSearchModal;
