import React, { useEffect, useRef } from 'react';
import { CountUp } from 'countup.js'; // Import the CountUp class from countup.js

const Counter = ({ start, end, duration, suffix }) => {
  const countRef = useRef(null); // Create a reference to the DOM element where the counter will appear

  useEffect(() => {
    // Ensure the ref element is available
    if (countRef.current) {
      console.log(`Starting count: ${start} to ${end}`); // Debugging: Log start and end values

      const counter = new CountUp(countRef.current, start, end, 0, duration, {
        suffix: suffix || '', // Append suffix (if provided)
        decimals: 0, // No decimals
      });

      if (counter.error) {
        console.error('Error starting the counter:', counter.error); // Log if there’s any error in initializing the counter
      } else {
        counter.start(); // Start the counter animation
      }
    }
  }, [start, end, duration, suffix]); // Re-run if start, end, or duration changes

  return (
    <p className="timer count-title count-number" ref={countRef}></p>
  );
};

export default Counter;
