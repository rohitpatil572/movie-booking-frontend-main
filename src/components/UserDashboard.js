import React from 'react';

const UserDashboard = ({ bookings }) => {
  return (
    <div className="container">
      <h1>Your Bookings</h1>
      {bookings.length ? (
        bookings.map((booking) => (
          <div key={booking.id} className="booking">
            <h2>{booking.movieTitle}</h2>
            <p>{booking.date}</p>
          </div>
        ))
      ) : (
        <p>No bookings yet!</p>
      )}
    </div>
  );
};

export default UserDashboard;
