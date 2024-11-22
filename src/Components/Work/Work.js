import React, { useEffect, useState, useMemo } from 'react';
import './Work.css';

const Counter = ({ start, end, duration, suffix = '' }) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let current = start;
    const increment = (end - start) / (duration * 100); // Calculate increment based on duration
    const interval = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(interval);
      }
      setCount(Math.floor(current));
    }, 10); // Update every 10ms for smooth animation

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [start, end, duration]);

  return (
    <p className="count-number">
      {count}
      {suffix}
    </p>
  );
};

const Work = () => {
  const counters = useMemo(() => [
    { label: 'Projects', target: 1200, duration: 2.5 },
    { label: 'Clients', target: 150, duration: 2.5, suffix: '+' },
    { label: 'Awards', target: 15, duration: 2.5 },
  ], []);

  return (
    <div className="work-page">
      {/* Header Section */}
      <header className="work-header">
        <h1>Our Work</h1>
        <p>Showcasing our successful projects, clients, and awards.</p>
      </header>

      {/* Counters Section */}
      <div className="counter-container">
        {counters.map((counter, index) => (
          <div className="counter-item" key={index}>
            <h3>{counter.label}</h3>
            <Counter start={0} end={counter.target} duration={counter.duration} suffix={counter.suffix} />
          </div>
        ))}
      </div>

      {/* Featured Projects Section */}
      <div className="work-projects">
        <h2>Featured Projects</h2>
        <div className="projects-list">
          <div className="project">
            <img src="https://via.placeholder.com/300x200" alt="Project 1" />
            <h3>Project Name 1</h3>
            <p>Description of the project...</p>
          </div>
          <div className="project">
            <img src="https://via.placeholder.com/300x200" alt="Project 2" />
            <h3>Project Name 2</h3>
            <p>Description of the project...</p>
          </div>
          <div className="project">
            <img src="https://via.placeholder.com/300x200" alt="Project 3" />
            <h3>Project Name 3</h3>
            <p>Description of the project...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;