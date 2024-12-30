import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HostNavbar from "../components/HostNavbar";
import ListingTable from "../components/ListingTable";

const HostHomePage = () => {
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  //console.log(username);

  useEffect(() => {
    const fetchListings = async () => {
      
      const response = await axios.get("http://localhost:8880/api/host/listings", {
        params: { username },});
      setListings(response.data.property);
    };

    const fetchBookings = async () => {
      const response = await axios.get("http://localhost:8880/api/host/bookings",{params: { username },});
      setBookings(response.data.bookings);
    };

    fetchListings();
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8880/api/host/listings/${id}`);
    setListings(listings.filter(listing => listing._id !== id));
  };

  return (
    <><HostNavbar/>
    <div className="relative top-[50px] bg-gray-50 min-h-screen p-8 ">
      <div className="max-w-7xl mx-auto">
        
       

<section id="listingsSection" className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Your Listings</h2>
            {listings.length > 0 ? (
              <ListingTable listings={listings} handleDelete={handleDelete} />
            ) : (
              <p className="text-gray-500">You haven't added any listings yet.</p>
            )}
          </section>


        <section >
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Upcoming Bookings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.length > 0 ? (
              bookings.map((booking,index) => (
                <div key={index} className="bg-red-200 rounded-xl shadow-lg p-6 transform hover:scale-105 transition duration-300">
                  <h3 className="text-2xl font-semibold text-gray-800 p-2">{booking.propertyTitle}</h3>
                  <p className="text-gray-600 mt-4">Guest: {booking.username}</p>
                  <p className="text-sm text-gray-500 mt-4">Check In Date: {new Date(booking.checkInDate).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500 mt-4">Check Out Date: {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No upcoming bookings.</p>
            )}
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

export default HostHomePage;
