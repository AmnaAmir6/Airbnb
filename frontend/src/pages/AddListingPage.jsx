import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddListingPage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        image: '',
        guests: 1,
        bedrooms: 1,
        bathrooms: 1,
        price: 0,
        category: '',
        rating: 1,
        amenities: [],
    });

    const username=localStorage.getItem("username");
    const navigate=useNavigate();

    const isNextDisabled = () => {
        if (step === 1) {
            return !formData.title || !formData.type || !formData.image;
        }
        if (step === 2) {
            return !formData.guests || !formData.bedrooms || !formData.bathrooms;
        }
        if (step === 3) {
            return !formData.price || !formData.rating || !formData.amenities.length;
        }
        return false;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData,[name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData({
                ...formData,
                image: imageUrl,
            });
        }
    };

    const handleNextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const handlePreviousStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = async() => {
        console.log(formData);
        try {
            await axios.post("http://localhost:8880/api/host/listings", { 
                username,
                title:formData.title,
                type:formData.type,
                category:formData.category,
                price:formData.price,
                rating:formData.rating,
                guests:formData.guests,
                bedrooms:formData.bedrooms,
                bathrooms:formData.bathrooms,
                image:formData.image,
                amenities:formData.amenities
             })
             navigate("/hostHome");
             
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setStep(1);
    }, []);

    return (
        <div className="container mx-auto p-8">
            <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-xl space-y-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add a New Listing</h2>

                <div className="flex items-center justify-center mb-4">
                    {[1, 2, 3].map((num) => (
                        <React.Fragment key={num}>
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold transition-all duration-300 ${
                                    step >= num
                                        ? 'bg-red-400 border-2 border-red-400'
                                        : 'bg-gray-300 border-2 border-gray-300'
                                }`}
                            >
                                {num}
                            </div>
                            {num < 3 && (
                                <div
                                    className={`flex-grow h-1 mx-2 transition-all duration-300 ${
                                        step > num ? 'bg-red-400' : 'bg-gray-300'
                                    }`}
                                ></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <div className="flex justify-center space-x-56 mt-2">
                    <div className="text-center">
                        
                        <span className={`${step >= 1 ? 'text-red-400' : 'text-gray-500'}`}>Property Details</span>
                    </div>

                    <div className="text-center">
                        
                        <span className={`${step >= 2 ? 'text-red-400' : 'text-gray-500'}`}>Property Features</span>
                    </div>

                    <div className="text-center">
                       
                        <span className={`${step >= 3 ? 'text-red-400' : 'text-gray-500'}`}>Pricing & Amenities</span>
                    </div>
                </div>

                <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
                    <div className={step === 1 ? 'block' : 'hidden'}>
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">Step 1: Property Details</h3>
                        <div>
                            <label className="block text-gray-600 mb-2">Title <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-red-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-2">Type <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-red-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-2">Category <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-red-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-2">Image <span className="text-red-500">*</span></label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-red-400"
                                required
                            />
                            {formData.image && (
                                <div className="mt-4">
                                    <img
                                        src={formData.image}
                                        alt="Preview"
                                        className="w-full h-auto rounded-md border border-gray-300 shadow-md"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={step === 2 ? 'block' : 'hidden'}>
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">Step 2: Property Features</h3>
                        <div>
                            <label className="block text-gray-600 mb-2">Guests <span className="text-red-500">*</span></label>
                            <input
                                type="number"
                                name="guests"
                                value={formData.guests}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-red-400"
                                min="1"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-2">Bedrooms <span className="text-red-500">*</span></label>
                            <input
                                type="number"
                                name="bedrooms"
                                value={formData.bedrooms}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-red-400"
                                min="1"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-2">Bathrooms <span className="text-red-500">*</span></label>
                            <input
                                type="number"
                                name="bathrooms"
                                value={formData.bathrooms}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-red-400"
                                min="1"
                                required
                            />
                        </div>
                    </div>

                    <div className={step === 3 ? 'block' : 'hidden'}>
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">Step 3: Pricing & Amenities</h3>
                        <div>
                            <label className="block text-gray-600 mb-2">Price <span className="text-red-500">*</span></label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-red-400"
                                min="0"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-2">Rating <span className="text-red-500">*</span></label>
                            <input
                                type="number"
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-red-400"
                                min="1"
                                max="5"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-2">Amenities (comma separated) <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="amenities"
                                value={formData.amenities.join(', ')}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        amenities: e.target.value.split(',').map((item) => item.trim()),
                                    })
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-red-400"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-between mt-6">
                        {step > 1 && (
                            <button
                                onClick={handlePreviousStep}
                                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md"
                            >
                                Previous
                            </button>
                        )}
                        <div className="flex space-x-4">
                            {step < 3 && (
                                <button
                                    onClick={handleNextStep}
                                    className={`bg-red-400 text-white px-6 py-2 rounded-md ${
                                        isNextDisabled() ? 'cursor-not-allowed opacity-50' : ''
                                    }`}
                                    disabled={isNextDisabled()}
                                >
                                    Next
                                </button>
                            )}
                            {step === 3 && (
                                <button
                                    onClick={handleSubmit}
                                    className="bg-green-400 text-white px-6 py-2 rounded-md"
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddListingPage;
