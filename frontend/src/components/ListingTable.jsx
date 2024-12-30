import React from "react";
import ListingRow from "./ListingRow";

const ListingTable = ({ listings, handleDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Image</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Title</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Bedrooms</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Bathrooms</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Guests</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Price</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => (
            <ListingRow key={listing._id} listing={listing} handleDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListingTable;
