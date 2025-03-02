import React from "react";
import { House } from "./HouseCard";

const HouseControls = ({ houses, onAdd, onUpdate, onDelete }: { 
  houses: House[]; 
  onAdd: (house: Omit<House, 'id'>) => void; 
  onUpdate: (id: number, updatedHouse: Partial<House>) => void; 
  onDelete: (id: number) => void;
}) => {
  return (
    <div className="p-4 border rounded-lg shadow-lg bg-gray-100 w-64 shrink-0">
      <h2 className="text-lg font-bold">Houses List</h2>
      {houses.map((house) => (
        <div key={house.id} className="p-2 border rounded mt-2">
          <div className="flex w-full justify-between items-center">
            <h3 className="text-md font-semibold">{house.name}</h3>
            <button onClick={() => onDelete(house.id)} className="bg-white px-2 py-1 mt-2 rounded border cursor-pointer">🗑️</button>
          </div>
          <label className="block mt-2">
            Floors:
            <input
              type="number"
              min="1"
              max="6"
              value={house.floors}
              onChange={e => onUpdate(house.id, { floors: Number(e.target.value) })}
              className="ml-2 w-12 border p-1 rounded"
            />
          </label>
          <input
            type="range"
            min="1"
            max="6"
            value={house.floors}
            onChange={e => onUpdate(house.id, { floors: Number(e.target.value) })}
            className="w-full mt-3"
          />
          <label className="block mt-2">Color:</label>
          <select value={house.color} onChange={e => onUpdate(house.id, { color: e.target.value })} className="w-full p-1 border rounded">
            <option value="orange">Orange</option>
            <option value="#e32636">Alizarin</option>
            <option value="#8de2e7">Belize</option>
            <option value="#50C878">Emerald</option>
          </select>
        </div>
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

export default HouseControls;
