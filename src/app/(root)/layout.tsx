import React from 'react'
import Sidebar from '../../../components/shared/Sidebar';
import MobileNav from '../../../components/shared/MobileNav';

const Layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) =>{
  return (
    <div className='root'>
        <Sidebar></Sidebar>
        <MobileNav></MobileNav>
        <div className='root-container'>
            <div className='wrapper'>
                {children }
            </div>
        </div>
    </div>
  )
}

export default Layout;