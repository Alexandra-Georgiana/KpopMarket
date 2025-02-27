import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import mearchData from "../assets/mearch";
import NotFound from "../assets/NotFound.png";
import Item from "../comonents/Item"; 

const Mearch = () => {
  const { category } = useParams();
  const [mearch, setMearch] = useState([]);
  const [isCategoryFound, setIsCategoryFound] = useState(true);
  const [sortBy, setSortBy] = useState("nameAsc");
  const [maxPrice, setMaxPrice] = useState(100);

  useEffect(() => {
    if (mearchData.hasOwnProperty(category)) {
      setMearch(mearchData[category]);
      setIsCategoryFound(true);
    } else {
      setIsCategoryFound(false);
      setMearch([]);
    }
  }, [category]);

  const handleSort = () => {
    let sortedMearch = [...mearch];
    switch (sortBy) {
      case "nameAsc":
        sortedMearch.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameDesc":
        sortedMearch.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "priceLowHigh":
        sortedMearch.sort((a, b) => parseFloat(a.new_price.slice(1)) - parseFloat(b.new_price.slice(1)));
        break;
      case "priceHighLow":
        sortedMearch.sort((a, b) => parseFloat(b.new_price.slice(1)) - parseFloat(a.new_price.slice(1)));
        break;
      default:
        break;
    }
    return sortedMearch;
  };

  const filteredMearch = handleSort().filter(item => parseFloat(item.new_price.slice(1)) <= maxPrice);

  return (
    <div className="pt-20 px-4 flex">
      {isCategoryFound && filteredMearch.length > 0 && (
        <div className="w-[230px] p-4 bg-pink-100 rounded-lg shadow-md">
          <div className = "fixed ">
            <h2 className="text-xl font-semibold mb-4">Filter & Sort</h2>

            {/* Price Range */}
            <label className="block font-medium">Price Range</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(e.target.value)} 
              className="w-full mt-1"
            />
            <p>Price: $0 - ${maxPrice}</p>

            {/* Sorting Options */}
            <div className="mt-4">
              <label className="block font-medium">Sort By</label>
              <div className="flex flex-col mt-2">
                <label><input type="radio" name="sort" value="nameAsc" checked={sortBy === "nameAsc"} onChange={() => setSortBy("nameAsc")} /> Alphabetical (A-Z)</label>
                <label><input type="radio" name="sort" value="nameDesc" checked={sortBy === "nameDesc"} onChange={() => setSortBy("nameDesc")} /> Alphabetical (Z-A)</label>
                <label><input type="radio" name="sort" value="priceLowHigh" checked={sortBy === "priceLowHigh"} onChange={() => setSortBy("priceLowHigh")} /> Price (Low to High)</label>
                <label><input type="radio" name="sort" value="priceHighLow" checked={sortBy === "priceHighLow"} onChange={() => setSortBy("priceHighLow")} /> Price (High to Low)</label>
              </div>
            </div>
          </div>  
        </div>
      )}

      {/* Display Merch Items or Not Found Message */}
      <div className="flex-1 p-4">
        {!isCategoryFound ? (
          <div className="flex flex-col justify-center items-center h-[60vh] w-full bg-gradient-to-r from-[#f1e3eb] to-[#e48aa8] p-4 rounded-lg">
            <img src={NotFound} alt="Not Found" className="mb-0" />
            <p className="text-[#3812a1cc] text-4xl font-bold text-center leading-none">Category not found :(</p>
          </div>
        ) : filteredMearch.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-[60vh] w-full bg-gradient-to-r from-[#f1e3eb] to-[#e48aa8] p-4 rounded-lg">
            <img src={NotFound} alt="No Items" className="mb-0" />
            <p className="text-[#3812a1cc] text-4xl font-bold text-center leading-none">No items available yet.</p>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-semibold text-pink-900 mb-4 text-center">
              {category.replace(/\b\w/g, (char) => char.toUpperCase())} Items
            </h1>
            <div className="grid grid-cols-3 gap-4">
              {filteredMearch.map((item) => (
                <Item key={item.id} {...item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mearch;
