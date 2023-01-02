import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { MdOutlineHome, MdOutlineHistory, MdOutlineAddCircleOutline, MdAccountBalanceWallet, MdSearch } from "react-icons/md";
import './index.css'
const AppLayout = () => {
    return (
        <>
            <nav className='navbar fixed-bottom bg-dark justify-content-between' style={{ height: '65px' }}>
                <div className='row mx-1 w-100'>
                    <div className="col text-center text-sm"><Link className='nav-link' to={'/'} ><MdOutlineHome fontSize={25} className="mx-auto" />Home</Link></div>
                    <div className="col text-center text-sm"><Link className='nav-link' to={'/transactions'} ><MdOutlineHistory fontSize={25} className="mx-auto" />Transactions</Link></div>
                    <div className="col text-center text-sm">
                        <Link className='nav-link' to={'/accounts'} ><MdAccountBalanceWallet fontSize={25} className="mx-auto" />Accounts</Link>
                    </div>
                </div>
            </nav>
            <div className="">
                <Outlet />
            </div >
        </>




    )
}

export default AppLayout