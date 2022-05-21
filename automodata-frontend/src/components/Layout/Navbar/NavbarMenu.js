import React from 'react';
import styles from './NavbarMenu.module.css';
import NavbarMenuItem from './NavbarMenuItem';
// import { Routes, Route, BrowserRouter as Router, NavLink } from 'react-router-dom';

const NavbarMenu = () => {
    return (
        <ul className={styles['navbar-menu']}>
            <NavbarMenuItem
                itemName="Compare"
                itemLink="/compare"
            />
            <NavbarMenuItem
                itemName="Dashboard"
                itemLink="/dashboard"
                isSelected={true}
            />
            <NavbarMenuItem
                itemName="Analytics"
                itemLink="/analytics"
            />
            <NavbarMenuItem
                itemName="Suggestives"
                itemLink="/suggestives"
            />
        </ul>
    );
}
export default NavbarMenu;