import React, { useState, useEffect } from 'react';
import './App.css'

import axios from 'axios';

function GetAllBookings() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10); // Number of items per page

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(
          `https://fbtest.webcodes.ee/wp-json/bookings/v1/broneeringud`
        );
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching booking:', error);
        setLoading(false);
      }
    };

    fetchBooking();
  }, []);

  const totalPages = Math.ceil(events.length / itemsPerPage); //Total pages
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvents = events.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Handle rows per page
  const handleItemsPerPageChange = (e) => {
    setitemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when items per page changes
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className='bookingPage'>
      <table className="bookings-table">
        <thead>
          <tr>
            <th>Algus</th>
            <th>Lõpp</th>
            <th>Ürituse nimi</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>Asukoht</th>
            <th>Kohtunik</th>
            <th>Muu Info</th>
            <th>Võistlusklassid</th>
            <th>Võistlusliik</th>
            <th>Staatus</th>
          </tr>
        </thead>
        <tbody>
          {currentEvents.map((event) => (
            <tr key={event.id}>
              <td className='table-date-box'>{event.startDate}</td>
              <td className='table-date-box'>{event.endDate}</td>
              <td>{event.name}</td>
              <td>{event.email}</td>
              <td>{event.phone}</td>
              <td>{event.location}</td>
              <td>{event.referee}</td>
              <td>{event.info}</td>
              <td>{event.competitionClasses}</td>
              <td>{event.competitionType}</td>
              <td>{event.status}</td>
              <td>
                <div className="button-wrapper">
                  <button className='accept' onClick={() => handleAccept(event.id)}><i className="fa-solid fa-plus"></i></button>
                  <button className='update' onClick={() => handleDeny(event.id)}><i className="fa-solid fa-pen"></i></button>
                  <button className='deny' onClick={() => handleDeny(event.id)}><i className="fa-solid fa-trash"></i></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Dropdown for Rows Per Page */}
      <div className="pagination-container">
        <div className="pagination-controls">
          <label htmlFor="itemsPerPage">Kirjed lehekülje kohta:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className="pagination">
          {Array.from({ length: Math.ceil(events.length / itemsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GetAllBookings;