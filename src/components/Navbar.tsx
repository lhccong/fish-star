import {FC} from 'react'
import './Navbar.css'
import { menuConfig } from '../config/menu'
import { NavLink } from 'react-router-dom'

const Navbar: FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <img src="https://open-image.ws.126.net/14f091ff5a274eacb95dc28c3660e5c5.png" alt="FishStar"
                     className="logo"/>
            </div>
            <ul className="nav-links">
                {menuConfig.map((item, index) => (
                    <li key={index}>
                        <NavLink to={item.path} className={({ isActive }) => isActive ? 'active' : ''}>
                            <item.icon />
                            <span>{item.name}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className="user-actions">
                <button type="button" className="history-btn">
                    观看记录
                </button>
            </div>
        </nav>
    )
}

export default Navbar 