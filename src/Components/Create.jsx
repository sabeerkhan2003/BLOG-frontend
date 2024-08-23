import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Create() {
    const [formData, setFormData] = useState({ title: '', content: '', author: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://blog-backend-axvl.onrender.com/blogs', formData)
            .then(() => {
                alert("Blog post created successfully!");
                navigate("/");
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-4">
            <h1 className="text-4xl font-bold mb-6">Create New Blog Post</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                <div className="mb-6">
                    <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">Content</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows="10"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
                        required
                    ></textarea>
                </div>
                <div className="mb-6">
                    <label htmlFor="author" className="block text-gray-700 font-semibold mb-2">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
                        required
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-gradient-to-l hover:from-blue-600 hover:to-blue-800 text-white py-2 px-6 rounded-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
                    >
                        Create
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="bg-gradient-to-r from-red-500 to-red-700 hover:bg-gradient-to-l hover:from-red-600 hover:to-red-800 text-white py-2 px-6 rounded-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Create;
