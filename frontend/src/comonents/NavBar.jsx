import { NavLink } from "react-router-dom"
import {MdHomeFilled} from "react-icons/md"

const NavBar = ({containerStyles}) => {
  return (
    <div className=" bg-white text-tertiary p-4 flexBetween py-3 max-xs:px-2">
         <nav className= {`${containerStyles}`}>
            <NavLink to={'/'} className={(isActive)=>isActive ? "active_link" : ""}><div className="flexCenter gap-x-1"> <MdHomeFilled />Home</div></NavLink>
            <NavLink to={'/alb'} className={(isActive)=>isActive ? "active_link" : ""}><div className="flexCenter gap-x-1"> ALBUMS</div></NavLink>
            <NavLink to={'/mrch'} className={(isActive)=>isActive ? "active_link" : ""}><div className="flexCenter gap-x-1"> MERCHANDISE</div></NavLink>
            <NavLink to={'/art'} className={(isActive)=>isActive ? "active_link" : ""}><div className="flexCenter gap-x-1"> ARTISTS</div></NavLink>
            <NavLink to={'/sale'} className={(isActive)=>isActive ? "active_link" : ""}><div className="flexCenter gap-x-1"> SALE</div></NavLink>
            <NavLink to={'/cstm'} className={(isActive)=>isActive ? "active_link" : ""}><div className="flexCenter gap-x-1"> CUSTOM</div></NavLink>
            <NavLink to={'/rwd'} className={(isActive)=>isActive ? "active_link" : ""}><div className="flexCenter gap-x-1"> SALE</div></NavLink>
        </nav>
    </div>
   
  )
}

export default NavBar