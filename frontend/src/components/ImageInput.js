import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate, useLocation } from 'react-router-dom';
import file_upload from '../constants/File-upload.png';
import { createReport } from '../actions/ReportActions';

const ImageInput = () => {
  const loc = useLocation();
  const repData = loc.state?.repData;
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  let MAX_IMAGES;
  if(repData?.template===3 || repData?.template===4){
    MAX_IMAGES=1;
  }else{
    MAX_IMAGES = 6; // Maximum number of images allowed
  }

  const onDrop = (acceptedFiles, rejectedFiles) => {
    // Handle rejected files (unsupported file types)
    if (rejectedFiles.length > 0) {
      console.log('Rejected files:', rejectedFiles);
      alert('Some files were rejected. Please upload only JPEG or PNG images.');
    }

    // Check the current number of images and limit the number of new images added
    if (images.length + acceptedFiles.length > MAX_IMAGES) {
      alert(`You can only upload up to ${MAX_IMAGES} images.`);
      return;
    }

    const newImages = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    URL.revokeObjectURL(updatedImages[index].preview); // Revoke the URL
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleSubmit = () => {
    if (images.length === 0) {
      alert('Please upload at least one image.');
      return;
    }
    const imageFiles = images.map((image) => image.file);
    const updatedRepData = new FormData();

    for (const [key, value] of Object.entries(repData)) {
      updatedRepData.append(key, value);
    }
    imageFiles.forEach((file) => {
      updatedRepData.append('pictures', file);
    });
    createReport(updatedRepData).then((res) => {
      navigate('/new-report/result', { state: { id: res.data._id } });
    }).catch((err) => {
      console.log(err);
    });

  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
    multiple: true,
  });

  return (
    <div className="p-4 w-full sm:w-1/2 h-full flex flex-col sm:items-center">
      <h2 className='text-center text-blue-100 text-lg sm:my-10 '>Select Images for Report</h2>
      <div {...getRootProps()} className="border-dotted shadow shadow-blue-100  w-auto sm:w-full  h-1/3 pb-8 m-4 border-2 border-[#1a1a2e] p-4 rounded-md backdrop-blur-3xl cursor-pointer flex flex-col items-center justify-evenly gap-4">
        <input {...getInputProps()} />
        <img src={file_upload} alt="File Upload" className='w-10 sm:w-12' />
        <p className='text-center text-blue-100 text-sm '>Select a file or drag and drop here (JPEG/PNG only)</p>
        <div  className="relative h-1/4 inline-flex items-center justify-center px-2  overflow-hidden font-bold text-white rounded-md shadow-2xl group  self-center"><span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-400 group-hover:opacity-100"></span><span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span><span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span><span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span><span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span><span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span><span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span><span className="relative text-xs ">SelectImage</span></div>
      </div>
      <div className="mt-2">
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img src={image.preview} alt="Preview" className="h-32 w-full object-cover" />
                <button onClick={() => handleRemoveImage(index)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 h-6 w-6 flex items-center justify-center">X</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <button type="button" onClick={handleSubmit} className="relative h-auto my-5 inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group self-center">
          <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-400 group-hover:opacity-100"></span><span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span><span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span><span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span><span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span><span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span><span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
          <span className="relative text-lg">Submit</span>
        </button>
    </div>
  );
};

export default ImageInput;
