"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

const defaultIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const pune = { lat: 18.5204, lng: 73.8567 };

const GoogleMap = () => {
  const [selectedLandmark, setSelectedLandmark] = useState("");
  const [distance, setDistance] = useState<number | "">("");
  const [filteredLandmarks, setFilteredLandmarks] = useState<{ name: string; lat: number; lng: number }[]>([]);
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  // Function to fetch landmarks
  const fetchLandmarks = async (landmarkType: string) => {
    try {
      const overpassQueries: { [key: string]: string } = {
        "Train Station": 'railway=station',
        "Bus Stop": 'highway=bus_stop',
        "Metro Station": 'railway=subway_entrance',
        "Shopping Mall": 'shop=mall',
        "Hospital": 'amenity=hospital',
        "School": 'amenity=school',
        "Park": 'leisure=park',
        "City Center": 'place=city',
      };


      if (!overpassQueries[landmarkType]) return [];

      const query = `
        [out:json];
        area[name="Pune"]->.searchArea;
        (
          node[${overpassQueries[landmarkType]}](area.searchArea);
          way[${overpassQueries[landmarkType]}](area.searchArea);
          relation[${overpassQueries[landmarkType]}](area.searchArea);
        );
        out center;
      `;

      const response = await axios.get("https://overpass-api.de/api/interpreter", {
        params: { data: query },
      });

      return response.data.elements.map((place: any) => ({
        name: landmarkType,
        lat: place.lat || place.center.lat,
        lng: place.lon || place.center.lon,
      }));
    } catch (error) {
      console.error("Error fetching landmarks:", error);
      return [];
    }
  };
  useEffect(() => {
    const applyFilters = async () => {
      if (!selectedLandmark) {
        setFilteredLandmarks([]);
        return;
      }
      const landmarks = await fetchLandmarks(selectedLandmark);
      const filtered = landmarks.filter(
        (landmark: { lat: number; lng: number; }) =>
          distance === "" || getDistance(pune.lat, pune.lng, landmark.lat, landmark.lng) <= Number(distance)
      );
      setFilteredLandmarks(filtered);
    };
    applyFilters();
  }, [selectedLandmark, distance]);

  // Haversine formula to calculate distance (in km)
  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (angle: number) => (angle * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setLat(e.latlng.lat);
        setLng(e.latlng.lng);
      },
    });
    return null;
  };

  return (
    <div className="rounded-lg shadow-md mx-auto p-6 max-w-4xl mt-3">
      <div className="mb-4">
        <label className="font-semibold block mb-1">Select Landmark:</label>
        <select
          onChange={(e) => setSelectedLandmark(e.target.value)}
          className="p-2 border rounded w-full bg-gray-100"
        >
          <option value="">Select a landmark...</option>
          {["Train Station", "Bus Stop", "Metro Station", "Shopping Mall", "Hospital", "School", "Park", "City Center"].map(
            (name) => (
              <option key={name} value={name}>
                {name}
              </option>
            )
          )}
        </select>
      </div>

      <div className="mb-4">
        <label className="font-semibold block mb-1">Search within (km):</label>
        <input
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value === "" ? "" : Number(e.target.value))}
          className="p-2 border rounded w-full bg-gray-100"
          placeholder="Enter distance in km"
          min="0"
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold block mb-1">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded w-full bg-gray-100"
          placeholder="Enter details here..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="font-semibold block mb-1">Latitude:</label>
          <input
            type="text"
            value={lat ?? ""}
            readOnly
            className="p-2 border rounded w-full bg-gray-100"
          />
        </div>
        <div>
          <label className="font-semibold block mb-1">Longitude:</label>
          <input
            type="text"
            value={lng ?? ""}
            readOnly
            className="p-2 border rounded w-full bg-gray-100"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={() => alert(`Saved: Landmark: ${selectedLandmark}, Distance: ${distance}, Description: ${description}, Latitude: ${lat}, Longitude: ${lng}`)}
        >
          Save
        </button>
      </div>


      <MapContainer center={[pune.lat, pune.lng]} zoom={13} className="h-[400px] w-full mt-4">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MapClickHandler />

        <Marker position={[pune.lat, pune.lng]} icon={defaultIcon}>
          <Popup>Pune, Maharashtra</Popup>
        </Marker>

        {/* Render Landmark Markers */}
        {filteredLandmarks.map((landmark, index) => (
          <Marker
            key={index}
            position={[landmark.lat, landmark.lng]}
            icon={defaultIcon}
            eventHandlers={{
              click: () => {
                setLat(landmark.lat);
                setLng(landmark.lng);
              },
            }}
          >
            <Popup>{landmark.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default GoogleMap;
