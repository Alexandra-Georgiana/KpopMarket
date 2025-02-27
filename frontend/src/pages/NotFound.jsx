import React from 'react'
import Not from "../assets/NotFound.png";

const NotFound = () => {
  return (
    <div className="pt-20 px-4 flex">
        <div className="flex flex-col justify-center items-center h-[60vh] w-full bg-gradient-to-r from-[#f1e3eb] to-[#e48aa8] p-4 rounded-lg">
        <img src={Not} alt="Not Found" className="mb-0" />
        <p className="text-[#3812a1cc] text-4xl font-bold text-center leading-none">
            No products matched that :(
        </p>
        </div>
    </div>
  )
}

export default NotFound