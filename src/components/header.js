import React from 'react'
import './header.css'
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <Link to="/">
                <h1 className="title">Aneka Books</h1>
            </Link>
            <div className="menu">
                <Link to="/">Home</Link>
                <Link to="/purchased">Purchased</Link>
            </div>
        </header>
    )
}
