"use client";

import { useState } from 'react';
import { Search, MapPin, UserCircle2, SlidersHorizontal, ChevronDown, Star } from 'lucide-react';
// import { useNavigate } from 'react-router';

const commonAllergens = [
  'Peanuts',
  'Tree Nuts',
  'Milk',
  'Eggs',
  'Wheat',
  'Soy',
  'Fish',
  'Shellfish',
  'Sesame',
  'Mustard',
];

const mockRestaurants = [
  {
    id: 1,
    name: 'The Garden Bistro',
    image: 'https://images.unsplash.com/photo-1657593088889-5105c637f2a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBkaW5pbmd8ZW58MXx8fHwxNzY5ODU0MzU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Bella Italia',
    image: 'https://images.unsplash.com/photo-1723608334799-e6398469cb04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MXx8fHwxNzY5ODY4NzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Sushi Palace',
    image: 'https://images.unsplash.com/photo-1621871908119-295c8ce5cee4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHJlc3RhdXJhbnQlMjBzdXNoaXxlbnwxfHx8fDE3Njk3ODQ2NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Tacos El Patron',
    image: 'https://images.unsplash.com/photo-1665541620643-38a95ca78e6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwcmVzdGF1cmFudCUyMHRhY29zfGVufDF8fHx8MTc2OTg2ODc3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.6,
  },
  {
    id: 5,
    name: 'Corner Café',
    image: 'https://images.unsplash.com/photo-1642647916129-3909c75c0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwY29mZmVlJTIwc2hvcHxlbnwxfHx8fDE3Njk4NzE4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.4,
  },
  {
    id: 6,
    name: 'Prime Steakhouse',
    image: 'https://images.unsplash.com/photo-1600251284086-6417eff9f5fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVha2hvdXNlJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3Njk3ODg0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
  },
  {
    id: 7,
    name: 'Green Leaf Kitchen',
    image: 'https://images.unsplash.com/photo-1657593088889-5105c637f2a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBkaW5pbmd8ZW58MXx8fHwxNzY5ODU0MzU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.3,
  },
  {
    id: 8,
    name: 'Ocean Blue Seafood',
    image: 'https://images.unsplash.com/photo-1621871908119-295c8ce5cee4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHJlc3RhdXJhbnQlMjBzdXNoaXxlbnwxfHx8fDE3Njk3ODQ2NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.7,
  },
  {
    id: 9,
    name: 'Pasta Paradise',
    image: 'https://images.unsplash.com/photo-1723608334799-e6398469cb04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MXx8fHwxNzY5ODY4NzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.6,
  },
];

export default function SearchByAllergens() {
//   const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('recommended');

  const toggleAllergen = (allergen: string) => {
    if (selectedAllergens.includes(allergen)) {
      setSelectedAllergens(selectedAllergens.filter(a => a !== allergen));
    } else {
      setSelectedAllergens([...selectedAllergens, allergen]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 flex items-center gap-6">
          {/* DineSmart Logo */}
          <button 
            // onClick={() => navigate('/')}
            className="text-2xl whitespace-nowrap hover:opacity-80 transition-opacity"
          >
            DineSmart
          </button>

          {/* Restaurant Search Bar (Centered) */}
          <div className="flex-1 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a restaurant..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <button 
            //   onClick={() => navigate('/search/location')}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap"
            >
              <MapPin className="size-5" />
              <span>Search by Location</span>
            </button>
            
            <button 
            //   onClick={() => navigate('/account')}
              className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              <UserCircle2 className="size-8" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Sort Controls */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-center gap-4">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg border-2 transition-all ${
              isFilterOpen ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <SlidersHorizontal className="size-5" />
            <span>Filter</span>
            {selectedAllergens.length > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-white text-gray-900 rounded-full text-sm">
                {selectedAllergens.length}
              </span>
            )}
          </button>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none cursor-pointer hover:border-gray-400 transition-colors"
            >
              <option value="recommended">Sort by: Recommended</option>
              <option value="rating">Sort by: Rating</option>
              <option value="distance">Sort by: Distance</option>
              <option value="name">Sort by: Name</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex">
        {/* Side Drawer - Filter Panel */}
        <div 
          className={`bg-white border-r border-gray-200 transition-all duration-300 overflow-y-auto ${
            isFilterOpen ? 'w-80' : 'w-0'
          }`}
          style={{ height: 'calc(100vh - 145px)' }}
        >
          {isFilterOpen && (
            <div className="p-6">
              <h2 className="text-xl mb-4">Filter by Allergens</h2>
              <p className="text-gray-600 text-sm mb-6">
                Select allergens to exclude from restaurants
              </p>
              
              <div className="space-y-3">
                {commonAllergens.map((allergen) => (
                  <label 
                    key={allergen}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAllergens.includes(allergen)}
                      onChange={() => toggleAllergen(allergen)}
                      className="size-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer"
                    />
                    <span className="text-gray-900">{allergen}</span>
                  </label>
                ))}
              </div>

              {selectedAllergens.length > 0 && (
                <button 
                  onClick={() => setSelectedAllergens([])}
                  className="w-full mt-6 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Restaurant Grid */}
        <div className="flex-1 p-6">
          <div className={`grid gap-6 ${
            isFilterOpen 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
          }`}>
            {mockRestaurants.map((restaurant) => (
              <div 
                key={restaurant.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg mb-2">{restaurant.name}</h3>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="size-5 fill-current" />
                    <span className="text-gray-900 ml-1">{restaurant.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
