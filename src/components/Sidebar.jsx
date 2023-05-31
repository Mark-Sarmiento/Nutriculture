import React,{useState} from 'react'
import { UserAuth } from '../context/AuthContext';
import {RiDashboardFill, RiPlantFill,RiLogoutBoxRLine} from "react-icons/ri"
import {BsArrowLeftShort,BsPlusLg,BsChevronDown} from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import Protected from './Protected';

const Sidebar = ({children}) => {

  {/*LOGOUT FUNCTION */}
  const { logOut, user } = UserAuth();
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  {/*LOGOUT FUNCTION */}

  {/*Sidebar Function*/}
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const menuItem=[
    {
      path:"/dashboard",
      name:"Dashboard",
      icon:<RiDashboardFill/>
    },
    {
      path:"/addunit",
      name:"Add Unit",
      icon:<BsPlusLg />
    },
  ]
  {/*Sidebar */}
  return (
    <div className={`inline-flex `}>

      <div className={`bg-dark-purple h-screen p-5 pt-8 relative ${open ? "w-72" : "w-20"} ${!user && "hidden"} duration-300`}>
        <BsArrowLeftShort  className={`border border-dark-purple cursor-pointer bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 ${!open && "rotate-180"} duration-500`} onClick={()=>setOpen(!open)}/>
        <div className='inline-flex '>
          <img className={`${open && "rotate-[360deg]"} duration-500 mr-2 rounded-full bg-white bg-opacity-30  w-10 h-10  border shadow-lg shadow-blue-500/50`} src={`${user?.photoURL}`}/>
          <p className={`text-white origin-left text-xl font-medium  duration-300 ${!open && "scale-0"}`}>{user?.displayName}</p>
        </div>
        <div >
          {
          menuItem.map((item, index)=>(
            <NavLink to={item.path} key={index} className={`cursor-pointer text-gray-300 text-sm flex items-center gap-x-4  p-2 hover:bg-light-white rounded-md mt-2  `}>

              <div className={`text-2xl block float-left duration-500 ${!open && "rotate-[360deg]"}`}  >
                {item.icon}
              </div>

              <div className={`text-base font-medium flex-1 duration-300 ${!open &&"hidden"}`}>
                {item.name}
              </div>
            </NavLink>
            ))
          }
          
          <div className={`cursor-pointer text-gray-300 text-sm flex items-center gap-x-4  p-2 hover:bg-light-white rounded-md mt-2`} onClick={handleSignOut}>
            <RiLogoutBoxRLine className={`text-2xl block float-left duration-500 ${!open && "rotate-[360deg]"}`}/>
            <p className={`text-base font-medium flex-1 duration-300 ${!open &&"hidden"}`}>Logout</p>
          </div>
        
        </div>
        
      </div>

      <div>{children}</div>

      
    </div>
  )
}

export default Sidebar;

