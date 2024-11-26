import React, { useEffect, useState } from "react";
import "../styles/AuthForm.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogout } from "./LogoutContext";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingCities, setLoadingCities] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { logIn } = useLogout();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    mobile: "",
    age: "",
    city: "",
  });

  const [cities, setCities] = useState([]); // To store the fetched data
  useEffect(() => {
    const apiUrl = 'http://localhost:8082/cities';

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then((data) => {
        setCities(data); 
        setLoadingCities(false); 
      })
      .catch((error) => {
        setError(error.message); 
        setLoadingCities(false); 
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:8082/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }); 

      if (!response.ok) {
        throw new Error('Registration failed. Please try again.');
      }

      const data = await response.json();
      console.log(data);
      if(data.accessToken && data.email) {
        logIn(data.email, data.accessToken);
      } else {
        throw new Error('Registration failed. Please try again.');
      }
      setSuccess('Registration successful!');
      navigate("/home");
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:8082/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Login failed. Please try again.');
      }

      
      const data = await response.json();
      console.log(data);
      if(data.accessToken && data.email) {
        logIn(data.email, data.accessToken);
      } else {
        throw new Error('Login failed. Please try again.');
      }
      navigate("/home");
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container ">
      <div className="form-container ">
        <div className="form-toggle">
          <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>
            Login
          </button>
          <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>
            Register
          </button>
        </div>
        {isLogin ? (
          <div className="form">
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Enter your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Enter your Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <a href="#">Forgot Password?</a>
            <button onClick={handleLogin} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        ) : (
          <div className="form">
            <h2>Register</h2>
           
            <input
              type="text"
              placeholder="Enter your Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Enter your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="tel"
              placeholder="Enter your Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Enter your Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
            {loadingCities ? (
              <p>Loading cities...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              >
                <option value="">Select a city</option>
                {cities.map((city, index) => (
                  <option key={index} value={city.id}>
                    {city.name} {/* Assuming the city object has a 'name' property */}
                  </option>
                ))}
              </select>
            )}
            <input
              type="password"
              placeholder="Enter your Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Confirm your Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button onClick={handleRegister} disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        )}
      </div>
            {success && <div style={{ color: 'green' }}>{success}</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default AuthForm;
