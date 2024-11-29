import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Categories = ({ onCategorySelect , selectedCategory}) => {
  const [categories, setCategories] = useState([]);

  const NextArrow = ({ className, style, onClick }) => (
    <FaArrowRight className={className} style={{ ...style, display: "block", color: "white", right:"10px", zIndex: 9, width: "25px",height: "25px",  border: "1px solid #e54c4c", borderRadius: "50%",backgroundColor: "#f26157"}} onClick={onClick} />
  );

  const PrevArrow = ({ className, style, onClick }) => (
    <FaArrowLeft className={className} style={{ ...style, display: "block", color: "white", left: "10px", zIndex: 9 , width: "25px",height: "25px",  border: "1px solid #e54c4c", borderRadius: "50%",backgroundColor: "#f26157"}} onClick={onClick} />
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    const data = [
      { name: "Beachfront", icon: "🏖️" },
      { name: "Cabin", icon: "🏕️" },
      { name: "Trending", icon: "🔥" },
      { name: "Lakefront", icon: "🏞️" },
      { name: "Tiny Home", icon: "🏡" },
      { name: "Off-grid", icon: "🌲" },
      { name: "Luxury", icon: "💎" },
      { name: "Farm Stay", icon: "🚜" },
      { name: "Treehouse", icon: "🌳" },
      { name: "Dome", icon: "🛖" },
    ];
    setCategories(data);
  }

  // Slider settings
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 10, 
    slidesToScroll: 1,
    nextArrow: <NextArrow />, 
    prevArrow: <PrevArrow />, 
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 10,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  return (
    //md:fixed top-28
    <div className="w-full mt-6 ">
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category.name}>
            <button
              className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-md w-24 h-24 focus:outline-none
                        ${selectedCategory === category.name? "bg-red-200" : "bg-gray-100 hover:bg-gray-200"}`}
              onClick={() => onCategorySelect(category.name)} 
            >
              <div className="text-3xl">{category.icon}</div>
              <span className="mt-2 text-sm font-medium">{category.name}</span>
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};


export default Categories;
