"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import HouseCard, { House } from "../components/HouseCard";
import HouseControls from "../components/HouseControls";

const fetchHouses = async (): Promise<House[]> => {
  return JSON.parse(localStorage.getItem("houses") || "[]");
};

export default function Home() {
  const queryClient = useQueryClient();

  const { data: houses = [] } = useQuery({
    queryKey: ["houses"],
    queryFn: fetchHouses,
  });

  const addHouseMutation = useMutation({
    mutationFn: async (house: Omit<House, "id">) => {
      const newHouse = { id: Date.now(), ...house };
      const updatedHouses = [...houses, newHouse];
      localStorage.setItem("houses", JSON.stringify(updatedHouses));
      return Promise.resolve(newHouse);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["houses"] }),
  });

  const updateHouseMutation = useMutation({
    mutationFn: async ({ id, updatedHouse }: { id: number; updatedHouse: Partial<House> }) => {
      const updatedHouses = houses.map((h) => (h.id === id ? { ...h, ...updatedHouse } : h));
      localStorage.setItem("houses", JSON.stringify(updatedHouses));
      return updatedHouses;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["houses"] }),
  });

  const deleteHouseMutation = useMutation({
    mutationFn: async (id: number) => {
      const updatedHouses = houses.filter((h) => h.id !== id);
      localStorage.setItem("houses", JSON.stringify(updatedHouses));
      return updatedHouses;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["houses"] }),
  });

  console.log('page');

  return (
    <div className="container mx-auto p-4 flex gap-8 items-start">
      <HouseControls
        houses={houses}
        onAdd={addHouseMutation.mutate}
        onUpdate={(id, updatedHouse) => updateHouseMutation.mutate({ id, updatedHouse })}
        onDelete={deleteHouseMutation.mutate}
      />
      <div className="flex gap-4 items-end h-100 overflow-x-auto p-10">
        {houses.map((house) => (
          <HouseCard key={house.id} house={house} />
        ))}
      </div>
    </div>
  );
}
