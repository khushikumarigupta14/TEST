import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Filter, Star, MapPin, DollarSign, Menu, X, Sun, Moon, Heart, Clock, Users, Phone, Mail, Facebook, Twitter, Instagram, ChevronDown, ChevronUp } from 'lucide-react';

// Static restaurant data
const restaurantData = [
  {
    id: 1,
    name: "The Golden Spoon",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    location: "Downtown, NYC",
    cuisine: "Fine Dining",
    priceRange: 4,
    rating: 4.8,
    reviews: 245,
    description: "Exquisite fine dining experience with contemporary American cuisine",
    tags: ["Romantic", "Business", "Special Occasion"]
  },
  {
    id: 2,
    name: "Mama's Kitchen",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    location: "Little Italy, NYC",
    cuisine: "Italian",
    priceRange: 2,
    rating: 4.6,
    reviews: 189,
    description: "Authentic Italian cuisine in a cozy family atmosphere",
    tags: ["Family-Friendly", "Casual", "Traditional"]
  },
  {
    id: 3,
    name: "Sakura Sushi",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
    location: "Midtown, NYC",
    cuisine: "Japanese",
    priceRange: 3,
    rating: 4.7,
    reviews: 312,
    description: "Fresh sushi and traditional Japanese dishes",
    tags: ["Fresh", "Traditional", "Lunch"]
  },
  {
    id: 4,
    name: "Burger Paradise",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    location: "Brooklyn, NYC",
    cuisine: "American",
    priceRange: 1,
    rating: 4.3,
    reviews: 156,
    description: "Juicy burgers and crispy fries in a casual setting",
    tags: ["Casual", "Fast Food", "Takeout"]
  },
  {
    id: 5,
    name: "Spice Route",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
    location: "Queens, NYC",
    cuisine: "Indian",
    priceRange: 2,
    rating: 4.5,
    reviews: 203,
    description: "Authentic Indian spices and traditional recipes",
    tags: ["Spicy", "Vegetarian Options", "Traditional"]
  },
  {
    id: 6,
    name: "Le Petit Bistro",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    location: "SoHo, NYC",
    cuisine: "French",
    priceRange: 3,
    rating: 4.9,
    reviews: 178,
    description: "Classic French cuisine in an intimate setting",
    tags: ["Romantic", "Wine", "Date Night"]
  },
  {
    id: 7,
    name: "Taco Fiesta",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    location: "East Village, NYC",
    cuisine: "Mexican",
    priceRange: 1,
    rating: 4.4,
    reviews: 134,
    description: "Authentic Mexican street food and vibrant atmosphere",
    tags: ["Casual", "Street Food", "Margaritas"]
  },
  {
    id: 8,
    name: "Dragon Palace",
    image: "https://images.unsplash.com/photo-1576777147207-1ebe61c93fe5?w=400&h=300&fit=crop",
    location: "Chinatown, NYC",
    cuisine: "Chinese",
    priceRange: 2,
    rating: 4.2,
    reviews: 267,
    description: "Traditional Chinese cuisine with modern presentation",
    tags: ["Traditional", "Family Style", "Lunch Special"]
  },
  {
    id: 9,
    name: "Mediterranean Breeze",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&h=300&fit=crop",
    location: "Upper East Side, NYC",
    cuisine: "Mediterranean",
    priceRange: 3,
    rating: 4.6,
    reviews: 145,
    description: "Fresh Mediterranean flavors with ocean-inspired ambiance",
    tags: ["Healthy", "Seafood", "Outdoor Seating"]
  },
  {
    id: 10,
    name: "BBQ Smokehouse",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
    location: "Bronx, NYC",
    cuisine: "BBQ",
    priceRange: 2,
    rating: 4.7,
    reviews: 198,
    description: "Slow-smoked meats and homestyle sides",
    tags: ["BBQ", "Comfort Food", "Takeout"]
  },
  {
    id: 11,
    name: "Vegan Garden",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    location: "Greenwich Village, NYC",
    cuisine: "Vegan",
    priceRange: 2,
    rating: 4.5,
    reviews: 112,
    description: "Plant-based cuisine that doesn't compromise on flavor",
    tags: ["Vegan", "Healthy", "Organic"]
  },
  {
    id: 12,
    name: "Steakhouse Prime",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
    location: "Midtown West, NYC",
    cuisine: "Steakhouse",
    priceRange: 4,
    rating: 4.8,
    reviews: 189,
    description: "Premium cuts and classic steakhouse experience",
    tags: ["Business", "Wine", "Premium"]
  }
];

const cuisineTypes = ["All", "Fine Dining", "Italian", "Japanese", "American", "Indian", "French", "Mexican", "Chinese", "Mediterranean", "BBQ", "Vegan", "Steakhouse"];

// Utility function for price range display
const getPriceDisplay = (priceRange) => {
  return '$'.repeat(priceRange) + '$'.repeat(4 - priceRange).replace(/\$/g, '');
};

// Star rating component
const StarRating = ({ rating, reviews }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
      <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
        {rating} ({reviews})
      </span>
    </div>
  );
};

// Restaurant Card Component
const RestaurantCard = ({ restaurant, darkMode }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
      darkMode 
        ? 'bg-gray-800/50 backdrop-blur-lg border border-gray-700/50' 
        : 'bg-white/80 backdrop-blur-lg border border-white/50 shadow-lg'
    }`}>
      {/* Image Container */}
      <div className="relative overflow-hidden h-48">
        {!imageLoaded && (
          <div className={`absolute inset-0 animate-pulse ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
        )}
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm transition-all duration-300 hover:scale-110"
          aria-label="Add to favorites"
        >
          <Heart className={`w-4 h-4 transition-colors duration-300 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>

        {/* Price Badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${
          darkMode ? 'bg-gray-900/80 text-white' : 'bg-white/90 text-gray-900'
        } backdrop-blur-sm`}>
          {getPriceDisplay(restaurant.priceRange)}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className={`font-bold text-lg line-clamp-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {restaurant.name}
          </h3>
          <span className={`text-xs px-2 py-1 rounded-full ${
            darkMode ? 'bg-blue-900/50 text-blue-200' : 'bg-blue-100 text-blue-800'
          }`}>
            {restaurant.cuisine}
          </span>
        </div>

        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
          <MapPin className="w-4 h-4" />
          <span className="text-sm line-clamp-1">{restaurant.location}</span>
        </div>

        <p className={`text-sm line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {restaurant.description}
        </p>

        <StarRating rating={restaurant.rating} reviews={restaurant.reviews} />

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {restaurant.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className={`text-xs px-2 py-1 rounded-full ${
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <button className={`w-full py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
          darkMode 
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white' 
            : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
        } shadow-lg hover:shadow-xl`}>
          View Details
        </button>
      </div>
    </div>
  );
};

// Filter Sidebar Component
const FilterSidebar = ({ filters, setFilters, darkMode, isOpen, setIsOpen }) => {
  const sidebarClasses = `fixed lg:relative top-0 left-0 h-full lg:h-auto w-80 lg:w-full z-40 transform transition-transform duration-300 lg:transform-none ${
    isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
  } ${darkMode ? 'bg-gray-900/95 lg:bg-transparent' : 'bg-white/95 lg:bg-transparent'} backdrop-blur-lg lg:backdrop-blur-none border-r lg:border-r-0 ${
    darkMode ? 'border-gray-700' : 'border-gray-200'
  } lg:border-transparent p-6 lg:p-0`;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div className={sidebarClasses}>
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Filters
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Price Range */}
          <div>
            <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Price Range
            </h3>
            <div className="space-y-2">
              {[1, 2, 3, 4].map(price => (
                <label key={price} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.priceRange.includes(price)}
                    onChange={() => {
                      const updated = filters.priceRange.includes(price)
                        ? filters.priceRange.filter(p => p !== price)
                        : [...filters.priceRange, price];
                      setFilters(prev => ({ ...prev, priceRange: updated }));
                    }}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {getPriceDisplay(price)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Cuisine Type */}
          <div>
            <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Cuisine Type
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {cuisineTypes.slice(1).map(cuisine => (
                <label key={cuisine} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.cuisine.includes(cuisine)}
                    onChange={() => {
                      const updated = filters.cuisine.includes(cuisine)
                        ? filters.cuisine.filter(c => c !== cuisine)
                        : [...filters.cuisine, cuisine];
                      setFilters(prev => ({ ...prev, cuisine: updated }));
                    }}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {cuisine}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Minimum Rating
            </h3>
            <div className="space-y-2">
              {[4, 4.5].map(rating => (
                <label key={rating} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.minRating === rating}
                    onChange={() => setFilters(prev => ({ ...prev, minRating: rating }))}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {rating}+ Stars
                    </span>
                  </div>
                </label>
              ))}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === 0}
                  onChange={() => setFilters(prev => ({ ...prev, minRating: 0 }))}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Any Rating
                </span>
              </label>
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => setFilters({
              priceRange: [],
              cuisine: [],
              minRating: 0
            })}
            className={`w-full py-2 px-4 rounded-lg border transition-colors ${
              darkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </>
  );
};

// Navbar Component
const Navbar = ({ darkMode, toggleDarkMode, currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled 
      ? darkMode 
        ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg' 
        : 'bg-white/95 backdrop-blur-lg shadow-lg'
      : 'bg-transparent'
  }`;

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FE</span>
            </div>
            <span className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              FoodieExplorer
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => setCurrentPage('home')}
              className={`font-medium transition-colors ${
                currentPage === 'home'
                  ? 'text-blue-600 dark:text-blue-400'
                  : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('about')}
              className={`font-medium transition-colors ${
                currentPage === 'about'
                  ? 'text-blue-600 dark:text-blue-400'
                  : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              About
            </button>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-800 text-yellow-400' : 'hover:bg-gray-100 text-gray-600'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-800 text-yellow-400' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-900'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden py-4 border-t ${
            darkMode ? 'border-gray-700 bg-gray-900/95' : 'border-gray-200 bg-white/95'
          } backdrop-blur-lg`}>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left font-medium ${
                  currentPage === 'home'
                    ? 'text-blue-600 dark:text-blue-400'
                    : darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentPage('about');
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left font-medium ${
                  currentPage === 'about'
                    ? 'text-blue-600 dark:text-blue-400'
                    : darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                About
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section Component
const HeroSection = ({ searchTerm, setSearchTerm, darkMode }) => {
  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Main Heading */}
        <div className="mb-8">
          <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Discover
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Amazing
            </span>
            <br />
            Restaurants
          </h1>
          <p className={`text-xl sm:text-2xl mb-12 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          } max-w-2xl mx-auto leading-relaxed`}>
            Find the perfect dining experience with our curated collection of restaurants
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <div className={`relative flex items-center rounded-2xl overflow-hidden shadow-2xl ${
            darkMode ? 'bg-gray-800/80' : 'bg-white/80'
          } backdrop-blur-lg border ${darkMode ? 'border-gray-700' : 'border-white/50'}`}>
            <Search className={`absolute left-4 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search restaurants or cuisines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-4 bg-transparent outline-none text-lg ${
                darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
        </div>

        {/* CTA Button */}
        <button className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <span>Explore Restaurants</span>
          <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
        </button>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto">
          <div className="text-center">
            <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {restaurantData.length}+
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Restaurants
            </div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {cuisineTypes.length - 1}+
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Cuisines
            </div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              4.6
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Avg Rating
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Page Component
const AboutPage = ({ darkMode }) => {
  return (
    <div className={`min-h-screen pt-20 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className={`text-4xl sm:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            About FoodieExplorer
          </h1>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Your ultimate companion for discovering exceptional dining experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className={`p-8 rounded-2xl ${
            darkMode ? 'bg-gray-800/50 backdrop-blur-lg border border-gray-700/50' : 'bg-white/80 backdrop-blur-lg border border-white/50'
          } shadow-xl`}>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Smart Discovery
            </h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Our intelligent search and filtering system helps you find exactly what you're craving, from cozy local bistros to fine dining establishments.
            </p>
          </div>

          <div className={`p-8 rounded-2xl ${
            darkMode ? 'bg-gray-800/50 backdrop-blur-lg border border-gray-700/50' : 'bg-white/80 backdrop-blur-lg border border-white/50'
          } shadow-xl`}>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Curated Reviews
            </h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Real ratings and authentic reviews from fellow food enthusiasts help you make informed decisions about your next dining adventure.
            </p>
          </div>

          <div className={`p-8 rounded-2xl ${
            darkMode ? 'bg-gray-800/50 backdrop-blur-lg border border-gray-700/50' : 'bg-white/80 backdrop-blur-lg border border-white/50'
          } shadow-xl`}>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Local Insights
            </h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Discover hidden gems in your neighborhood and explore diverse culinary landscapes across different locations and price points.
            </p>
          </div>

          <div className={`p-8 rounded-2xl ${
            darkMode ? 'bg-gray-800/50 backdrop-blur-lg border border-gray-700/50' : 'bg-white/80 backdrop-blur-lg border border-white/50'
          } shadow-xl`}>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Community Driven
            </h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Join a community of food lovers sharing their experiences, recommendations, and culinary adventures from around the world.
            </p>
          </div>
        </div>

        <div className={`text-center p-8 rounded-2xl ${
          darkMode ? 'bg-gray-800/50 backdrop-blur-lg border border-gray-700/50' : 'bg-white/80 backdrop-blur-lg border border-white/50'
        } shadow-xl`}>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Our Mission
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            At FoodieExplorer, we believe that great food brings people together. Our mission is to connect food lovers with exceptional dining experiences, 
            making it easier than ever to discover your next favorite restaurant. Whether you're looking for a quick bite, a romantic dinner, 
            or celebrating a special occasion, we're here to guide your culinary journey.
          </p>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = ({ darkMode }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className={`${
      darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
    } border-t`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FE</span>
              </div>
              <span className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                FoodieExplorer
              </span>
            </div>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Discover amazing restaurants and create unforgettable dining experiences.
            </p>
            <div className="flex gap-4">
              <a href="#" className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-800 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}>
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-800 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}>
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-800 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}>
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Restaurants', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className={`transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Cuisines
            </h3>
            <ul className="space-y-2">
              {cuisineTypes.slice(1, 5).map((cuisine) => (
                <li key={cuisine}>
                  <a href="#" className={`transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}>
                    {cuisine}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Stay Updated
            </h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 text-sm`}>
              Get the latest restaurant recommendations delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full px-3 py-2 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                type="submit"
                className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                  subscribed
                    ? 'bg-green-600 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:scale-105'
                }`}
              >
                {subscribed ? '✓ Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        <div className={`border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'} mt-8 pt-8 flex flex-col md:flex-row justify-between items-center`}>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
            © 2025 FoodieExplorer. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className={`text-sm transition-colors ${
              darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}>
              Privacy Policy
            </a>
            <a href="#" className={`text-sm transition-colors ${
              darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const FoodieExplorer = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [filters, setFilters] = useState({
    priceRange: [],
    cuisine: [],
    minRating: 0
  });
  const [displayedRestaurants, setDisplayedRestaurants] = useState(8);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  // Filter and sort restaurants
  const filteredRestaurants = restaurantData.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrice = filters.priceRange.length === 0 || filters.priceRange.includes(restaurant.priceRange);
    const matchesCuisine = filters.cuisine.length === 0 || filters.cuisine.includes(restaurant.cuisine);
    const matchesRating = restaurant.rating >= filters.minRating;

    return matchesSearch && matchesPrice && matchesCuisine && matchesRating;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return a.priceRange - b.priceRange;
      case 'price-high':
        return b.priceRange - a.priceRange;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // Infinite scroll logic
  const loadMore = useCallback(() => {
    if (displayedRestaurants < filteredRestaurants.length && !isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        setDisplayedRestaurants(prev => Math.min(prev + 8, filteredRestaurants.length));
        setIsLoading(false);
      }, 1000);
    }
  }, [displayedRestaurants, filteredRestaurants.length, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentLoadMoreRef = loadMoreRef.current;
    if (currentLoadMoreRef) {
      observer.observe(currentLoadMoreRef);
    }

    observerRef.current = observer;

    return () => {
      if (currentLoadMoreRef) {
        observer.unobserve(currentLoadMoreRef);
      }
    };
  }, [loadMore]);

  // Reset displayed count when filters change
  useEffect(() => {
    setDisplayedRestaurants(8);
  }, [searchTerm, filters, sortBy]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (currentPage === 'about') {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <Navbar 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode} 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
          />
          <AboutPage darkMode={darkMode} />
          <Footer darkMode={darkMode} />
        </div>
      </div>
    );
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Navbar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
        />
        
        <HeroSection 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          darkMode={darkMode} 
        />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={() => setIsFilterOpen(true)}
                className={`lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  darkMode 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-4 py-2 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="rating">Sort by Rating</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Showing {Math.min(displayedRestaurants, filteredRestaurants.length)} of {filteredRestaurants.length} restaurants
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filter Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className={`sticky top-24 p-6 rounded-2xl ${
                darkMode ? 'bg-gray-800/50 backdrop-blur-lg border border-gray-700/50' : 'bg-white/80 backdrop-blur-lg border border-white/50'
              } shadow-xl`}>
                <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Filters
                </h2>
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  darkMode={darkMode}
                  isOpen={true}
                  setIsOpen={() => {}}
                />
              </div>
            </div>

            {/* Mobile Filter Sidebar */}
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              darkMode={darkMode}
              isOpen={isFilterOpen}
              setIsOpen={setIsFilterOpen}
            />

            {/* Restaurant Grid */}
            <div className="flex-1">
              {filteredRestaurants.length === 0 ? (
                <div className={`text-center py-16 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">No restaurants found</h3>
                  <p>Try adjusting your search or filters</p>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredRestaurants.slice(0, displayedRestaurants).map((restaurant) => (
                      <RestaurantCard 
                        key={restaurant.id} 
                        restaurant={restaurant} 
                        darkMode={darkMode} 
                      />
                    ))}
                  </div>

                  {/* Load More Trigger */}
                  {displayedRestaurants < filteredRestaurants.length && (
                    <div ref={loadMoreRef} className="text-center py-8">
                      {isLoading && (
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                            Loading more restaurants...
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </main>

        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
};
