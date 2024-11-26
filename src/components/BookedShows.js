import React, { useState, useEffect } from 'react';
import '../styles/BookedShows.css';
import { useLogout } from './LogoutContext';
import { useNavigate } from 'react-router-dom';

const BookedShows = () => {
  const [bookedShows, setBookedShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const { loggedOut, logOut } = useLogout();
  
  const navigate = useNavigate();
  if(loggedOut) {
    navigate("/signup")
  }
  // Fetch booked shows from the backend
  const fetchBookedShows = async () => {
    try {
      const response = await fetch('http://localhost:8082/bookings/byUser/'+sessionStorage.getItem('email'), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem('jwtToken')
        }}); // Backend API endpoint
      const data = await response.json();
      setBookedShows(data);
    } catch (error) {
      console.error("Error fetching booked shows:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookedShows();
  }, []);

  const cancelBooking = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/cancel-booking/${id}`, {
        method: 'DELETE',
      });
      setBookedShows(bookedShows.filter(show => show.id !== id));
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  return (
    <div className="booked-shows-container">
      <h1>Booked Shows</h1>
      {loading ? (
        <p>Loading...</p>
      ) : bookedShows.length === 0 ? (
        <p>No booked shows available.</p>
      ) : (
        <div className="tickets-container">
          {bookedShows.map(show => (
            <div key={show.id} className="ticket">
              <h2>{show.movieTitle}</h2>
              <p><strong>Date:</strong> {show.startDateTime.split('T')[0]}</p>
              <p><strong>Time:</strong> {show.startDateTime.split('T')[1]}</p>
              <p><strong>Seats:</strong> {show.seatsBooked}</p>
              <p><strong>Total Cost:</strong> ₹{show.totalAmount}</p>
              <p className="arrival-info">
                <strong>Arrival:</strong> Please arrive <strong>10 minutes before showtime</strong>.
              </p>
              <button onClick={() => cancelBooking(show.id)} className="cancel-button">Cancel Booking</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedShows;
