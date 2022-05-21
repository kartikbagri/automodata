import React from 'react';
import styles from './NavbarMenuItem.module.css';

const NavbarMenuItem = (props) => {
    return (
        <li className={`${styles['navbar-menu-item']} ${props.isSelected? styles['navbar-menu-item--selected']:''}`}>
            <a className={styles['navbar-menu-item-link']} href={props.itemLink}>
                {props.itemName}
            </a>
        </li>
    );
}

export default NavbarMenuItem;