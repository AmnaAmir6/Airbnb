import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const NextArrow = ({ className, style, onClick }) => (
    <FaArrowRight className={className} style={{ ...style, display: "block", color: "white", right:"10px", zIndex: 10, width: "25px",height: "25px",  border: "1px solid #e54c4c", borderRadius: "50%",backgroundColor: "#f26157"}} onClick={onClick} />
  );

  const PrevArrow = ({ className, style, onClick }) => (
    <FaArrowLeft className={className} style={{ ...style, display: "block", color: "white", left: "10px", zIndex: 10 , width: "25px",height: "25px",  border: "1px solid #e54c4c", borderRadius: "50%",backgroundColor: "#f26157"}} onClick={onClick} />
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    const data = [
      { name: "Beachfront", icon: "🏖️" },
      { name: "Cabins", icon: "🏕️" },
      { name: "Trending", icon: "🔥" },
      { name: "Lakefront", icon: "🏞️" },
      { name: "Tiny Homes", icon: "🏡" },
      { name: "Off-grid", icon: "🌲" },
      { name: "Luxury", icon: "💎" },
      { name: "Farm Stays", icon: "🚜" },
      { name: "Treehouses", icon: "🌳" },
      { name: "Domes", icon: "🛖" },
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
    <div className="w-full mt-6 md:fixed top-28">
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category.name}>
            <button
              className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 focus:outline-none"
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
