import React from "react";

export const BeerList = ({ beers }) => {
  return (
    <ol>
      {beers.map(beer => (
        <li key={beer.name}>{beer.name}</li>
      ))}
    </ol>
  );
};

export default BeerList;
