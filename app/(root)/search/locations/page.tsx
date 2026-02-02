"use client";

import { useState } from 'react';
import { Search, MapPin, UserCircle2, Star, Minus, Plus } from 'lucide-react';
import Link from 'next/link'
import MapComponent from "@/components/map/MapComponent";

const mockRestaurants = [
  {
    id: 1,
    name: 'The Garden Bistro',
    distance: 0.3,
    rating: 4.5,
    safeAllergens: ['Peanuts', 'Tree Nuts', 'Shellfish'],
  },
  {
    id: 2,
    name: 'Bella Italia',
    distance: 0.5,
    rating: 4.8,
    safeAllergens: ['Peanuts', 'Fish', 'Shellfish', 'Sesame'],
  },
  {
    id: 3,
    name: 'Sushi Palace',
    distance: 0.8,
    rating: 4.7,
    safeAllergens: ['Milk', 'Eggs', 'Wheat'],
  },
  {
    id: 4,
    name: 'Tacos El Patron',
    distance: 1.2,
    rating: 4.6,
    safeAllergens: ['Tree Nuts', 'Fish', 'Shellfish', 'Eggs'],
  },
  {
    id: 5,
    name: 'Corner Café',
    distance: 1.5,
    rating: 4.4,
    safeAllergens: ['Peanuts', 'Tree Nuts', 'Soy', 'Fish'],
  },
  {
    id: 6,
    name: 'Prime Steakhouse',
    distance: 2.1,
    rating: 4.9,
    safeAllergens: ['Wheat', 'Soy', 'Sesame'],
  },
  {
    id: 7,
    name: 'Green Leaf Kitchen',
    distance: 2.4,
    rating: 4.3,
    safeAllergens: ['Milk', 'Eggs', 'Fish', 'Shellfish'],
  },
  {
    id: 8,
    name: 'Ocean Blue Seafood',
    distance: 3.2,
    rating: 4.7,
    safeAllergens: ['Peanuts', 'Tree Nuts', 'Milk', 'Wheat'],
  },
  {
    id: 9,
    name: 'Pasta Paradise',
    distance: 3.8,
    rating: 4.6,
    safeAllergens: ['Peanuts', 'Fish', 'Shellfish'],
  },
  {
    id: 10,
    name: 'Spice Route Indian',
    distance: 4.2,
    rating: 4.5,
    safeAllergens: ['Tree Nuts', 'Eggs', 'Soy'],
  },
];

export default function SearchByLocation() {
  // const [locationQuery, setLocationQuery] = useState('San Francisco, CA');
  const [restaurantQuery, setRestaurantQuery] = useState('');
  const [searchRange, setSearchRange] = useState(5);

  const increaseRange = () => {
    setSearchRange(prev => Math.min(prev + 5, 50));
  };

  const decreaseRange = () => {
    setSearchRange(prev => Math.max(prev - 5, 1));
  };

  const filteredRestaurants = mockRestaurants.filter(restaurant => 
    restaurant.distance <= searchRange &&
    (restaurantQuery === '' || restaurant.name.toLowerCase().includes(restaurantQuery.toLowerCase()))
  );

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 flex-shrink-0">
        <div className="px-6 py-4 flex items-center gap-6">
          {/* DineSmart Logo */}
          <Link href="/">
            <button
              className="cursor-pointer text-2xl whitespace-nowrap hover:opacity-80 transition-opacity"
            >
              DineSmart
            </button>
          </Link>

          {/* Search Fields Container - Centered */}
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-4 w-full max-w-3xl">
              {/* Location Search */}
              <div className="flex-1">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input
                    type="text"
                    // value={locationQuery}
                    // onChange={(e) => setLocationQuery(e.target.value)}
                    placeholder="Enter location..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* Restaurant Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input
                    type="text"
                    value={restaurantQuery}
                    onChange={(e) => setRestaurantQuery(e.target.value)}
                    placeholder="Search restaurants..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <Link href="/search/allergens">
              <button
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap"
              >
                Search by Allergens
              </button>
            </Link>
            
            <Link href="/account">
              <button
                className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
              >
                <UserCircle2 className="size-8" />
              </button>
            </Link>
            
          </div>
        </div>
      </div>

      {/* Search Range Control */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <span className="text-gray-700">Search Range:</span>
          <button 
            onClick={decreaseRange}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={searchRange <= 1}
          >
            <Minus className="size-5" />
          </button>
          <span className="min-w-[100px] text-center">{searchRange} miles</span>
          <button 
            onClick={increaseRange}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={searchRange >= 50}
          >
            <Plus className="size-5" />
          </button>
          <input
            type="range"
            min="1"
            max="50"
            value={searchRange}
            onChange={(e) => setSearchRange(Number(e.target.value))}
            className="w-32 sm:w-48 md:w-64 accent-gray-900"
          />
        </div>
      </div>

      {/* Main Content - Map and Restaurant List */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
        {/* Map Section - Wider Ratio */}
        <div className="flex items-center justify-center bg-gray-100 p-3 md:p-6 lg:flex-1 min-w-0">
          <div className="relative w-full aspect-[4/3] min-h-[320px] rounded-lg overflow-hidden shadow-lg bg-gray-200">
            <div className="absolute inset-0">
              <MapComponent />
            </div>
            
            {/* Map Controls Placeholder */}
            {/* <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-white rounded-lg shadow-lg p-2 md:p-3 space-y-2">
              <button className="block p-1.5 md:p-2 hover:bg-gray-100 rounded transition-colors">+</button>
              <div className="border-t border-gray-300"></div>
              <button className="block p-1.5 md:p-2 hover:bg-gray-100 rounded transition-colors">−</button>
            </div> */}

            {/* Location Indicator */}
            {/* <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-white rounded-lg shadow-lg px-3 py-1.5 md:px-4 md:py-2">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 md:size-5 text-red-500" />
                <span className="text-sm md:text-base">{locationQuery}</span>
              </div>
            </div> */}
          </div>
        </div>

        {/* Restaurant List - Fixed Width, Right Side with Independent Scroll */}
        <div className="bg-white flex flex-col min-h-0 flex-1 lg:flex-none lg:w-96 xl:w-[28rem]">
          <div className="p-4 md:p-6 border-b border-gray-200 flex-shrink-0">
            <h2 className="text-xl md:text-2xl mb-2">Nearby Restaurants</h2>
            <p className="text-gray-600 text-sm md:text-base">
              {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} found within {searchRange} miles
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
            <div className="space-y-4">
              {filteredRestaurants.map((restaurant) => (
                <div 
                  key={restaurant.id}
                  className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg mb-1">{restaurant.name}</h3>
                      <div className="flex items-center gap-4 text-gray-600 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="size-4" />
                          <span>{restaurant.distance} mi</span>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="size-4 fill-current" />
                          <span className="text-gray-900">{restaurant.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Safe from allergens:</p>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.safeAllergens.map((allergen) => (
                        <span 
                          key={allergen}
                          className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs"
                        >
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredRestaurants.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No restaurants found</p>
                <p className="mt-2">Try increasing your search range</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}