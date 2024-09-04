import React from 'react';

const Template = ({ image, isSelected, onClick }) => {
  return (
    <div className={`border-2 cursor-pointer w-1/2 sm:w-1/6 px-1 py- sm:px-5 sm:py-5 h-auto sm:h-full transition duration-300 border-transparent `} onClick={onClick}>
      <img src={image} alt="Card" className={`w-full border-4 h-auto ${isSelected ? 'border-blue-500' : 'border-transparent'} rounded-lg`} />
    </div>
  );
};

export default Template;
