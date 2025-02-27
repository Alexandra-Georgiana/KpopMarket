import { useState } from "react";
import Img from "../assets/Mimisky's.png";
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";


const Rewards = ({closeMenu}) => {

    const navigate = useNavigate();

    const handleClose = () => {
        closeMenu();
    }
    const handleNavigation = ()=>{
        closeMenu();
        navigate('/signup');
    }

    return (
        <div className="bg-gradient-to-b from-pink-300 to-white p-4 rounded-xl shadow-md w-full max-w-sm overflow-hidden hide-scrollbar">
            <div className="text-center">
                <h2 className="text-lg font-bold text-gray-900">
                    <img src={Img} alt="Mimisky's" className="inline-block" />
                </h2>
            </div>

            {/* Join Now Section */}
            <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
                <h3 className="font-bold text-gray-800">Join Now</h3>
                <p className="text-gray-600 text-sm">
                    Participate in our loyalty program to win rewards for every order you place in our shop 
                    or refer friends to receive vouchers and help us grow the K-Pop Community! :)
                </p>
                <button className="mt-4 w-full bg-pink-500 text-white py-2 rounded-lg font-bold" 
                    onClick={handleNavigation}>
                    Start Collecting
                </button>
                <p className="text-sm text-center mt-2 pointer-events-auto">
                    Already have an account?{" "} <NavLink to="/login" className="relative z-50 text-pink-500 hover:underline cursor-pointer " onClick={handleClose} >Log in</NavLink>
                </p>
            </div>

            {/* Star Points Section */}
            <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
                <h3 className="font-bold text-gray-800">Star Points</h3>
                <p className="text-gray-600 text-sm">
                    Earn "Star Points" for every order and exchange them for amazing rewards!
                </p>
                <p className="text-pink-500 font-bold mt-2 cursor-pointer">Ways to earn →</p>
            </div>
            {/* Vouchers */}
            <div className="bg-white p-4 rounded-lg shadow-sm mt-4"> 
                <h3 className="font-bold text-gray-800">Spill the Tea</h3>
                <h></h>
                    <p className="text-gray-600 text-sm">
                        Refer a friend, and they will get a voucher for their next purchase! For every friend you get to place an order, you get a voucher as well!
                    </p>
            </div>
        </div>
    );
};

export default Rewards;
