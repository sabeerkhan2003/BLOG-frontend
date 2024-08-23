import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState({ key: '', direction: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        axios.get("https://blog-backend-axvl.onrender.com/blogs")
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);
    
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this blog post?");
        if (confirmDelete) {
            axios.delete(`https://blog-backend-axvl.onrender.com/blogs/${id}`)
                .then(() => {
                    setData(data.filter(item => item.ID !== id));
                    alert("Blog post deleted successfully!");
                })
                .catch(err => console.log(err));
        }
    };

    const handleSort = (key) => {
        const direction = sortOrder.key === key && sortOrder.direction === 'asc' ? 'desc' : 'asc';
        const sortedData = [...data].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        setSortOrder({ key, direction });
        setData(sortedData);
    };

    const filteredData = data.filter(item => 
        item.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-4">
            <h1 className="text-4xl font-bold mb-4 text-center">Welcome to the Blog Management System</h1>
            <p className="text-lg mb-8 max-w-xl text-center">
                Manage your blog posts efficiently. Create, read, update, and delete blog entries. Use the search feature to filter results, and click on the column headers to sort by Title or Author.
            </p>
            
            <div className="mb-6 w-full flex flex-col sm:flex-row justify-between items-center">
                <input
                    type="text"
                    placeholder="Search by title or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-xs py-2 px-4 mb-4 sm:mb-0 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 text-gray-800"
                />
                <Link 
                    to="/Create" 
                    className="bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-gradient-to-l hover:from-blue-600 hover:to-blue-800 text-white py-2 px-6 rounded-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
                >
                    Create New Blog Post
                </Link>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="min-w-full bg-white text-gray-800 shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
                        <tr>
                            <th 
                                className="py-3 px-4 sm:px-6 text-left cursor-pointer"
                                onClick={() => handleSort('ID')}
                            >
                                ID {sortOrder.key === 'ID' && (sortOrder.direction === 'asc' ? '▲' : '▼')}
                            </th>
                            <th 
                                className="py-3 px-4 sm:px-6 text-left cursor-pointer"
                                onClick={() => handleSort('Title')}
                            >
                                Title {sortOrder.key === 'Title' && (sortOrder.direction === 'asc' ? '▲' : '▼')}
                            </th>
                            <th 
                                className="py-3 px-4 sm:px-6 text-left cursor-pointer"
                                onClick={() => handleSort('Author')}
                            >
                                Author {sortOrder.key === 'Author' && (sortOrder.direction === 'asc' ? '▲' : '▼')}
                            </th>
                            <th className="py-3 px-4 sm:px-6 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {currentItems.map((item, index) => (
                            <tr
                                key={item.ID}
                                className={`${
                                    index % 2 === 0 ? 'bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200' : 'bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300'
                                } border-b border-gray-200 hover:bg-indigo-100 transition-colors`}
                            >
                                <td className="py-3 px-4 sm:px-6">{item.ID}</td>
                                <td className="py-3 px-4 sm:px-6">{item.Title}</td>
                                <td className="py-3 px-4 sm:px-6">{item.Author}</td>
                                <td className="py-3 px-4 sm:px-6 flex items-center space-x-4">
                                    <Link 
                                        to={`/edit/${item.ID}`} 
                                        className="text-green-500 hover:text-green-700 font-semibold"
                                    >
                                        Edit
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(item.ID)} 
                                        className="text-red-500 hover:text-red-700 font-semibold"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 flex justify-center items-center">
                <button
                    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                    className="bg-gradient-to-r from-indigo-600 to-indigo-800 hover:bg-gradient-to-l hover:from-indigo-700 hover:to-indigo-900 text-white py-2 px-4 rounded-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
                >
                    Previous
                </button>
                <span className="mx-4 text-lg text-white">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                    className="bg-gradient-to-r from-indigo-600 to-indigo-800 hover:bg-gradient-to-l hover:from-indigo-700 hover:to-indigo-900 text-white py-2 px-4 rounded-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Home;
