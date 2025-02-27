import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Item from "../comonents/Item";
import NotFound from "../assets/NotFound.png";
import artists from "../assets/artists"; 

const ArtistProducts = () => {
  const { artistName } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isArtistFound, setIsArtistFound] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]); 
  const [sortOption, setSortOption] = useState("priceDesc");

  useEffect(() => {
    const artistData = artists.find(
      (artist) => artist.name.toLowerCase() === artistName.toLowerCase()
    );

    if (artistData) {
      setIsArtistFound(true);
      setProducts(artistData.products); 
    } else {
      setIsArtistFound(false); 
      setProducts([]); 
    }
  }, [artistName]);

  // Filter products based on price range
  const filterByPrice = (products) => {
    return products.filter((product) => {
      const price = parseFloat(product.new_price.replace("$", ""));
      return price >= priceRange[0] && price <= priceRange[1];
    });
  };

  // Sort products based on the selected option
  const sortProducts = (products) => {
    switch (sortOption) {
      case "alphabeticalAsc":
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case "alphabeticalDesc":
        return [...products].sort((a, b) => b.name.localeCompare(a.name));
      case "priceAsc":
        return [...products].sort(
          (a, b) => parseFloat(a.new_price.replace("$", "")) - parseFloat(b.new_price.replace("$", ""))
        );
      case "priceDesc":
        return [...products].sort(
          (a, b) => parseFloat(b.new_price.replace("$", "")) - parseFloat(a.new_price.replace("$", ""))
        );
      default:
        return products;
    }
  };

  // Apply filters and sorting
  useEffect(() => {
    let filtered = filterByPrice(products);
    filtered = sortProducts(filtered);
    setFilteredProducts(filtered);
  }, [products, priceRange, sortOption]);

  return (
    <div className="pt-20 px-4 flex">
      {!isArtistFound ? (
        <div className="flex flex-col justify-center items-center h-[60vh] w-full bg-gradient-to-r from-[#f1e3eb] to-[#e48aa8] p-4 rounded-lg">
          <img src={NotFound} alt="Not Found" className="mb-0" />
          <p className="text-[#3812a1cc] text-4xl font-bold text-center leading-none">
            Sorry, not in stock right now :(
          </p>
        </div>
      ) : (
        <>
          {/* Filtering Sidebar */}
          <div className="w-[230px] p-4 bg-pink-100 rounded-lg shadow-md">
            <div className = "fixed ">
              <h2 className="text-xl font-semibold mb-4">Filter & Sort</h2>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-lg font-semibold mb-3">Price Range</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
                <p>Price: ${priceRange[0]} - ${priceRange[1]}</p>
              </div>

              {/* Sorting Options */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Sort By</h3>
                <label className="block mb-2">
                  <input type="radio" value="alphabeticalAsc" checked={sortOption === "alphabeticalAsc"} onChange={() => setSortOption("alphabeticalAsc")} />
                  Alphabetical (A-Z)
                </label>
                <label className="block mb-2">
                  <input type="radio" value="priceAsc" checked={sortOption === "priceAsc"} onChange={() => setSortOption("priceAsc")} />
                  Price (Low to High)
                </label>
                <label className="block mb-2">
                  <input type="radio" value="priceDesc" checked={sortOption === "priceDesc"} onChange={() => setSortOption("priceDesc")} />
                  Price (High to Low)
                </label>
                <label className="block mb-2">
                  <input type="radio" value="alphabeticalDesc" checked={sortOption === "alphabeticalDesc"} onChange={() => setSortOption("alphabeticalDesc")} />
                  Alphabetical (Z-A)
                </label>
              </div>
            </div>  
          </div>

          {/* Product Grid */}
          <div className="flex-1 p-4">
            <h1 className="text-3xl font-semibold text-pink-900 mb-4 text-center">{artistName} Products</h1>
            {filteredProducts.length === 0 ? (
              <p className="text-pink-600 text-2xl font-bold text-center">No products available at the moment.</p>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <Item key={product.id} {...product} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ArtistProducts;
