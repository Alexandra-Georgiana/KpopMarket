import { POPULAR } from "../assets/popular"
import Item from "./Item"
import React from 'react'

const Popular = () => {
  return (
    <section className="pt-10">
        <div>
            <h3 className="text-[30px] flexCenter tracking-wide text-[#ea589c]">Popular Products</h3>
            {/* Continer */}
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6">
                {POPULAR.map((item) => (
                    <div key={item.id} className="border border-[#f8d4da00] p-4">
                    <Item id={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price} />
                    </div>                
                ))}
            </div>
        </div>
    </section>
  )
}

export default Popular