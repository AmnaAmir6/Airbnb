import Categories from "../components/Categories"
import Footer from "../components/Footer"
import ListingCard from "../components/ListingCard"
import Navbar from "../components/Navbar"
import SearchBar from "../components/SeachBar"
import { useEffect,useState } from "react"



const HomePage = () => {
    const [listingCards, setListingCards] = useState([]);
    const [selectedCategory,setSelectedCategory]=useState("Luxury");
  

  useEffect(() => {
    const Data = [
        {
          image: "/src/assets/image1.png", 
          title: "Beautiful Beach House",
          type: "Entire home",
          guests: 6,
          bedrooms: 3,
          bathrooms: 2,
          price: 25000,
          rating: 4.5,
          category:"Beachfront",
        },
        {
          image: "/src/assets/image2.png",
          title: "Cozy Mountain Cabin",
          type: "Private room",
          guests: 2,
          bedrooms: 1,
          bathrooms: 1,
          price: 10000,
          rating: 4.8,
          category:"Cabin",
        },
        {
          image: "/src/assets/image3.png",
          title: "Luxurious Villa",
          type: "Entire home",
          guests: 8,
          bedrooms: 4,
          bathrooms: 5,
          price: 45000,
          rating: 4.9,
          category:"Luxury",
        },
        {
            image: "/src/assets/image4.png",
            title: "Dreamy lux",
            type: "Entire home",
            guests: 6,
            bedrooms: 3,
            bathrooms: 3,
            price: 35000,
            rating: 4.7,
            category:"Luxury",
          },
          {
            image: "/src/assets/image5.png",
            title: "Marin Castle",
            type: "Entire home",
            guests: 10,
            bedrooms: 5,
            bathrooms: 7,
            price: 60000,
            rating: 4.8,
            category:"Luxury",
          },
      ];
    setListingCards(Data);
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };


    return(
        <>
        <Navbar/>
        <div className="mt-16">
        <SearchBar/>
        <Categories onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
        <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {listingCards.filter((card) => !selectedCategory || card.category === selectedCategory) 
            .map((Card, index) => (<ListingCard key={index} {...Card} />))
        }
        
      </div>
      </div>
      <Footer/>
        </>
    )
}

export default HomePage