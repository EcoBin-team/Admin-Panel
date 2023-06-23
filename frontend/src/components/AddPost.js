


import React, { useState } from 'react';
import axios from 'axios';

const CreateFeed = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [likes, setLikes] = useState(0);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'inestriki');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/diutm1skt/upload',
        formData
      );

      setImage(response.data.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedData = {
      Title: title,
      Subtitle: subtitle,
      Image: image,
      Content: content,
      date: date,
      Likes: likes
    };

    try {
      const response = await axios.post('http://localhost:3000/feeds/post', feedData);


      console.log('Created feed:', response.data);
      // Reset form fields
      setTitle('');
      setSubtitle('');
      setImage('');
      setContent('');
      setDate('');
      setLikes('');
    } catch (error) {
      console.error('Failed to create feed:', error);
    }
  };

  return (
  
      <div className="container  style : font-family: Arial, sans-serif;
      max-width: 500px;
      margin: 0 auto;">
        <h1 className="header">Create Feed</h1>
        <form onSubmit={handleSubmit} className="form">
    
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input"
          />
    
          <label htmlFor="subtitle" className="label">Subtitle:</label>
          <input
            type="text"
            id="subtitle"
            name="subtitle"
            placeholder="Enter the subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            required
            className="input"
          />
    
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageUpload}
            required
            className="input"
          />
    
          <textarea
            id="content"
            name="content"
            placeholder="Enter the content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            cols="50"
            required
            className="input"
          ></textarea>
    
          <input
            type="date"
            id="date"
            name="date"
            placeholder="Select the date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="input"
          />
    
          <button type="submit" className="button"onClick={handleSubmit} >Create Feed</button>
        </form>
      
    </div>
  );
};

  export default CreateFeed;
