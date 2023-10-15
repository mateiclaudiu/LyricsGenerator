// Footer.js
import React from 'react';
import './Footer.css'; // Make sure the path is correct based on your project structure

const Footer = () => {
    return (
        <footer className="App-footer">
            <p>© {new Date().getFullYear()} <a href="https://www.elimantwerpen.be/" target="_blank" rel="noopener noreferrer">Biserica Elim Antwerpen</a></p>
            <p>Pastoor Campensstraat 4, 2170 Antwerpen, Belgia</p>
            <p>Duminica ora 11.00-13.00</p>
            <p>creat de <a href="https://www.matei.be/" target="_blank" rel="noopener noreferrer">matei</a></p>
            {/* This ensures that the link opens in a new tab and is secure */}
        </footer>
    );
}

export default Footer;
