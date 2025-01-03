import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "../components/Navbar"

const ListingDetailsPage = () => {
  const { id } = useParams();
  console.log("id: ", id);
  const navigate = useNavigate();
  const [listing, setLisitng] = useState();
  useEffect(() => {
    fetchLisitngByID(id);
  }, []);

  const fetchLisitngByID = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8880/api/listing/${id}`);
      console.log("response: ", response.data.listing);
      setLisitng(response.data.listing);
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const handleBooking = () => {
    navigate(`/book/${id}`);
  };

  if (!listing) return <div>Error List not found</div>;
  const { image, title, type, guests, bedrooms, bathrooms, price, amenities } = listing;
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8 mt-12">
        <div className="max-w-3xl mx-auto bg-white shadow-2xl shadow-gray-700/40 rounded-lg overflow-hidden flex flex-col ">
          <img className="w-[830px] h-[450px] object-cover p-4 rounded-3xl" src={image} alt={title} />

          <div className="p-6 flex justify-between flex-col ml-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 ">{title}</h2>
              <p className="text-sm text-gray-500 mt-2 ">{type}</p>
            </div>
            <div >


              <div className="mt-6 grid grid-cols-2 gap-4 text-gray-700">
                <div>
                  <p><span className="font-semibold">Guests:</span> {guests}</p>
                </div>
                <div>
                  <p><span className="font-semibold">Bedrooms:</span> {bedrooms}</p>
                </div>
                <div>
                  <p><span className="font-semibold">Bathrooms:</span> {bathrooms}</p>
                </div>
              </div>
              <div className='mt-6'>
              <span className="font-semibold ">Amenities: </span>
              <div className="grid grid-cols-3 gap-4 text-gray-700 pb-6 pt-4">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <span className="mr-2">⭕</span> {amenity}
                  </div>
                ))}
              </div>
              </div>

              <div className="mt-4">
                <p className="text-lg font-semibold text-gray-800">
                  Price per night : <span className="text-red-400 pl-4">${price}</span>
                </p>
              </div>

              <div className="mt-8 text-end">
                <button
                  onClick={handleBooking}
                  className="bg-red-400 text-white px-6 py-3 rounded-lg hover:bg-red-600 focus:outline-none self-end"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListingDetailsPage