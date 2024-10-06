import React from 'react';

const ListingCard = ({ image, title, type, guests, bedrooms, bathrooms, price, rating }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-500">{type}</p>
        <div className="flex justify-between my-2">
          <span className="text-sm text-gray-600">{guests} guests</span>
          <span className="text-sm text-gray-600">{bedrooms} bedrooms</span>
          <span className="text-sm text-gray-600">{bathrooms} bathrooms</span>
        </div>
        <div className="flex items-center justify-between my-2">
          <span className="text-lg font-bold">Rs {price} / night</span>
          <div className="flex items-center">
            <span className="text-yellow-500">
              {'★'.repeat(Math.floor(rating))}
              {'☆'.repeat(5 - Math.floor(rating))}
            </span>
            <span className="ml-2 text-gray-600">({rating})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
