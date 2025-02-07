import React from "react";

const DetailsPanel = ({
  currentAddress,
  searchedAddress,
  panelHeight,
  onDragStart,
  onDrag,
  onDragEnd,
  handleConfirmRide
}) => {
  return (
    <div
      className="absolute bottom-0 left-0 w-full bg-blue-50 rounded-t-lg shadow-lg"
      style={{
        height: `${panelHeight}px`,
        transition: onDrag ? "none" : "height 0.3s ease",
        boxShadow: "0px -2px 10px rgba(0,0,0,0.3)",
      }}
      onTouchStart={onDragStart}
      onTouchMove={onDrag}
      onTouchEnd={onDragEnd}
      onMouseDown={onDragStart}
      onMouseMove={onDrag}
      onMouseUp={onDragEnd}
    >
      {/* Drag handle */}
      <div className="w-full h-6 flex items-center justify-center bg-blue-200 rounded-t-lg cursor-pointer">
        <div className="w-10 h-1 bg-blue-500 rounded"></div>
      </div>

      {/* Panel content */}
      <div className="p-4">
        {/* From Address */}
        <div className="flex items-center mb-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
              📍
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm text-blue-500">From</p>
            <p className="font-semibold text-blue-700">{currentAddress}</p>
          </div>
        </div>

        <div className="border-b border-blue-300 my-2"></div>

        {/* To Address */}
        <div className="flex items-center mb-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-200 text-blue-700 rounded-full">
              🏁
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm text-blue-500">To</p>
            <p className="font-semibold text-blue-700">{searchedAddress}</p>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="mt-4">
          <button onClick={handleConfirmRide} className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 shadow-md">
            Confirm Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPanel;