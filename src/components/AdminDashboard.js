import React, { useState } from 'react';

const AdminDashboard = () => {
  const [movie, setMovie] = useState({ title: '', description: '', image: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Movie added:', movie); // Replace with backend API
    setMovie({ title: '', description: '', image: '' });
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={movie.title}
            onChange={(e) => setMovie({ ...movie, title: e.target.value })}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={movie.description}
            onChange={(e) => setMovie({ ...movie, description: e.target.value })}
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            value={movie.image}
            onChange={(e) => setMovie({ ...movie, image: e.target.value })}
          />
        </div>
        <button className="button" type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
