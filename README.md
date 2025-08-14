import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Search, Filter, Star, MapPin, DollarSign, Moon, Sun, Menu, X, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

// Static travel data
const travelData = [
  {
    id: 1,
    name: "Santorini Sunset",
    location: "Santorini, Greece",
    price: 1299,
    rating: 4.8,
    reviews: 2847,
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&h=300&fit=crop",
    category: "beach",
    tags: ["romantic", "sunset", "luxury", "mediterranean"]
  },
  {
    id: 2,
    name: "Machu Picchu Adventure",
    location: "Cusco, Peru",
    price: 899,
    rating: 4.9,
    reviews: 1923,
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&h=300&fit=crop",
    category: "adventure",
    tags: ["hiking", "ancient", "mountains", "culture"]
  },
  {
    id: 3,
    name: "Tokyo Cultural Experience",
    location: "Tokyo, Japan",
    price: 1599,
    rating: 4.7,
    reviews: 3421,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
    category: "cultural",
    tags: ["city", "temples", "food", "technology"]
  },
  {
    id: 4,
    name: "Maldives Paradise",
    location: "Maldives",
    price: 2299,
    rating: 4.9,
    reviews: 1876,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    category: "beach",
    tags: ["luxury", "overwater", "diving", "romantic"]
  },
  {
    id: 5,
    name: "Safari Adventure",
    location: "Serengeti, Tanzania",
    price: 1899,
    rating: 4.8,
    reviews: 967,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop",
    category: "adventure",
    tags: ["wildlife", "safari", "photography", "nature"]
  },
  {
    id: 6,
    name: "Swiss Alps Retreat",
    location: "Zermatt, Switzerland",
    price: 1799,
    rating: 4.6,
    reviews: 1234,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    category: "adventure",
    tags: ["mountains", "skiing", "luxury", "nature"]
  },
  {
    id: 7,
    name: "Bali Temple Tour",
    location: "Ubud, Bali",
    price: 799,
    rating: 4.5,
    reviews: 2156,
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
    category: "cultural",
    tags: ["temples", "spiritual", "rice-terraces", "wellness"]
  },
  {
    id: 8,
    name: "Patagonia Expedition",
    location: "Torres del Paine, Chile",
    price: 2199,
    rating: 4.7,
    reviews: 743,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
    category: "adventure",
    tags: ["hiking", "glaciers", "wilderness", "photography"]
  },
  {
    id: 9,
    name: "Amalfi Coast Escape",
    location: "Positano, Italy",
    price: 1399,
    rating: 4.8,
    reviews: 1987,
    image: "https://images.unsplash.com/photo-1520637836862-4d197d17c91a?w=400&h=300&fit=crop",
    category: "beach",
    tags: ["coastal", "luxury", "food", "romantic"]
  },
  {
    id: 10,
    name: "Egyptian Wonders",
    location: "Cairo, Egypt",
    price: 1099,
    rating: 4.4,
    reviews: 1654,
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop",
    category: "cultural",
    tags: ["history", "pyramids", "ancient", "desert"]
  },
  {
    id: 11,
    name: "Northern Lights Iceland",
    location: "Reykjavik, Iceland",
    price: 1699,
    rating: 4.9,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=300&fit=crop",
    category: "adventure",
    tags: ["aurora", "glaciers", "geysers", "unique"]
  },
  {
    id: 12,
    name: "Thai Beach Hopping",
    location: "Phuket, Thailand",
    price: 699,
    rating: 4.6,
    reviews: 2876,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    category: "beach",
    tags: ["tropical", "islands", "budget", "nightlife"]
  }
];

// TravelCard Component
const TravelCard = ({ destination, darkMode }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    return stars;
  };

  return (
    <div className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
      darkMode ? 'bg-gray-800 shadow-gray-900/50' : 'bg-white'
    }`}>
      <div className="relative overflow-hidden h-48">
        {!imageLoaded && (
          <div className={`absolute inset-0 animate-pulse ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
        )}
        <img
          src={destination.image}
          alt={destination.name}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
          destination.category === 'beach' ? 'bg-blue-500 text-white' :
          destination.category === 'adventure' ? 'bg-green-500 text-white' :
          'bg-purple-500 text-white'
        }`}>
          {destination.category.charAt(0).toUpperCase() + destination.category.slice(1)}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {destination.name}
        </h3>
        
        <div className={`flex items-center mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{destination.location}</span>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="flex mr-2">{renderStars(destination.rating)}</div>
          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {destination.rating} ({destination.reviews} reviews)
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className={`flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <DollarSign className="w-5 h-5" />
            <span className="text-2xl font-bold">{destination.price}</span>
            <span className={`text-sm ml-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>/ person</span>
          </div>
          <button
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label={`Book ${destination.name}`}
          >
            Book Now
          </button>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-1">
          {destination.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs rounded-full ${
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
              }`}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Filter Panel Component
const FilterPanel = ({ filters, onFiltersChange, darkMode, isOpen, onClose }) => {
  const categories = ['all', 'beach', 'adventure', 'cultural'];
  const priceRanges = [
    { label: 'All Prices', min: 0, max: Infinity },
    { label: 'Under $1000', min: 0, max: 999 },
    { label: '$1000 - $1500', min: 1000, max: 1500 },
    { label: '$1500 - $2000', min: 1500, max: 2000 },
    { label: 'Over $2000', min: 2000, max: Infinity }
  ];

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}
      <div className={`fixed lg:sticky top-0 left-0 h-full lg:h-auto w-80 lg:w-full transform transition-transform duration-300 z-50 lg:z-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${darkMode ? 'bg-gray-800' : 'bg-white'} lg:bg-transparent shadow-lg lg:shadow-none p-6 overflow-y-auto`}>
        
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Filters</h2>
          <button onClick={onClose} className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className={`space-y-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} lg:p-6 lg:rounded-xl lg:shadow-lg`}>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} hidden lg:block`}>
            Filters
          </h3>
          
          {/* Category Filter */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
              className={`w-full p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Price Range
            </label>
            <select
              value={`${filters.priceRange.min}-${filters.priceRange.max}`}
              onChange={(e) => {
                const [min, max] = e.target.value.split('-').map(v => v === 'Infinity' ? Infinity : parseInt(v));
                onFiltersChange({ ...filters, priceRange: { min, max } });
              }}
              className={`w-full p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              {priceRanges.map((range, index) => (
                <option key={index} value={`${range.min}-${range.max}`}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Minimum Rating
            </label>
            <div className="space-y-2">
              {[4.0, 4.5, 4.7].map(rating => (
                <label key={rating} className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={filters.minRating === rating}
                    onChange={(e) => onFiltersChange({ ...filters, minRating: parseFloat(e.target.value) })}
                    className="mr-2 text-blue-500 focus:ring-blue-300"
                  />
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{rating}+ and above</span>
                  </div>
                </label>
              ))}
              <label className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  value={0}
                  checked={filters.minRating === 0}
                  onChange={(e) => onFiltersChange({ ...filters, minRating: parseFloat(e.target.value) })}
                  className="mr-2 text-blue-500 focus:ring-blue-300"
                />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Any Rating</span>
              </label>
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => onFiltersChange({
              category: 'all',
              priceRange: { min: 0, max: Infinity },
              minRating: 0
            })}
            className={`w-full py-2 px-4 rounded-lg border transition-colors duration-200 ${
              darkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
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

// Main App Component
const TravelWebsite = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: { min: 0, max: Infinity },
    minRating: 0
  });
  const [displayedItems, setDisplayedItems] = useState(6);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter destinations based on search and filters
  const filteredDestinations = useMemo(() => {
    return travelData.filter(destination => {
      const matchesSearch = 
        destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = filters.category === 'all' || destination.category === filters.category;
      const matchesPrice = destination.price >= filters.priceRange.min && destination.price <= filters.priceRange.max;
      const matchesRating = destination.rating >= filters.minRating;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });
  }, [searchQuery, filters]);

  const displayedDestinations = filteredDestinations.slice(0, displayedItems);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || 
        displayedItems >= filteredDestinations.length) {
      return;
    }
    setDisplayedItems(prev => Math.min(prev + 6, filteredDestinations.length));
  }, [displayedItems, filteredDestinations.length]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Reset displayed items when filters change
  useEffect(() => {
    setDisplayedItems(6);
  }, [searchQuery, filters]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Navigation */}
      <nav className={`sticky top-0 z-30 backdrop-blur-md transition-colors duration-300 ${
        darkMode ? 'bg-gray-900/90 border-gray-700' : 'bg-white/90 border-gray-200'
      } border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Wanderlust
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className={`hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Home
              </a>
              <a href="#" className={`hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Destinations
              </a>
              <a href="#" className={`hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                About
              </a>
              <a href="#" className={`hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Contact
              </a>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className={`md:hidden py-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex flex-col space-y-4">
                <a href="#" className={`hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Home
                </a>
                <a href="#" className={`hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Destinations
                </a>
                <a href="#" className={`hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  About
                </a>
                <a href="#" className={`hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Contact
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-96 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=400&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Explore breathtaking destinations around the world
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filter Panel */}
          <div className="lg:w-80 flex-shrink-0">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              darkMode={darkMode}
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search destinations, locations, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Showing {displayedDestinations.length} of {filteredDestinations.length} destinations
              </p>
            </div>

            {/* Destination Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayedDestinations.map(destination => (
                <TravelCard 
                  key={destination.id} 
                  destination={destination} 
                  darkMode={darkMode}
                />
              ))}
            </div>

            {/* Load More Indicator */}
            {displayedItems < filteredDestinations.length && (
              <div className="flex justify-center mt-8">
                <div className="animate-pulse text-center">
                  <div className={`w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2`} />
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Loading more destinations...
                  </p>
                </div>
              </div>
            )}

            {/* No Results */}
            {filteredDestinations.length === 0 && (
              <div className="text-center py-12">
                <div className={`text-6xl mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>🔍</div>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  No destinations found
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Try adjusting your search criteria or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`mt-16 border-t transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
                Wanderlust
              </div>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Discover amazing destinations and create unforgettable memories with our curated travel experiences.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors" aria-label="Facebook">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors" aria-label="Twitter">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors" aria-label="Instagram">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors" aria-label="Email">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Quick Links
              </h4>
              <div className="space-y-2">
                <a href="#" className={`block hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Home
                </a>
                <a href="#" className={`block hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Destinations
                </a>
                <a href="#" className={`block hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  About Us
                </a>
                <a href="#" className={`block hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Contact
                </a>
              </div>
            </div>
            
            <div>
              <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Support
              </h4>
              <div className="space-y-2">
                <a href="#" className={`block hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Help Center
                </a>
                <a href="#" className={`block hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Privacy Policy
                </a>
                <a href="#" className={`block hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Terms of Service
                </a>
                <a href="#" className={`block hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  FAQ
                </a>
              </div>
            </div>
          </div>
          
          <div className={`mt-8 pt-8 border-t text-center ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-600'}`}>
            <p>&copy; 2025 Wanderlust. All rights reserved. Made with ❤️ for travelers worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TravelWebsite;
