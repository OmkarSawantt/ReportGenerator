import React, { useState } from 'react';
import template1 from "../constants/templatesImg/Template1.jpg";
import template2 from "../constants/templatesImg/Template2.jpg";
import template3 from "../constants/templatesImg/Template3.jpg";
import template4 from "../constants/templatesImg/Template4.jpg";
import template5 from "../constants/templatesImg/Template5.jpg";
import template6 from "../constants/templatesImg/Template6.jpg";
import Template from './Template';
import { useNavigate } from 'react-router-dom';

const TemplateInput = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const cardImages = [template1, template2, template3, template4, template5, template6];
  const navigate = useNavigate();
  const handleCardClick = (index) => {
    setSelectedCard(index);
  };

  const handleSubmit = () => {
    if (selectedCard !== null) {
      navigate('/new-report/text', { state: { data:{template:selectedCard+1} } })
    } else {
      alert('Please select a card.');
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <h2 className='text-center text-blue-100 text-lg sm:mt-10'>Choose template for report</h2>
      <div className="w-full h-auto flex flex-wrap items-center justify-center px-10  ">
        {cardImages.map((image, index) => (
          <Template
            key={index}
            image={image}
            isSelected={selectedCard === index}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
      <button type="button" onClick={handleSubmit} className="relative h-auto my-5 inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group self-center">
        <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-400 group-hover:opacity-100"></span><span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span><span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span><span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span><span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span><span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span><span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
        <span className="relative text-lg">Submit</span>
      </button>
    </div>
  );
};

export default TemplateInput;
