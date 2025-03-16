"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";


const defaultIcon = new L.Icon({
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const landmarks = [
  { name: "Airport", lat: 18.5793, lng: 73.9104 },
  { name: "Train Station", lat: 18.5167, lng: 73.8563 },
  { name: "Bus Stop", lat: 18.5204, lng: 73.8567 },
  { name: "Metro Station", lat: 18.5300, lng: 73.8500 },
  { name: "Shopping Mall", lat: 18.5522, lng: 73.8295 },
  { name: "Hospital", lat: 18.5203, lng: 73.8672 },
  { name: "School", lat: 18.5246, lng: 73.8493 },
  { name: "Park", lat: 18.5386, lng: 73.8291 },
  { name: "Beach", lat: 18.9611, lng: 72.8258 },
  { name: "City Center", lat: 18.5204, lng: 73.8567 },
];

const GoogleMap = () => {
  const [selectedLandmark, setSelectedLandmark] = useState(landmarks[0].name);
  const [distance, setDistance] = useState("");
  const [description, setDescription] = useState("");
  const [coordinates, setCoordinates] = useState({
    latitude: landmarks[0].lat,
    longitude: landmarks[0].lng,
  });


  const handleLandmarkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    setSelectedLandmark(selectedName);
    const newLocation = landmarks.find((landmark) => landmark.name === selectedName);
    if (newLocation) {
      setCoordinates({ latitude: newLocation.lat, longitude: newLocation.lng });
    }
  };


  const handleSaveLocation = () => {
    const locationData = {
      landmark: selectedLandmark,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    };

    console.log("Saved Location:", locationData);
    localStorage.setItem("savedLocation", JSON.stringify(locationData));
    alert("Location saved successfully!");
  };

  return (
    <div className="rounded-lg shadow-md mx-auto p-6 max-w-4xl mt-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Landmark Selection */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Landmark</label>
          <select
            value={selectedLandmark}
            onChange={handleLandmarkChange}
            className="p-2 border rounded"
          >
            {landmarks.map((landmark, index) => (
              <option key={index} value={landmark.name}>
                {landmark.name}
              </option>
            ))}
          </select>
        </div>

        {/* Distance Input */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Distance</label>
          <input
            type="text"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="e.g., 3 km"
            className="p-2 border rounded"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="font-semibold mb-1 block">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description..."
          className="p-2 border border-gray-300 rounded-lg  w-full focus:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-red-300 focus:border-red-300 "
        />
      </div>

      {/* Latitude & Longitude */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Latitude</label>
          <input
            type="text"
            value={coordinates.latitude.toFixed(6)}
            readOnly
            className="p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Longitude</label>
          <input
            type="text"
            value={coordinates.longitude.toFixed(6)}
            readOnly
            className="p-2 border rounded bg-gray-100"
          />
        </div>
      </div>


      <div className="mt-4 text-right">
        <button
          onClick={handleSaveLocation}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Save Location
        </button>
      </div>


      {/* OpenStreetMap (Leaflet) */}
      <div className="mt-6">
        <MapContainer
          key={`${coordinates.latitude}-${coordinates.longitude}`}
          center={[coordinates.latitude, coordinates.longitude]}
          zoom={12}
          style={{ height: "300px", width: "100%", borderRadius: "8px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <Marker position={[coordinates.latitude, coordinates.longitude]} icon={defaultIcon}>
            <Popup>{selectedLandmark}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default GoogleMap;
