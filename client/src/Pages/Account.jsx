import React from 'react'
import SideBar from '../Components/SideBar'
import AccountCompo from '../Components/AccountCompo'
export default function Account() {
  return (
    <div className='account'>
      <div>
        <SideBar/>
      </div>
      <div style={{width:"100%", height:"100vh"}}>
        <AccountCompo/>
      </div>
    </div>
  )
}
