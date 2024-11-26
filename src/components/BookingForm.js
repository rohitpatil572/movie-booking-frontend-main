import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { movies } from '../data/movies'; // Adjust path based on folder structure
import '../styles/BookingForm.css'; // Assuming you want a separate CSS file
import { useMoviesMetadata } from './MoviesMetadataContext';
import { useLogout } from './LogoutContext';

const BookingForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showsForMovie, setShowsForMovie] = useState([]);
  const { movieId } = useParams();

  const { loggedOut, logOut } = useLogout();
  const navigate = useNavigate();
  const { movies, theatres } = useMoviesMetadata();
  const [formData, setFormData] = useState({ 
    seats: 1,
    slot: '',
    theatreId: 0,
  });

  let totalPrices=0;
  const [totalPrice, setTotalPrice] = useState(totalPrices); // Default price for 1 person, First Class
  const [successMessage, setSuccessMessage] = useState('');

  const [theatresData, setTheatresData] = useState([]);
  const [slotsData, setSlotsData] = useState([]);

  if(loggedOut) {
    navigate("/signup")
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const showsResponse = await fetch('http://localhost:8082/shows/byMovie/'+movieId);
        if (!showsResponse.ok) {
          throw new Error('Failed to fetch shows');
        }
        const showsData = await showsResponse.json();
        setShowsForMovie(showsData);
        console.log(theatres)
        console.log(showsData)
        const theatreIds = showsData?.map(s=>s.theatreId);
        setTheatresData(theatres.filter(t=>theatreIds.includes(t.id)))

        const slots = showsData?.map(s=>s.startDateTime);
        setSlotsData(slots);
        setFormData({
          seats: 1,
          slot: showsData[0].startDateTime,
          theatreId: showsData[0].theatreId
        })
        console.log("Data loaded");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const movie = movies.find((m) => m.id === parseInt(movieId));
  if (!movie) {
    return <div>Movie not found!</div>;
  }

  // Generate valid booking dates (7 days from today)
  const generateValidDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]); // Format: YYYY-MM-DD
    }
    return dates;
  };

  const validDates = generateValidDates();

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };
    
    console.log(name, value);
    if (name === 'slot') {
      const theatreIds = showsForMovie?.filter(s=>s.startDateTime === value).map(s=>s.theatreId);
      const filteredTheatres = theatres.filter(t=>theatreIds.includes(t.id))
      console.log(filteredTheatres)
      setTheatresData(filteredTheatres)
      if(!theatreIds.includes(formData.theatreId)) {
        updatedData = {...updatedData, theatreId: theatreIds[0]}
      }
    }
    else if (name === 'theatreId') {
      const tId = parseInt(value)
      const slots = showsForMovie?.filter(s=>s.theatreId === tId).map(s=>s.startDateTime);
      console.log(showsForMovie)
      console.log(slots)
      setSlotsData(slots);
      if(!slots.includes(formData.slot)) {
        updatedData = {...updatedData, slot: slots[0]}
      }
    }
    const tIdNew = parseInt(updatedData.theatreId)
    const show = showsForMovie.find(s=>s.startDateTime === updatedData.slot && s.theatreId===tIdNew)
    console.log(show)
    const persons = parseInt(updatedData.seats) || 1;
    const pricePerPerson = show.pricePerPerson;
    setTotalPrice(persons * pricePerPerson);
    setFormData(updatedData);
  };


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const tIdNew = parseInt(formData.theatreId)
    const show = showsForMovie.find(s=>s.startDateTime === formData.slot && s.theatreId===tIdNew)
    const payload = {
      email: sessionStorage.getItem('email'),
      showId: show.id,
      seatsBooked: formData.seats
    }
    try {
      const response = await fetch('http://localhost:8082/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem('jwtToken')
        },
        body: JSON.stringify(payload),
      }); 

      if (!response.ok) {
        console.log(response)
        if(response.status === 401) {
          logOut();
          navigate("/signup");
        }
        throw new Error('Registration failed. Please try again.');
      }

      const data = await response.json();
      console.log(data);
      navigate("/booked-shows");
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form-container">
      <h1>Booking for: {movie.title}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Number of Persons:
          <input
            type="number"
            name="seats"
            value={formData.seats}
            onChange={handleInputChange}
            min="1"
            required
          />
        </label>
        
        <label>
          Theatre:
          {loading ? (
              <p>Loading shows...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <select
                name="theatreId"
                value={formData.theatreId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a theatre</option>
                {theatresData.map((theatre, index) => (
                  <option key={index} value={theatre.id}>
                    {theatre.name}
                  </option>
                ))}
              </select>
            )}
        </label>

        <label>
          Show Timings:
          {loading ? (
              <p>Loading shows...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <select
                name="slot"
                value={formData.slot}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a slot</option>
                {slotsData.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            )}
        </label>
        <div className="total-price">
          Total Price: <strong>₹{totalPrice}</strong>
        </div>
        <button type="submit">Book Now</button>
      </form>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
};

export default BookingForm;
