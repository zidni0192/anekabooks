import React, { Component, Fragment } from 'react'
import BookList from '../components/bookList'
import Header from '../components/header'
import SearchBar from '../components/searchBar'
import { getBooks } from '../api/books'
import Loading from '../components/loading'
import './home.css'
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            query: "",
            balance: 100000,
            price: 25000,
            purchased: [],
            page: 0,
            loading: true,
            nextPage: false
        }
    }

    onChangeQuery = (query) => {
        this.setState({ query })
    }

    firstFetch = async () => {
        const purchased = await localStorage.getItem('purchased')
        const balance = await localStorage.getItem('balance')
        let data = await this.fetchBooks()
        this.setState({ purchased: purchased ? JSON.parse(purchased) : [], balance: balance === null ? 100000 : Number(balance), books: [...data.items], loading: false, page: 1 })
    }

    componentDidMount = () => {
        this.firstFetch()
        document.addEventListener('scroll', this.infiniteLoop)
    }

    onSearch = async (e) => {
        this.setState({ loading: true })
        e?.preventDefault()
        let data = await this.fetchBooks()
        this.setState({ books: [...data.items], page: 1, loading: false })
    }

    fetchBooks = async (isNextPage) => {
        let params = {}
        let data
        if (this.state.query && this.state.query !== "") {
            params.q = this.state.query
        }
        if (isNextPage) {
            params.skip = this.state.page * 10
        }
        data = await getBooks(params)
        return data
    }

    infiniteLoop = async () => {
        if (document.body.scrollHeight <= (window.innerHeight + window.scrollY) && !this.state.loading && !this.state.nextPage) {
            this.setState({ nextPage: true })
            let data = await this.fetchBooks(true)
            this.setState((currentState) => ({ books: [...currentState.books, ...data.items], page: currentState.page + 1, nextPage: false }))
        }
    }

    onBuy = (item) => {
        if (this.state.balance >= this.state.price) {
            this.setState((currentState) => ({ purchased: [...currentState.purchased, { ...item }], balance: currentState.balance - currentState.price }))
            localStorage.setItem('purchased', JSON.stringify([...this.state.purchased, { ...item }]))
            localStorage.setItem('balance', this.state.balance - this.state.price)
        } else {
            alert('Not enough balance')
        }
    }

    render() {
        return (
            <Fragment>
                <Header />
                <SearchBar onChangeQuery={this.onChangeQuery} onSearch={this.onSearch} />
                {this.state.loading ? (
                    <Loading />
                ) : (
                    <Fragment>
                        <div className="balance">
                            Balance : {this.state.balance}
                        </div>
                        <BookList books={this.state.books} onBuy={this.onBuy} purchased={this.state.purchased} />
                        {this.state.nextPage && (
                            <Loading />
                        )}
                    </Fragment>
                )}
            </Fragment>
        )
    }
}
