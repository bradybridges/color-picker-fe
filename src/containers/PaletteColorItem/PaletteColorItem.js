import React from 'react';

const PaletteColorItem = ({ color, isLocked }) => {
  const style = { backgroundColor: color };
  return (
    <section style={style}>
      <p>{color}</p>
    </section>
  );
};

export default PaletteColorItem;
