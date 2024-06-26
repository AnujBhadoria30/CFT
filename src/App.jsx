import React, { useEffect, useState } from 'react';
import MyContext from './Context';
import Card from './Card';
import './App.css';
import { CiSearch } from "react-icons/ci";

export default function App() {
  const [itemList, setItemList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function getData() {
      let data = await fetch('https://jsonplaceholder.typicode.com/posts');
      data = await data.json();
      setItemList(data);
      let countPages = Math.ceil(data.length / 6);
      setTotalPages(new Array(countPages).fill(null));
    }
    getData();
  }, []);

  useEffect(() => {
    setCurrentPage(1); 
  }, [searchTerm]);

  function handleCurrentPage(page) {
    setCurrentPage(page);
  }

  function handleSearch(e) {
    setSearchTerm(e.target.value);
  }

  function handleDelete(id) {
    const updatedItemList = itemList.filter(item => item.id !== id);
    setItemList(updatedItemList);
  }

  return (
    <>
      <div className='sizing'>
        <div className='SearchBar '>
          <div>
          <CiSearch className='icon' />


          </div>
          <input
            type='text'
            placeholder='Search posts...'
            value={searchTerm}
            onChange={handleSearch}
            className='bdr'
          />
        </div>
      </div>

      <div className='Container'>
        <MyContext.Provider value={[itemList, setItemList]}>
          {itemList
            .filter(
              item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.body.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map(item => (
              <Card
                id={item.id}
                title={item.title}
                body={item.body}
                key={item.id}
                onDelete={handleDelete} 
              />
            ))}
        </MyContext.Provider>
      </div>

      <div className='Pagination'>
        {totalPages.map((_, index) => (
          <span key={index} onClick={() => handleCurrentPage(index + 1)}>
            {index + 1}
          </span>
        ))}
      </div>
    </>
  );
}
