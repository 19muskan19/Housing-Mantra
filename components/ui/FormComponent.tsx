"use client";

import { useState } from "react";

const FormComponent = () => {
  const [youtubeLinks, setYoutubeLinks] = useState([""]);
  const [isReraRegistered, setIsReraRegistered] = useState(true);
  const [reraNumbers, setReraNumbers] = useState([""]);

  const handleYoutubeChange = (index: number, value: string) => {
    const updatedLinks = [...youtubeLinks];
    updatedLinks[index] = value;
    setYoutubeLinks(updatedLinks);
  };

  const addYoutubeField = () => {
    setYoutubeLinks([...youtubeLinks, ""]);
  };

  const handleReraChange = (index: number, value: string) => {
    const updatedNumbers = [...reraNumbers];
    updatedNumbers[index] = value;
    setReraNumbers(updatedNumbers);
  };

  const addReraField = () => {
    setReraNumbers([...reraNumbers, ""]);
  };

  return (
    <div className="p-4 sm:p-6 bg-white shadow-md rounded-lg w-full max-w-2xl mx-auto">
      {/* YouTube URLs Section */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">YouTube URLs</label>
        {youtubeLinks.map((link, index) => (
          <input
            key={index}
            type="text"
            value={link}
            onChange={(e) => handleYoutubeChange(index, e.target.value)}
            placeholder="Enter YouTube link"
            className="w-full p-2 border rounded-md"
          />
        ))}
        <button
          onClick={addYoutubeField}
          className="mt-2 px-3 py-2 bg-blue-500 text-white rounded w-full sm:w-auto cursor-pointer"
        >
          Add another URL
        </button>
      </div>

      {/* RERA Registration Section */}
      <div className="mt-6 flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Is the project RERA registered?
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="yes"
              checked={isReraRegistered}
              onChange={() => setIsReraRegistered(true)}
              className="mr-2"
            />
            Yes
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="no"
              checked={!isReraRegistered}
              onChange={() => setIsReraRegistered(false)}
              className="mr-2"
            />
            No
          </label>
        </div>
      </div>

      {/* RERA Number Section */}
      {isReraRegistered && (
        <div className="mt-6 flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            RERA Number(s)
          </label>
          {reraNumbers.map((num, index) => (
            <input
              key={index}
              type="text"
              value={num}
              onChange={(e) => handleReraChange(index, e.target.value)}
              placeholder="Enter RERA number"
              className="w-full p-2 border rounded-md"
            />
          ))}
          <button
            onClick={addReraField}
            className="mt-2 px-3 py-2 text-white rounded w-full sm:w-auto cursor-pointer"
          >
            Add another RERA number
          </button>

        </div>
      )}
    </div>
  );

};

export default FormComponent;
