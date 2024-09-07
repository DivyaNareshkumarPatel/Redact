import React from 'react'
import SideBar from '../Components/SideBar'
import UploadComponent from '../Components/UploadComponent'
export default function Uploads() {
  return (
    <div className='upload'>
      <div>
        <SideBar/>
      </div>
      <div className='uComponent'>
        <UploadComponent/>
      </div>
    </div>
  )
}
