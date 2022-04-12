import React from 'react';

const DirectionSvgComponent = ({width, height}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24"><path d="M19.172 5l1 1-1 1h-14.172v-2h14.172zm.828-2h-17v6h17l3-3-3-3zm-1 10v2h-14.171l-1-1 1-1h14.171zm2-2h-17l-3 3 3 3h17v-6zm-6-9v-2h-5v2h5zm-2 17v3h-1v-3h-2v5h5v-5h-2z"/></svg>
  );
};

export default DirectionSvgComponent;