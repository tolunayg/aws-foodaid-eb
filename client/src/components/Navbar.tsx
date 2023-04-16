import React from 'react'
import { NavLink } from 'react-router-dom'

interface INavbar {
    title?: string,
    color?: string,
    setState?: React.Dispatch<React.SetStateAction<boolean>>
}

function Navbar( item: INavbar ) {

  const newColor = item.color ? item.color : '#fa0000'

  return (
    <>
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to='/dashboard' style={{ color: newColor }} >{item.title ? item.title : 'App Title'}</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to='/dashboard'>Dashboard</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/profile'>Profile</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/settings'>Settings</NavLink>
                    </li>
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link disabled">Disabled</a>
                    </li>
                </ul>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                </div>
            </div>
            </nav>
    </>
  )
}

export default Navbar