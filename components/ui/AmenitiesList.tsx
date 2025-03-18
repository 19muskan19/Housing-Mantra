"use client";

import { useState } from "react";
import Image from "next/image";

import { FaCheckCircle, FaRegCircle } from "react-icons/fa"; // Import icons

import dynamic from "next/dynamic";

const GoogleMap = dynamic(() => import("@/components/ui/GoogleMap"), { ssr: false });


interface UploadedImage {
  id: string;
  src: string;
  description: string;
  isPrimary: boolean;
}

const amenitiesList = [
  "School in vicinity", "Near City Center", "Breakthrough Price", "High Rental Yield",
  "Well Ventilated", "Spacious", "Gated Society", "Luxury Lifestyle", "Newly Built",
  "Females Only", "Adjoining Metro Station", "Safe & Secure Locality", "Quick Deal",
  "Affordable", "Fully Renovated", "Ample Parking", "Tasteful Interior", "Well Maintained",
  "Family", "Peaceful Vicinity", "Desperate Sale", "Investment Opportunity", "Reputed Builder",
  "Vastu Compliant", "Free Hold", "Prime Location", "Plenty of Sunlight", "Bachelors"
];

export default function AmenitiesUploader() {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [error, setError] = useState<string | null>(null);
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


  const handleAmenityClick = (amenity: string) => {
    let updatedAmenities;
    if (selectedAmenities.includes(amenity)) {
      updatedAmenities = selectedAmenities.filter((a) => a !== amenity);
    } else {
      updatedAmenities = [...selectedAmenities, amenity];
    }
    setSelectedAmenities(updatedAmenities);
    setProgress((updatedAmenities.length / amenitiesList.length) * 100);
  };

  const toggleSelectAll = () => {
    if (selectedAmenities.length === amenitiesList.length) {
      setSelectedAmenities([]);
      setProgress(0);
    } else {
      setSelectedAmenities(amenitiesList);
      setProgress(100);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();

    const files = event.dataTransfer.files;
    if (!files || files.length === 0) return;

    const newImages = Array.from(files).map((file, index) => {
      const fileUrl = URL.createObjectURL(file);
      return {
        id: fileUrl,
        src: fileUrl,
        description: "",
        isPrimary: images.length === 0 && index === 0, // Ensure first image is primary
      };
    });

    setImages((prevImages) => [...prevImages, ...newImages]);
    setError(null);
  };


  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      id: URL.createObjectURL(file),
      src: URL.createObjectURL(file),
      description: "",
      isPrimary: images.length === 0,
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);
    setError(null);
  };

  const handleDeleteImage = (id: string) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((image) => image.id !== id);
      if (updatedImages.length === 0) setError("Select at least one media");
      if (updatedImages.length > 0 && !updatedImages.some((img) => img.isPrimary)) {
        updatedImages[0].isPrimary = true;
      }
      return updatedImages;
    });
  };

  const handleDescriptionChange = (id: string, description: string) => {
    setImages((prevImages) =>
      prevImages.map((img) => (img.id === id ? { ...img, description } : img))
    );
  };

  const handleSetPrimary = (id: string) => {
    setImages((prevImages) => {
      return prevImages.map((img) =>
        img.id === id ? { ...img, isPrimary: true } : { ...img, isPrimary: false }
      );
    });
  };



  return (
    <div className="mx-auto p-6 max-w-4xl">
      <h2 className="text-xl font-semibold">Update Amenities</h2>
      <p className="text-gray-500">Fill out the amenities below about this new project</p>

      <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
        <div className="h-2 bg-red-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-right text-sm text-gray-500 mt-1">{Math.round(progress)}% Complete</p>

      <div className="flex justify-between items-center my-4">
        <h2 className="text-lg font-semibold">Amenities</h2>
        <button onClick={toggleSelectAll} className="flex items-center space-x-2">
          {selectedAmenities.length === amenitiesList.length ? (
            <>
              <FaCheckCircle className="text-red-500" /> <span>Unselect All</span>
            </>
          ) : (
            <>
              <FaRegCircle className="text-gray-500" /> <span>Select All</span>
            </>
          )}
        </button>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {amenitiesList.map((amenity) => (
          <button
            key={amenity}
            onClick={() => handleAmenityClick(amenity)}
            className="flex items-center space-x-2 text-left w-full"
          >
            {selectedAmenities.includes(amenity) ? (
              <FaCheckCircle className="text-red-500" />
            ) : (
              <FaRegCircle className="text-gray-500" />
            )}
            <span className="flex-1">{amenity}</span>
          </button>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-2 mt-6">Images</h2>
      <label
        className="border border-gray-300 border-dashed rounded-lg flex flex-col items-center justify-center py-10 cursor-pointer hover:bg-gray-100 w-full"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
        <p className="text-gray-500 text-center">Click or drag images here to upload</p>
      </label>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {images.length > 0 && (
        <div className="mt-6 w-full">
          <h3 className="text-lg font-semibold">Uploaded Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4">
            {images.map((image) => (
              <div key={image.id} className="relative border rounded-lg p-3">
                {/* Delete Button - Positioned Outside */}
                <button
                  onClick={() => handleDeleteImage(image.id)}
                  className="absolute top-[-10px] right-[-10px] rounded-full bg-white shadow-lg p-2 text-black cursor-pointer"
                >
                  ✕
                </button>

                <Image
                  src={image.src}
                  alt="Uploaded preview"
                  width={150}
                  height={150}
                  className="rounded-md w-full h-32 object-cover"
                />

                <div className="flex items-center justify-between mt-2">
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <label className="text-sm font-medium text-gray-700">Set Primary</label>
                </div>

                <div className="flex items-center mt-1">
                  <input
                    type="text"
                    placeholder="Write a description..."
                    value={image.description}
                    onChange={(e) => handleDescriptionChange(image.id, e.target.value)}
                    className="w-3/4 border rounded-md p-1 text-sm focus:border-red-500 focus:outline-none"
                  />

                  <div
                    className={`relative w-10 h-5 flex items-center rounded-full cursor-pointer transition-all duration-300 ml-2 ${image.isPrimary ? 'bg-red-500' : 'bg-gray-300'
                      }`}
                    onClick={() => handleSetPrimary(image.id)}
                  >
                    <div
                      className={`absolute left-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-all duration-150 ${image.isPrimary ? 'translate-x-5' : ''
                        }`}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="pt-6 w-full mt-6">
        {/* YouTube URLs Section */}
        <label className="block text-sm font-medium text-gray-700">
          YouTube URLs
        </label>
        {youtubeLinks.map((link, index) => (
          <input
            key={index}
            type="text"
            value={link}
            onChange={(e) => handleYoutubeChange(index, e.target.value)}
            placeholder="Enter YouTube link"
            className="w-full mt-2 p-2 border rounded-md focus:border-red-500 focus:outline-none"
          />
        ))}
        <button
          onClick={addYoutubeField}
          className="mt-2 px-3 py-1 border border-gray-400 rounded-md text-dark text-sm w-full sm:w-auto"
        >
          Add another URL
        </button>

        <div className="mt-4 p-4 border border-gray-300 rounded-md w-full">
          <label className="block text-sm font-medium text-gray-700">
            Is the project RERA registered?
          </label>
          <div className="mt-2 flex flex-wrap gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="yes"
                checked={isReraRegistered}
                onChange={() => setIsReraRegistered(true)}
                className="peer hidden"
              />
              <span className="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center peer-checked:border-red-500 peer-checked:bg-red-500">
                <span className="w-2 h-2 bg-white rounded-full"></span>
              </span>
              <span className="ml-2">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="no"
                checked={!isReraRegistered}
                onChange={() => setIsReraRegistered(false)}
                className="peer hidden"
              />
              <span className="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center peer-checked:border-red-500 peer-checked:bg-red-500">
                <span className="w-2 h-2 bg-white rounded-full"></span>
              </span>
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>

        {isReraRegistered && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              RERA Number(s)
            </label>
            {reraNumbers.map((num, index) => (
              <input
                key={index}
                type="text"
                value={num}
                onChange={(e) => handleReraChange(index, e.target.value)}
                placeholder="Enter RERA number"
                className="w-full mt-2 p-2 border rounded-md focus:border-red-500 focus:outline-none"
              />
            ))}
            <button
              onClick={addReraField}
              className="mt-2  mb-4 px-3 py-1 border border-gray-400 rounded-md text-dark text-sm"
            >
              Add another RERA number
            </button>
          </div>
        )}
      </div>
      <GoogleMap />
      <div className="mt-4 flex justify-between">

        <button className="cursor-pointer bg-red-300 p-2 rounded hover:bg-red-400">
          Previous
        </button>
        <button className="cursor-pointer bg-red-500 text-white p-2 rounded hover:bg-red-600">
          Submit
        </button>
      </div>
    </div>
  );

}
