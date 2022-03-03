import React from 'react'
import './searchBar.css'
export default function SearchBar({ onChangeQuery, onSearch }) {
    return (
        <form onSubmit={onSearch} className="form-search">
            <input onChange={(e) => { onChangeQuery(e.target.value) }} />
            <button>
                Cari Buku
            </button>
        </form>
    )
}
