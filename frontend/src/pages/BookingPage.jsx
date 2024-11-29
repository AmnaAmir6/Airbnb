import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import axios from 'axios';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const[selectedListing,setSelectedListing]=useState(null);
  const [showBookedDetails,setShowBookedDetails]=useState(false);

  useEffect(() => {
    fetchLisitngByID(id);
  }, []);

  const fetchLisitngByID = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8880/api/listing/${id}`);
      console.log("response: ", response.data.result);
      setSelectedListing(response.data.result);
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  useEffect(()=>{
    setError("");
  },[checkInDate,checkOutDate])

  const ResetForm =()=>{
    setCheckInDate("");
    setCheckOutDate("");
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!checkInDate || !checkOutDate) {
      setError("Please select both check-in and check-out dates.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Setting to midnight

    const checkIn = new Date(checkInDate);

    if (checkIn < today) {
      setError("Check-in date cannot be earlier than today.");
      return;
    }

    const checkOut = new Date(checkOutDate);
    
    if (checkOut <= checkIn) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    setTotalPrice(diffDays * selectedListing.price);

    try {
      const response = await axios.post(`http://localhost:8880/api/bookings`,{
        selectedListing,
        booking:{
          checkInDate,checkOutDate
        }
      });
      console.log("response: ", response.data);

      if(response.data.success){
        setShowBookedDetails(true);
      }
    }
    catch (error) {
      setError(error);
      console.error("Error booking data:", error);
    }
    console.log(`Booking confirmed for Id: ${id}`);
  };

  const closeShowBookedDetails =()=>{
    setShowBookedDetails(false);
    setTotalPrice(0);
    ResetForm();
  }

  if (!selectedListing) {
    return <div>Property not found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8 mt-12">
      <div className="max-w-xl mx-auto shadow-2xl shadow-gray-700/40 rounded-lg overflow-hidden p-6 bg-white">
            <h3 className="text-xl font-bold">{selectedListing.title}</h3>
            <p className="text-gray-500">{selectedListing.type}</p>
            <div className="flex items-center mt-4">
              <img src={selectedListing.image} alt={selectedListing.title} className="w-24 h-24 object-cover rounded-lg" />
              <div className="ml-4">
                <p className="font-semibold">Price per Night:</p>
                <p className="text-red-400">{`Rs ${selectedListing.price}`}</p>
              </div>      
            </div>
        
          
          <form onSubmit={handleSubmit} className="mt-6">
            <div>
              <div className="block text-sm font-semibold text-gray-600">Check-in Date</div>
              <input
                type="date"
                id="checkIn"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mt-2"
              />
            </div>

            <div className="mt-4">
              <div className="block text-sm font-semibold text-gray-600">Check-out Date</div>
              <input
                type="date"
                id="checkOut"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mt-2"
              />
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="mt-6">
              <button
                type="submit"
                className="bg-red-400 text-white px-6 py-3 rounded-lg hover:bg-red-600 focus:outline-none w-full"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
      {showBookedDetails && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-xl font-bold mb-4 text-red-400">
              Property Booked Successfully
            </h2>
            
              <div >
                <p className='p-2'>Check In Date: <span className='font-semibold'>{`${checkInDate}`}</span></p>
                <p className='p-2'>Check Out Date: <span className='font-semibold'>{`${checkOutDate}`}</span></p>
                <p className='p-2'>Total Price: <span className="text-red-500 text-lg font-medium">{`Rs ${totalPrice}`}</span></p>
              </div>
            <div className='flex justify-center items-end flex-col'>
            <button
              className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none hover:outline-none"
              onClick={closeShowBookedDetails}
            >
              Close
            </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingPage;
