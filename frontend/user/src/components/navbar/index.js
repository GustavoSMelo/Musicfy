import React from 'react';
import logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';
import { FaSearch, FaThumbsUp, FaUserAlt } from 'react-icons/fa';
import { Container } from './styled';

function Navbar() {
    return (
        <Container>
            <figure>
                <img src={logo} alt="logo" />
            </figure>

            <nav className="link-container">
                <Link className="link" to="/">
                    <FaUserAlt /> <span>Profile</span>
                </Link>
                <Link className="link" to="/">
                    <FaSearch /> <span>Search</span>
                </Link>
                <Link className="link" to="/">
                    <FaThumbsUp /> <span>Likes</span>
                </Link>
            </nav>
        </Container>
    );
}

export default Navbar;