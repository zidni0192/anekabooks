import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDetailBook } from '../api/books'
import Header from '../components/header'
import Loading from '../components/loading'
import './detail.css'

export default function Detail() {
    const [data, setData] = useState({})
    const [purchased, setPurchased] = useState([])
    const [balance, setBalance] = useState(100000)
    const [loading, setLoading] = useState(true)
    const { imageLinks, title, authors, publisher, industryIdentifiers, description } = data?.volumeInfo || {}
    const isbn = industryIdentifiers || []

    const { id } = useParams()

    const onBuy = () => {
        if (this.state.balance >= this.state.price) {
            setPurchased([...purchased, { ...data }])
            localStorage.setItem('purchased', JSON.stringify([...this.state.purchased, { ...data }]))
            localStorage.setItem('balance', this.state.balance - this.state.price)
        } else {
            alert('Not enough balance')
        }
    }
    useEffect(() => {
        const firstFetch = async () => {
            const tempPurchased = await localStorage.getItem('purchased')
            setPurchased(tempPurchased ? JSON.parse(tempPurchased) : [])
            const balance = await localStorage.getItem('balance')
            setBalance(balance === null ? 100000 : Number(balance))

            let data = await getDetailBook(id)
            if (!data.error) {
                setData(data)
            }
            setLoading(false)
        }
        if (id) {
            firstFetch()
        }
    }, [id])

    return (
        <Fragment>
            <Header />
            <div className="balance">
                Balance : {balance}
            </div>
            {
                loading ? (<Loading />) :
                    data.id ?
                        (
                            <div className="detail-container">
                                <div>
                                    <img src={imageLinks?.thumbnail} alt={title} />
                                    <div className="card-detail">
                                        <h2>Title : {title}</h2>
                                        <p>Authors : {authors?.join(', ') || '-'}</p>
                                        <p>Publisher : {publisher || '-'}</p>
                                        {isbn?.map((item, i) => (
                                            <p key={i}>{item.type} : {item.identifier}</p>
                                        ))}
                                        <p>Price : 25000</p>
                                        <p>Description : {description}</p>
                                    </div>
                                    {!Boolean(purchased.find(item => item.id === id)) ?
                                        (
                                            <button onClick={onBuy}>Buy</button>
                                        ) : (
                                            <button disabled>Purchased</button>
                                        )}
                                </div>
                            </div>
                        )
                        : (
                            <h3>
                                Data not found
                            </h3>
                        )
            }
        </Fragment>
    )
}

