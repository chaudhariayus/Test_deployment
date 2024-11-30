import React from 'react'
import { NavLink } from 'react-router-dom'
import { home_icon,appointment_icon, add_icon, people_icon } from '../../assets/assets_copy.js'

const Sidebar = () => {

  return (
    <div className='min-h-screen bg-white border-r'>
       {
            <ul className='text-[#515151] mt-5 '>
              <NavLink to={'/admin-dashboard'}  className={({ isActive }) => `flex items-center gap-3 px-9 py-3.5 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} >
                <img src={home_icon} alt="" />
                <p>Dashboard</p>
              </NavLink>
              <NavLink className={({ isActive }) => `flex items-center gap-3 px-9 py-3.5 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/admin_all-appointments'}>
                <img src={appointment_icon} alt="" />
                <p>Appointments</p>
              </NavLink>
              <NavLink className={({ isActive }) => `flex items-center gap-3 px-9 py-3.5 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/admin_add-doctor'}>
                <img src={add_icon} alt="" />
                <p>Verify Doctor</p>
              </NavLink>
              <NavLink className={({ isActive }) => `flex items-center gap-3 px-9 py-3.5 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/admin_doctor-list'}>
                <img src={people_icon} alt="" />
                <p>Doctors List</p>
              </NavLink>
            </ul>
       }
    </div>
  )
}

export default Sidebar
 