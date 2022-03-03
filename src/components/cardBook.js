import React from 'react'
import { Link } from "react-router-dom";
import './cardBook.css'
export default function CardBook({ data, isPurchased, onBuy }) {
    const { imageLinks, title, authors } = data?.volumeInfo || {}
    return (
        <div className="card-container">
            <Link to={`/${data.id}`}>
                <img src={imageLinks?.thumbnail} alt={title} />
                <div className="card-detail">
                    <h2>{title}</h2>
                    <h3>{authors?.join(', ') || '-'}</h3>
                </div>
                {!isPurchased ?
                    (
                        <button onClick={onBuy}>Buy</button>
                    ) : (
                        <button disabled>Purchased</button>
                    )}
            </Link>
        </div>
    )
}
