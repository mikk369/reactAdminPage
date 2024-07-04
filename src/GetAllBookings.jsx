import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GetAllBookings() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        // Make a GET request to the WooCommerce product endpoint
        const response = await axios.get(
          `https://testwordpress.webcodes.ee/wp-json/bookings/v1/bookings`
        );
        // Set the retrieved product in the state
        setBooking(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching booking:', error);
        setLoading(false);
      }
    };

    fetchBooking();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

    const calculateDays = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDifference = end - start;
      const daysDifference = timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days
      return daysDifference + 1; // Include the start day
    };

  return (
    <div className="bookingPage">
      <h2>Recent Bookings</h2>
      <table className="bookings-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Days</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.startdate}</td>
              <td>{booking.enddate}</td>
              <td>{calculateDays(booking.startdate, booking.enddate)}</td>
              <td>{booking.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GetAllBookings;
