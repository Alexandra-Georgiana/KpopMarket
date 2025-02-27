import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Item from './Item';
import {SALE} from '../assets/mearch';

const Sale = () => {
  const [pgOpen, setPgOpen] = useState(false);
  const firstFour = SALE.slice(0, 4);

  return (
    <section className="pt-10">
      <div>
        <h3 className="text-[30px] flexCenter tracking-wide text-[#ea589c]">SALE</h3>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6">
          {firstFour.map((item) => (
            <div key={item.id} className="border border-[#f8d4da00] p-4">
              <Item {...item} />
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center mt-6">
            <NavLink to="/sale-pg">
                <button className="bg-[#ea589c] text-white px-4 py-2 rounded-md mt-4">
                    View All
                </button>
            </NavLink>
        </div>
        <div className="col-span-4 h-10"></div>
        </div>
    </section>
  );
};

export default Sale;
