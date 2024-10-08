import { useState } from "react";

const SearchBar = () => {
    const [location, setLocation] = useState("");

    return (
        //md:fixed top-16
        <div className="flex justify-center items-center p-4  w-full">
            <input
                type="text"
                name="Search Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Search Location"
                className="border border-gray-300 rounded-lg p-2 w-full sm:w-2/3 mr-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button
                className="bg-red-400 text-white rounded-lg px-4 py-2 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
                Search
            </button>
        </div>
    );
}

export default SearchBar;
