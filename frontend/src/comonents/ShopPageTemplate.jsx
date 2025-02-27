import React, { useState, useEffect } from "react";
import NotFound from "../assets/NotFound.png";
import Item from "../comonents/Item"; 

const ShopPageTemplate = ({ items, title }) => {
  const [displayItems, setDisplayItems] = useState([]);
  const [sortBy, setSortBy] = useState("nameAsc");
  const [maxPrice, setMaxPrice] = useState(100);

  useEffect(() => {
    setDisplayItems(items); // Load items on mount
  }, [items]);

  const parsePrice = (price) => (typeof price === "string" ? parseFloat(price.slice(1)) : Number(price));

  // Sorting function
  const handleSort = () => {
    let sortedItems = [...displayItems];
    switch (sortBy) {
      case "nameAsc":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameDesc":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "priceLowHigh":
        sortedItems.sort((a, b) => parsePrice(a.new_price) - parsePrice(b.new_price));
        break;
      case "priceHighLow":
        sortedItems.sort((a, b) => parsePrice(b.new_price) - parsePrice(a.new_price));
        break;
      default:
        break;
    }
    return sortedItems;
  };

  const filteredItems = handleSort().filter((item) => parsePrice(item.new_price) <= maxPrice);

  return (
      <div className="pt-20 px-4 flex">
        {filteredItems.length > 0 && (
          <div className="w-[230px] p-4 bg-pink-100 rounded-lg shadow-md">
              <div className="fixed">
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
                    <label><input type="radio" name="sort" value="nameAsc" checked={sortBy === "nameAsc"} onChange={() => setSortBy("nameAsc")} /> A-Z</label>
                    <label><input type="radio" name="sort" value="nameDesc" checked={sortBy === "nameDesc"} onChange={() => setSortBy("nameDesc")} /> Z-A</label>
                    <label><input type="radio" name="sort" value="priceLowHigh" checked={sortBy === "priceLowHigh"} onChange={() => setSortBy("priceLowHigh")} /> Price: Low to High</label>
                    <label><input type="radio" name="sort" value="priceHighLow" checked={sortBy === "priceHighLow"} onChange={() => setSortBy("priceHighLow")} /> Price: High to Low</label>
                </div>
              </div>
            </div>  
        </div>
      )}

      {/* Display Items or Not Found */}
      <div className="flex-1 p-4">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-[60vh] w-full bg-gradient-to-r from-[#f1e3eb] to-[#e48aa8] p-4 rounded-lg">
            <img src={NotFound} alt="No Items" className="mb-0" />
            <p className="text-[#3812a1cc] text-4xl font-bold text-center leading-none">No items at the moment.</p>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-semibold text-pink-900 mb-4 text-center">
              {title}
            </h1>
            <div className="grid grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <Item key={item.id} {...item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPageTemplate;
