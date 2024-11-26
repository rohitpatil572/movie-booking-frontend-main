import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Adjust path as per your project structure
import MovieList from "./components/MovieList"; // Adjust path as per your project structure
import AdminDashboard from "./components/AdminDashboard"; // Adjust path as per your project structure
import UserDashboard from "./components/UserDashboard"; // Adjust path as per your project structure
import Login from "./components/Login"; // Adjust path as per your project structure
import Register from "./components/Register"; // Adjust path as per your project structure
import Layout from './components/Layout';
import AboutUs from './components/AboutUs';
import BookedShows from './components/BookedShows';
import BookingForm from './components/BookingForm';
import "./App.css";
import AuthForm from "./components/AuthForm";
import { LogoutProvider } from "./components/LogoutContext";
import { MoviesMetadataProvider } from "./components/MoviesMetadataContext";
function App() {
  // State for username
  const [username, setUsername] = useState("Guest");

  // Placeholder movies and bookings data
  const movies = []; // Replace with actual movie data or fetch API
  const bookings = []; // Replace with actual bookings data or fetch API

  return (
    <LogoutProvider>
      <MoviesMetadataProvider>
        <Router>
          <Navbar username={username} />
          <Layout>
            <Routes>
              <Route path="/home" element={<MovieList movies={movies} />} />
              <Route path="/signup" element={<AuthForm />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/dashboard" element={<UserDashboard bookings={bookings} />} />
              <Route path="/login" element={<Login setUsername={setUsername} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/profile" element={<h1>User Profile</h1>} />
              <Route path="/booked-shows" element={<BookedShows />} />
              <Route path="/book/:movieId" element={<BookingForm />} />
              <Route path="/logout" element={<h1>Logout Page</h1>} />
            </Routes>
          </Layout>
        </Router>
      </MoviesMetadataProvider>
    </LogoutProvider>
  );
}

export default App;
