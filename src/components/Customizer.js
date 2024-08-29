import React from 'react';

const Customizer = ({ customizerArray, onSelect, onDelete, onMoveUp, onMoveDown, selectedIndex }) => {
  return (
    <div className="customizer">
      <h3>Customizer</h3>
      <div className="customizer-content">
        {customizerArray.map((item, index) => (
          <div
            key={index}
            className={`customizer-item ${selectedIndex === index ? 'selected' : ''}`}
            onClick={() => onSelect(index)}
          >
            <span className="title">
              {typeof item === 'string' ? item : item}
            </span>
            <div className="controls">
              <span onClick={(e) => { e.stopPropagation(); onMoveUp(index); }}>⬆️</span>
              <span onClick={(e) => { e.stopPropagation(); onMoveDown(index); }}>⬇️</span>
              <span onClick={(e) => { e.stopPropagation(); onDelete(index); }}>❌</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customizer;
