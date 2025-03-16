import { useState } from "react";

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        className={`relative w-10 h-5 rounded-full p-1 transition duration-300 ${
          isOn ? "bg-red-600" : "bg-gray-300"
        }`}
        onClick={onToggle}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
            isOn ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
