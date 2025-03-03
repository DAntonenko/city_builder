import React from "react";
import { House } from "./HouseCard";
import HouseControlsItem from "./HouseControlsItem";

const HouseControls = ({ houses, onAdd, onUpdate, onDelete }: { 
  houses: House[]; 
  onAdd: (house: Omit<House, 'id'>) => void; 
  onUpdate: (id: number, updatedHouse: Partial<House>) => void; 
  onDelete: (id: number) => void;
}) => {
  
  return (
    <div className="p-4 border rounded-lg shadow-lg bg-gray-100 w-64 shrink-0">
      <h2 className="text-lg font-bold">Houses List</h2>
      {houses.map(({ id }) => (
        <HouseControlsItem 
          key={id} 
          houseId={id} 
          onUpdate={onUpdate} 
          onDelete={onDelete} 
        />
      ))}
      <button
        onClick={() => onAdd({ name: `House ${houses.length + 1}`, color: 'orange', floors: 3 })}
        className="bg-white px-4 py-2 mt-4 w-full rounded border cursor-pointer"
      >
        🏠 Build a new house
      </button>
    </div>
  );
};

export default React.memo(HouseControls);
