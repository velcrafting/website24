// src/components/Kanban/CustomLaneFooter.js
import React from 'react';

const CustomLaneFooter = ({ laneId, onAddCardClick }) => (
  <div 
    style={{ textAlign: 'center', padding: '10px', cursor: 'pointer', backgroundColor: '#f0f0f0' }}
    onClick={() => onAddCardClick(laneId)}
  >
    Click to add card
  </div>
);

export default CustomLaneFooter;
