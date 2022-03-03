import React, { Component, Fragment } from 'react'
import BookList from '../components/bookList'
import Header from '../components/header'
import Loading from '../components/loading'
import './purchased.css'
export default class Purchased extends Component {
    constructor(props) {
        super(props)
        this.state = {
            purchased: [],
            loading: true,
        }
    }

    firstFetch = async () => {
        const purchased = await localStorage.getItem('purchased')
        this.setState({ purchased: purchased ? JSON.parse(purchased) : [], loading: false })
    }

    componentDidMount = () => {
        this.firstFetch()
    }
    render() {
        return (
            <Fragment>
                <Header />
                <h1 className="title-purchased">Purchased</h1>
                {this.state.loading ? (
                    <Loading />
                ) : (
                    <BookList books={this.state.purchased} purchased={this.state.purchased} />
                )}
            </Fragment>
        )
    }
}
