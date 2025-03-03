import React, { useState, useEffect } from "react";
import { House } from "./HouseCard";
import { useQueryClient } from "@tanstack/react-query";

const HouseControlsItem = ({ houseId, onUpdate, onDelete }: { 
  houseId: number;
  onUpdate: (id: number, updatedHouse: Partial<House>) => void; 
  onDelete: (id: number) => void;
}) => {
  const queryClient = useQueryClient();
  const house = queryClient.getQueryData<House[]>(["houses"])?.find(h => h.id === houseId);

  const [floors, setFloors] = useState(house?.floors || 1);
  const [color, setColor] = useState(house?.color || "orange");

  useEffect(() => {
    if (house) {
      setFloors(house.floors);
      setColor(house.color);
    }
  }, [house]);

  if (!house) return null;

  return (
    <div className="p-2 border rounded mt-2">
      <div className="flex w-full justify-between items-center">
        <h3 className="text-md font-semibold">{house.name}</h3>
        <button onClick={() => onDelete(houseId)} className="bg-white px-2 py-1 mt-2 rounded border cursor-pointer">🗑️</button>
      </div>
      <label className="block mt-2">
        Floors:
        <input
          type="number"
          min="1"
          max="6"
          value={floors}
          onChange={e => {
            const value = Number(e.target.value);
            setFloors(value);
            onUpdate(houseId, { floors: value });
          }}
          className="ml-2 w-12 border p-1 rounded"
        />
      </label>
      <input
        type="range"
        min="1"
        max="6"
        value={floors}
        onChange={e => {
          const value = Number(e.target.value);
          setFloors(value);
          onUpdate(houseId, { floors: value });
        }}
        className="w-full mt-3"
      />
      <label className="block mt-2">Color:</label>
      <select 
        value={color} 
        onChange={e => {
          const value = e.target.value;
          setColor(value);
          onUpdate(houseId, { color: value });
        }} 
        className="w-full p-1 border rounded"
      >
        <option value="orange">Orange</option>
        <option value="#e32636">Alizarin</option>
        <option value="#8de2e7">Belize</option>
        <option value="#50C878">Emerald</option>
      </select>
    </div>
  );
};

export default React.memo(HouseControlsItem, (prevProps, nextProps) => prevProps.houseId === nextProps.houseId);
