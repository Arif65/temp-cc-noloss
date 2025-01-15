import React from "react";
import LinearSearchModal from "../algorithms/SearchingAlgo/LinearSearchModal";

const Replay = ({ record, onClose }) => {
  if (!record) return null; // Render nothing if no record is selected

  const { topic, input, target, id } = record;

  // Decide which modal to show based on the topic
  switch (topic) {
    case "Linear Search":
      return (
        <LinearSearchModal
          id={id}
          name={record.name}
          topic={topic}
          isOpen={!!record}
          onClose={onClose}
          array={input} 
          target={target}
        />
      );

    // Add cases for other algorithms here
    // case "Binary Search":
    //   return <BinarySearchModal {...props} />;

    default:
      return (
        <div>
          <p>No modal available for this topic: {topic}</p>
          <button onClick={onClose}>Close</button>
        </div>
      );
  }
};

export default Replay;
