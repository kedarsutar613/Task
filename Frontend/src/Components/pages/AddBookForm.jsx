import React, { useState } from 'react';
import axios from 'axios';

const AddBookForm = ({ onAddBook }) => {
    const [formData, setFormData] = useState({
        cover: '',
        title: '',
        description: '',
        genre: '',
        publishDate: '',
        price: '',
        tags: ''
    });

    const [error, setError] = useState(null);
    const [serverError, setServerError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setServerError(null);

        // Simple client-side validation
        if (!formData.title || !formData.description || !formData.genre || !formData.publishDate || !formData.price) {
            setError('Please fill out all required fields.');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:3000/api/register', formData);
            console.log('Book added successfully!', response.data);

            // Call the onAddBook function passed from the parent component if needed
            if (onAddBook) {
                onAddBook(response.data);
            }

            // Reset the form after successful submission
            setFormData({
                cover: '',
                title: '',
                description: '',
                genre: '',
                publishDate: '',
                price: '',
                tags: ''
            });
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error response:', error.response);
                setServerError(error.response.data.message || 'An error occurred on the server');
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error request:', error.request);
                setServerError('No response received from the server');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
                setServerError('An error occurred: ' + error.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="cover">Cover:</label>
                <input type="text" id="cover" name="cover" value={formData.cover} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange}  />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
            </div>
            <div>
                <label htmlFor="genre">Genre:</label>
                <input type="text" id="genre" name="genre" value={formData.genre} onChange={handleChange}  />
            </div>
            <div>
                <label htmlFor="publishDate">Publish Date:</label>
                <input type="date" id="publishDate" name="publishDate" value={formData.publishDate} onChange={handleChange}  />
            </div>
            <div>
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" value={formData.price} onChange={handleChange}  />
            </div>
            <div>
                <label htmlFor="tags">Tags:</label>
                <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} />
            </div>
            <button type="submit">Add Book</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {serverError && <p style={{ color: 'red' }}>{serverError}</p>}
        </form>
    );
};

export default AddBookForm;
