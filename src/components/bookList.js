import React from 'react'
import CardBook from './cardBook'
import './bookList.css'

export default function BookList({ books, onBuy, purchased }) {
    return (
        <div className="book-list-container">
            {books?.map((item, index) => (
                <CardBook data={item} key={index} onBuy={() => onBuy(item)} isPurchased={Boolean(purchased.find(_ => _.id === item.id))} />
            ))}
        </div>
    )
}
