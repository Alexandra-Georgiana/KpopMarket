import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useState, useEffect } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { FaOpencart, FaUser } from "react-icons/fa";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Rewards from "./Rewards";
import Artists from "./Artists";
import { useCart } from "../comonents/CartContext"; 
import useSearch from "../comonents/SearchResults"; 
import artists from "../assets/artists";
import products from "../assets/mearch";


const Heather = () => {
    const [menuOpened, setMenuOpened] = useState(false);
    const [albumsOpen, setAlbumsOpen] = useState(false);
    const [merchOpen, setMerchOpen] = useState(false);
    const [rewardOpen, setRewardOpen] = useState(false);
    const [artistOpen, setArtistOpen] = useState(false);
    const { cartItems } = useCart(); 

    // Sample product list (replace with real data)
    // const products = [
    //     { id: 1, name: "Tote Bags", category: "album" },
    //     { id: 2, name: "Girl Group Album", category: "album" },
    //     { id: 3, name: "Sticker Pack", category: "merchandise" },
    //     { id: 4, name: "Tote Bag", category: "merchandise" },
    //     { id: 5, name: "Solo Artist Album", category: "album" },
    //     { id: 6, name: "Keychain", category: "merchandise" },
    //     // Add more products as needed
    // ];

    const { searchQuery, handleSearch, handleSearchSubmit, filteredProducts, filteredArtists } = useSearch(products, artists);

    // Calculate total quantity in the cart
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    const toggleMenu = () => {
        setMenuOpened(!menuOpened);
        setArtistOpen(false);
        setRewardOpen(false);
        setMerchOpen(false);
        setAlbumsOpen(false);
    };
    const toggleAlbums = () => setAlbumsOpen(!albumsOpen);
    const toggleMerch = () => setMerchOpen(!merchOpen);
    const toggleReward = () => {
        setRewardOpen(!rewardOpen);
        setArtistOpen(false);
    };
    const toggleArtist = () => {
        setArtistOpen(!artistOpen);
        setRewardOpen(false);
    };

    // Disable body scroll when the menu is open, and enable it when the menu is not
    useEffect(() => {
        if (menuOpened) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [menuOpened]);

    // Close the menu
    const closeMenu = () => {
        setMenuOpened(false);
        setArtistOpen(false);
        setRewardOpen(false);
    };


    return (
        <header className="fixed top-0 left-0 w-full z-50 shadow-md">
            <div className="bg-[#ea6397] text-white flex items-center justify-between px-4 max-xs:px-2">
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-20">
                    <NavLink to={'/'} className="font-bold">
                        <img src={Logo} alt="Logo" height={200} width={200} />
                    </NavLink>
                </div>
            </div>

            {/* Search Bar */}
            <div className="absolute left-10 transform px-4 py-2 flex justify-center mt-3">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    onKeyDown={handleSearchSubmit}
                    placeholder="Search for products..."
                    className="w-80 px-4 py-2 border border-gray-300 rounded-md text-black"
                />
            </div>

            {/* Conditional Rendering of Search Results */}
            {searchQuery && (
                <div className="absolute bg-[#ea6397e3] rounded-xl left-10 top-32 transform px-4 py-20 -mt-16 w-80">
                    {filteredProducts.length === 0 && filteredArtists.length === 0 ? (
                        <p className="text-white font-bold">No results found for "{searchQuery}"</p>
                    ) : (
                        <div>
                            <h2 className="font-bold text-white -mt-12">Search Results:</h2>
                            <ul className="text-white">
                                {filteredProducts.map((product, index) => (
                                    <li key={`product-${index}`}>{product}</li>
                                ))}
                                {filteredArtists.map((artist, index) => (
                                    <li key={`artist-${index}`}>{artist.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}



            <div className="bg-[#ea6397] text-white flex items-center justify-between px-4 py-6 max-xs:px-2">
                <div className="flex items-center gap-x-6 ml-auto">
                    <NavLink to={"cart-pg"} className="relative flex hover:text-[#220772]">
                        <FaOpencart className="p-1 h-8 w-8" />
                        <span className="absolute -top-2 -right-2 flexCenter w-5 h-5 rounded-full bg-[#23071643] text-white text-xs">{totalQuantity}</span>
                    </NavLink>
                    <NavLink to={"signup"} className="flex hover:text-[#220772]">
                        <FaUser className="h-6 w-6" />
                    </NavLink>
                </div>
                <div className="flexBetween sm:gap-x-6 bold-16">
                    {!menuOpened ? (
                        <MdMenu className="cursor-pointer absolute top left-4 hover:text-[#220772] mr-2 p-1 h-8 w-8" onClick={toggleMenu} />
                    ) : null}
                </div>
            </div>

            {/* Dark Overlay (Appears when menu is open) */}
            {menuOpened && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleMenu} 
                ></div>
            )}

            {/* Sidebar Menu */}
            <div className={`fixed top-0 left-0 w-80 h-screen bg-white shadow-md p-6 transition-transform duration-300 z-50 ${menuOpened ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex justify-end">
                    <button className="text-gray-600 hover:text-black text-2xl" onClick={toggleMenu}>
                        <MdClose />
                    </button>
                </div>
                
                <nav className="flex flex-col gap-y-4 text-[#ea6397]">
                    <NavLink to={'/'} className="font-bold">Home</NavLink>

                    {/* Albums Dropdown */}
                    <div>
                        <button onClick={toggleAlbums} className="flex justify-between w-full font-bold">ALBUMS {albumsOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}</button>
                        {albumsOpen && (
                            <div className="ml-4 flex flex-col gap-y-2 text-[#ec8ad1]">
                                <NavLink to={'/alb/boygroups'} className={"hover:text-[#ee22c5ee]"}>Boygroups</NavLink>
                                <NavLink to={'/alb/girlgroups'} className={"hover:text-[#ee22c5ee]"}>Girlgroups</NavLink>
                                <NavLink to={'/alb/ost'} className={"hover:text-[#ee22c5ee]"}>O.S.T</NavLink>
                                <NavLink to={'/alb/solo'} className={"hover:text-[#ee22c5ee]"}>Solo Artists</NavLink>
                                <NavLink to={'/alb/all'} className={"hover:text-[#ee22c5ee]"}>All Albums</NavLink>
                            </div>
                        )}
                    </div>

                    {/* Merchandise Dropdown */}
                    <div>
                        <button onClick={toggleMerch} className="flex justify-between w-full font-bold">MERCHANDISE {merchOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}</button>
                        {merchOpen && (
                            <div className="ml-4 flex flex-col gap-y-2 text-[#ec8ad1]">
                                <NavLink to={'/mrch/totebags'} className={"hover:text-[#ee22c5ee]"}>Tote Bags</NavLink>
                                <NavLink to={'/mrch/stickers'} className={"hover:text-[#ee22c5ee]"}>Stickers</NavLink>
                                <NavLink to={'/mrch/prints'} className={"hover:text-[#ee22c5ee]"}>Prints</NavLink>
                                <NavLink to={'/mrch/keychains'} className={"hover:text-[#ee22c5ee]"}>Keychains</NavLink>
                                <NavLink to={'/mrch/below10'} className={"hover:text-[#ee22c5ee]"}>Below 10€</NavLink>
                                <NavLink to={'/mrch/all'} className={"hover:text-[#ee22c5ee]"}>All Merchandise</NavLink>
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <button onClick={toggleArtist} className="font-bold text-left">ARTISTS</button>
                        {artistOpen && (
                            <div className="fixed left-80 top-0 mt-10 bg-white p-4 rounded-xl shadow-lg w-[1000px] h-[57vh] z-50 hide-scrollbar">
                                <button className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl" onClick={toggleArtist}>
                                    <MdClose />
                                </button>
                                <div className="mt-6 h-[70vh] overflow-y-auto overflow-x-hidden">
                                    <Artists closeMenu={closeMenu} />
                                </div>
                            </div>
                        )}
                    </div>
                    <NavLink to={'/sale-pg'} className="font-bold">SALE</NavLink>

                    {/* Rewards Section beside the menu */}
                    <div className="relative">
                        <button onClick={toggleReward} className="font-bold text-left">REWARDS</button>
                        {rewardOpen && (
                            <div className="fixed left-80 top-0 mt-10 bg-white p-4 rounded-xl shadow-lg w-[400px] h-[80vh] z-50 hide-scrollbar">
                                <button className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl" onClick={toggleReward}>
                                    <MdClose />
                                </button>
                                <div className="mt-6 h-[70vh] overflow-y-auto">
                                    <Rewards closeMenu={closeMenu}/>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Heather;
