import React from "react";

const ListingRow = ({ listing, handleDelete }) => {
  return (
    <tr className="border-t">
      <td className="px-6 py-4">
        <img
          src={listing.image || "https://via.placeholder.com/600x400"}
          alt={listing.title}
          className="w-20 h-20 object-cover rounded-lg"
        />
      </td>
      <td className="px-6 py-4">{listing.title}</td>
      <td className="px-6 py-4">{listing.bedrooms}</td>
      <td className="px-6 py-4">{listing.bathrooms}</td>
      <td className="px-6 py-4">{listing.guests}</td>
      <td className="px-6 py-4 text-red-600 font-semibold">${listing.price}</td>
      <td className="px-6 py-4">
        <button
          onClick={() => handleDelete(listing._id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ListingRow;
