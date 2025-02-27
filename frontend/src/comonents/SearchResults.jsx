import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom"; 

const useSearch = (mearch, artists) => {
    const [searchQuery, setSearchQuery] = useState(""); 
    const navigate = useNavigate(); 

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const trimmedQuery = searchQuery.toLowerCase().trim();

            // Find the products that match 
            const matchedProduct = Object.keys(mearch).find(product =>
                    product.toString().toLowerCase().includes(trimmedQuery)
                );

            // Find the artists that match t
            const matchedArtist = Object.values(artists)
                .flat()
                .find((artist) =>
                    artist.name.toLowerCase().includes(trimmedQuery)
                );

            //Redirect to the product page
            if (matchedProduct) {
                navigate(`/mrch/${matchedProduct}`); 
            } else if (matchedArtist) {
                navigate(`/artist/${matchedArtist.name}`); 
            } else {
                navigate(`/not_found`); 
            }
            setSearchQuery("");
        }
    };

    // Filter products 
    const filteredProducts = useMemo(() => {
      if (!searchQuery) return [];

      // Filter categories 
      const filteredCategories = Object.keys(mearch)
          .filter((category) => {
              return category.toLowerCase().includes(searchQuery.toLowerCase().trim());
          });
  
      return filteredCategories;
  }, [searchQuery, mearch]);
  
  

    // Filter artists 
    const filteredArtists = useMemo(() => {
    if (!searchQuery) return [];

    const filtered = Object.values(artists)
        .flat()
        .filter((artist) =>
            artist.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
        );


    return filtered;
}, [searchQuery, artists]);


    return { searchQuery, handleSearch, handleSearchSubmit, filteredProducts, filteredArtists };
};

export default useSearch;
