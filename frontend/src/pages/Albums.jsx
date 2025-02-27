import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import albumsData from "../assets/albums"; 
import NotFound from "../assets/NotFound.png";

const Albums = () => {
  const { category } = useParams();
  const [albums, setAlbums] = useState([]);
  const [isCategoryFound, setIsCategoryFound] = useState(true);
  const [sortBy, setSortBy] = useState("nameAsc");
  const [maxPrice, setMaxPrice] = useState(100);

  useEffect(() => {
    if (albumsData.hasOwnProperty(category)) {
      setAlbums(albumsData[category]);
      setIsCategoryFound(true);
    } else {
      setIsCategoryFound(false);
      setAlbums([]);
    }
  }, [category]);

  const handleSort = (albums) => {
    let sortedAlbums = [...albums];
    switch (sortBy) {
      case "nameAsc":
        sortedAlbums.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameDesc":
        sortedAlbums.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "artistAsc":
        sortedAlbums.sort((a, b) => a.artists.localeCompare(b.artists));
        break;
      case "artistDesc":
        sortedAlbums.sort((a, b) => b.artists.localeCompare(a.artists));
        break;
      case "priceLowHigh":
        sortedAlbums.sort((a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)));
        break;
      case "priceHighLow":
        sortedAlbums.sort((a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1)));
        break;
      default:
        break;
    }
    return sortedAlbums;
  };

  const filteredAlbums = handleSort(albums.filter(album => parseFloat(album.price.slice(1)) <= maxPrice));

  return (
    <div className="pt-20 px-4 flex">
      {/* Show Filter & Sort only if there are albums in the category */}
      {isCategoryFound && filteredAlbums.length > 0 && (
        <div className="w-[230px] p-4 bg-pink-100 rounded-lg shadow-md">
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
              <label><input type="radio" name="sort" value="artistAsc" checked={sortBy === "artistAsc"} onChange={() => setSortBy("artistAsc")} /> Artist (A-Z)</label>
              <label><input type="radio" name="sort" value="artistDesc" checked={sortBy === "artistDesc"} onChange={() => setSortBy("artistDesc")} /> Artist (Z-A)</label>
              <label><input type="radio" name="sort" value="priceLowHigh" checked={sortBy === "priceLowHigh"} onChange={() => setSortBy("priceLowHigh")} /> Price (Low to High)</label>
              <label><input type="radio" name="sort" value="priceHighLow" checked={sortBy === "priceHighLow"} onChange={() => setSortBy("priceHighLow")} /> Price (High to Low)</label>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 p-4">
        {!isCategoryFound ? (
          <div className="flex flex-col justify-center items-center h-[60vh] w-full bg-gradient-to-r from-[#f1e3eb] to-[#e48aa8] p-4 rounded-lg">
            <img src={NotFound} alt="Not Found" className="mb-0" />
            <p className="text-[#3812a1cc] text-4xl font-bold text-center leading-none">Category not found :(</p>
          </div>
        ) : filteredAlbums.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-[60vh] w-full bg-gradient-to-r from-[#f1e3eb] to-[#e48aa8] p-4 rounded-lg">
            <img src={NotFound} alt="No Albums" className="mb-0" />
            <p className="text-[#3812a1cc] text-4xl font-bold text-center leading-none">No albums available yet.</p>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-semibold text-pink-900 mb-4 text-center">
              {category.replace(/\b\w/g, (char) => char.toUpperCase())} Albums
            </h1>
            <div className="grid grid-cols-3 gap-4">
              {filteredAlbums.map((album) => (
                <div key={album.id} className="border p-4 bg-white shadow-lg rounded-lg">
                  <img src={album.image} alt={album.name} className="w-full h-48 object-cover rounded-md" />
                  <h2 className="text-lg font-semibold mt-2">{album.name}</h2>
                  <p className="text-sm text-gray-600">Artist: {album.artists}</p>
                  <p className="text-lg font-bold text-pink-600">{album.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Albums;
