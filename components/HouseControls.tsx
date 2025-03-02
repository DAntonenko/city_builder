import React from "react";
import { House } from "./HouseCard";

const HouseControls = ({ houses, onAdd, onUpdate, onDelete }: { 
  houses: House[]; 
  onAdd: (house: Omit<House, 'id'>) => void; 
  onUpdate: (id: number, updatedHouse: Partial<House>) => void; 
  onDelete: (id: number) => void;
}) => {
  return (
    <div className="p-4 border rounded-lg shadow-lg bg-gray-100 w-64">
      <h2 className="text-lg font-bold">Houses List</h2>
      {houses.map((house) => (
        <div key={house.id} className="p-2 border rounded mt-2">
          <h3 className="text-md font-semibold">{house.name}</h3>
          <label className="block mt-2">Floors: {house.floors}</label>
          <input type="range" min="1" max="6" value={house.floors} 
            onChange={e => onUpdate(house.id, { floors: Number(e.target.value) })} className="w-full" />
          <label className="block mt-2">Color:</label>
          <select value={house.color} onChange={e => onUpdate(house.id, { color: e.target.value })} className="w-full p-1 border rounded">
            <option value="orange">Orange</option>
            <option value="red">Alizarin</option>
            <option value="blue">Belize</option>
            <option value="green">Emerald</option>
          </select>
          <button onClick={() => onDelete(house.id)} className="bg-red-500 text-white px-3 py-1 mt-2 w-full rounded">🗑️ Delete</button>
        </div>
      ))}
      <button onClick={() => onAdd({ name: 'New House', color: 'orange', floors: 3 })} className="bg-green-500 text-white px-4 py-2 mt-4 w-full rounded">🏠 Build a new house</button>
    </div>
  );
};

export default HouseControls;
