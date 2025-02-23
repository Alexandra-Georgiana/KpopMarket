import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import NavBar from "./NavBar";
import Cart from "../pages/Cart";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";	
import { FaUser } from "react-icons/fa";


const Heather = () => {
    const [menuOpened, setMenuOpened] = useState(false);
    const toggleMenu = () => setMenuOpened(!menuOpened);

    return (
        <header className="fixed top-0 left-0 w-full z-50 shadow-md">
            {/* Top Pink Bar */}
            <div className="bg-[#ea6397] text-white flex items-center justify-between px-4 py-3 max-xs:px-2">
                {/* Center Section - Logo */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <Link>
                        <img src={Logo} alt="Logo" height={50} width={150} />
                    </Link>
                </div>

                {/* Right Section - Cart & Login Icons */}
                <div className="flex items-center gap-x-6 ml-auto">
                    <NavLink to={"cart-pg"} className="relative flex hover:text-[#220772]">
                        <FaOpencart className="p-1 h-8 w-8" />
                        <span className="absolute -top-2 -right-2 flexCenter w-5 h-5 rounded-full bg-[#23071643] text-white text-xs">
                            0
                        </span>
                    </NavLink>
                    <NavLink to={"login"} className="flex hover:text-[#220772]">
                        <FaUser className="h-6 w-6" />
                    </NavLink>
                </div>

                {/* Navbar */}
                <div className={`fixed top-0 left-0 w-full h-full inset-0 bg-black/50 transition-opacity duration-300 ${menuOpened ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setMenuOpened(false)}>
                    <NavBar containerStyles={`${menuOpened ? "fixed top-0 gap-y-12 left-0 h-screen w-80 p-10 bg-white shadow-md medium-16 transition-transform duration-300 translate-x-0 flex flex-col border-l border-gray-300 " : "fixed top-0 gap-y-12 right-0 h-screen w-80 p-10 bg-white shadow-md medium-16 transition-transform duration-300 -right-[100%]"}`} />
                </div>
                {/* Button */}
                <div className="flexBetween sm:gap-x-6 bold-16">	
                    {!menuOpened? (
                        <MdMenu className="cursor-pointer absolute top left-4 hover:text-[#220772] mr-2 p-1 h-8 w-8" onClick={toggleMenu}/>
                        ) : (
                        <MdClose className="absolute top-5 left-5 text-gray-600 hover:text-black text-3xl" onClick={toggleMenu}/>)}
                </div>
            </div>
        </header>
    );
};

export default Heather;


