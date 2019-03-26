import React from "react";

export const BeerList = ({ beers }) => {
  return (
    <ol>
      {beers.map(beer => (
        <li>{beer.name}</li>
      ))}
    </ol>
  );
};

export default BeerList;
