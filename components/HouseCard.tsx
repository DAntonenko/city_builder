// import React from 'react';

// export interface House {
//   id: number;
//   name: string;
//   color: string;
//   floors: number;
// }

// const HouseCard = ({ house }: { house: House; onDelete: (id: number) => void }) => {
//   return (
//     <div className="flex flex-col items-center">
//       <svg width="100" height={house.floors * 40 + 40} viewBox="0 0 100 300">
//         {/* Roof */}
//         <polygon points="50,0 100,40 0,40" fill="white" stroke="black" strokeWidth="2" />
//         {/* Body */}
//         <rect x="0" y="40" width="100" height={house.floors * 40} fill={house.color} stroke="black" strokeWidth="2" />
//         {/* Windows */}
//         {Array.from({ length: house.floors * 2 }).map((_, i) => (
//           <rect key={i} x={i % 2 === 0 ? 10 : 60} y={50 + Math.floor(i / 2) * 40} width="25" height="25" fill="white" stroke="black" strokeWidth="2" />
//         ))}
//         {/* Door */}
//         <rect x="35" y={house.floors * 40 + 10} width="30" height="40" fill="black" stroke="black" strokeWidth="2" />
//       </svg>
//     </div>
//   );
// };

// export default HouseCard;

import React from 'react';

export interface House {
  id: number;
  name: string;
  color: string;
  floors: number;
}

const HouseCard = ({ house }: { house: House; onDelete: (id: number) => void }) => {
  const houseWidth = 120; // Fixed width for all houses
  const floorHeight = 45; // Fixed height per floor
  const houseHeight = house.floors * floorHeight + 40; // Total height including roof

  return (
    <div className="flex flex-col items-center">
      <svg width={houseWidth} height={houseHeight} viewBox={`0 0 ${houseWidth} ${houseHeight}`}>
        {/* Roof - Fixed size */}
        <polygon points={`${houseWidth / 2},0 ${houseWidth},40 0,40`} fill="white" stroke="black" strokeWidth="2" />
        {/* Body - Fixed width, dynamic height */}
        <rect x="0" y="40" width={houseWidth} height={house.floors * floorHeight} fill={house.color} stroke="black" strokeWidth="2" />
        {/* Windows - Fixed size and placement */}
        {Array.from({ length: house.floors * 2 }).map((_, i) => (
          <rect key={i} x={i % 2 === 0 ? 20 : 70} y={50 + Math.floor(i / 2) * floorHeight} width="18" height="23" fill="white" stroke="black" strokeWidth="2" />
        ))}
        {/* Door - Fixed size and placement */}
        <rect x="65" y={house.floors * floorHeight + 2} width="30" height="38" fill="white" stroke="black" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default HouseCard;
