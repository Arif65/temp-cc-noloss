// import React, { useRef, useEffect, useState } from 'react';
// import * as d3 from "d3";
// import AnimationControls from '../Animations/AnimationControl';
// import Header from '../../layouts/Header';

// const LinearSearch = () => {
//   const [speed, setSpeed] = useState(600);
//   const [isRunning, setIsRunning] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isStopped, setIsStopped] = useState(true);
//   const [array, setArray] = useState([]); // Store the array in state

//   const target = 42; // Fixed target for this example
//   const d3Container = useRef(null);
//   const speedRef = useRef(speed);
//   const pausedRef = useRef(isPaused);
//   const intervalIdRef = useRef(null);

//   useEffect(() => {
//     speedRef.current = speed;
//     pausedRef.current = isPaused;
//   }, [speed, isPaused]);

//   // Initialize array only once or when explicitly reset
//   useEffect(() => {
//     const initialArray = Array.from({ length: 50 }, () => Math.floor(Math.random() * 100));
//     setArray(initialArray);
//   }, []); // Empty dependency array ensures this runs only once

//   useEffect(() => {
//     if (!array.length) return; // Wait until array is initialized

//     const svgWidth = 1200;
//     const svgHeight = 600;
//     const barWidth = svgWidth / array.length;

//     const svg = d3.select(d3Container.current)
//       .append("svg")
//       .attr("width", svgWidth)
//       .attr("height", svgHeight);

//     svg.selectAll("rect")
//       .data(array)
//       .enter()
//       .append("rect")
//       .attr("x", (d, i) => i * barWidth)
//       .attr("y", d => svgHeight - d * 2)
//       .attr("width", barWidth - 5)
//       .attr("height", d => d * 2)
//       .attr("fill", "steelblue")
//       .attr("stroke", "black");

//     function visualizeSearch() {
//       let currentIndex = 0;
//       if (intervalIdRef.current) clearInterval(intervalIdRef.current);

//       intervalIdRef.current = setInterval(() => {
//         if (pausedRef.current) return;

//         if (currentIndex > 0) {
//           svg.select(`rect:nth-child(${currentIndex})`)
//             .transition()
//             .duration(speedRef.current / 2)
//             .attr("fill", "red");
//         }

//         if (currentIndex >= array.length) {
//           clearInterval(intervalIdRef.current);
//           setIsRunning(false);
//           setIsStopped(true);
//           return;
//         }

//         const value = array[currentIndex];
//         const bar = svg.select(`rect:nth-child(${currentIndex + 1})`);

//         bar.transition()
//           .duration(speedRef.current / 2)
//           .attr("fill", "orange");

//         setTimeout(() => {
//           if (value === target) {
//             bar.transition()
//               .duration(speedRef.current / 2)
//               .attr("fill", "green");
//             clearInterval(intervalIdRef.current);
//             setIsRunning(false);
//             setIsStopped(true);
//           } else {
//             bar.transition()
//               .duration(speedRef.current / 2)
//               .attr("fill", "red");
//           }
//         }, speedRef.current / 2);

//         currentIndex++;
//       }, speedRef.current);
//     }

//     if (isRunning && !isStopped) visualizeSearch();

//     return () => {
//       clearInterval(intervalIdRef.current);
//       d3.select(d3Container.current).select("svg").remove();
//     };
//   }, [array, isRunning, isStopped]);

//   return (
//     <>
//       <Header pageName="Linear Search" />
//       <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//         <AnimationControls
//           speed={speed}
//           setSpeed={setSpeed}
//           isRunning={isRunning}
//           isPaused={isPaused}
//           isStopped={isStopped}
//           onRun={() => {
//             setIsRunning(true);
//             setIsPaused(false);
//             setIsStopped(false);
//           }}
//           onPause={() => setIsPaused((prev) => !prev)}
//           onStop={() => {
//             setIsRunning(false);
//             setIsPaused(false);
//             setIsStopped(true);
//           }}
//         />
//         <div ref={d3Container}></div>
//       </div>
//     </>
//   );
// };

// export default LinearSearch;
