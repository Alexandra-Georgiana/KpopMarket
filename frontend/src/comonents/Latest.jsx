import React from 'react'
import LATEST from '../assets/data'
import Item from './Item'
import { NavLink } from "react-router-dom"

const Latest = () => {
  return (
    <section className="pt-10">
        <div>
            <h3 className="text-[30px] flexCenter tracking-wide text-[#ea589c]">NEW THIS WEEK</h3>
            {/* Continer */}
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6">
                {LATEST.map((item) => (
                    <div key={item.id} className="border border-[#f8d4da00] p-4">
                    <Item id={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price} />
                    </div>                
                ))}
            </div>
        </div>

        <div className="flex flex-col items-center mt-6">
            <NavLink to="/late-pg">
                <button className="bg-[#ea589c] text-white px-4 py-2 rounded-md mt-4">
                    View All
                </button>
            </NavLink>
        </div>
    </section>
  )
}

export default Latest