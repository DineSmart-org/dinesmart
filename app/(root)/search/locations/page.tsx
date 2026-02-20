"use client";
import {Navigation} from '@/components/Navigation';
import { useState } from "react";
import { Search, MapPin, UserCircle2, Star, Minus, Plus, Wheat } from "lucide-react";
import Link from "next/link";
import MapComponent, { NearbyRestaurant } from "@/components/map/MapComponent";

export default function SearchByLocation() {
  const [locationQuery, setLocationQuery] = useState("Blacksburg, VA");
  const [restaurants, setRestaurants] = useState<NearbyRestaurant[]>([]);
  const [selected, setSelected] = useState<NearbyRestaurant | null>(null);
  const [restaurantQuery, setRestaurantQuery] = useState("");
  const [searchRange, setSearchRange] = useState(5);

  const increaseRange = () => setSearchRange((prev) => Math.min(prev + 5, 50));
  const decreaseRange = () => setSearchRange((prev) => Math.max(prev - 5, 1));

  const filteredRestaurants = restaurants.filter(
    (r) =>
      r.distanceMiles <= searchRange &&
      (restaurantQuery === "" ||
        r.name.toLowerCase().includes(restaurantQuery.toLowerCase()))
  );

  return (
    <div className="h-dvh bg-gray-50 flex flex-col overflow-hidden">
      {/* Top Navigation Bar */}
      <Navigation />
      <div className="bg-white border-b border-gray-200 flex-shrink-0">
        <div className="px-6 py-4 flex items-center gap-6">
          {/* Search Fields Container - Centered */}
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-4 w-full max-w-3xl">
              {/* Location Search */}
              <div className="flex-1">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input
                    type="text"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
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

          {/* Search Range Control */}
      <div className="bg-white px-6 py-4 flex-shrink-0">
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

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
          <Link href="/search/allergens">
              <button
                className="cursor-pointer flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap"
              >
                <Wheat className="size-5" />
                <span>Search by Allergens</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main page content */}
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col lg:flex-row gap-4 p-4 md:p-6">
        {/* Map Section */}
        <div className="bg-gray-100 min-w-0 min-h-0 rounded-lg overflow-hidden shadow-sm border border-gray-200 flex-[0_0_45%] lg:flex-1">
          <div className="relative w-full h-full">
            <MapComponent
              radiusMiles={searchRange}
              locationQuery={locationQuery}
              selectedPlaceId={selected?.placeId ?? null}
              onResults={(res) => {
                setRestaurants(res);
                if (selected && !res.some((x) => x.placeId === selected.placeId))
                  setSelected(null);
              }}
              onSelect={setSelected}
            />
          </div>
        </div>

        {/* Restaurant List */}
        <div className="bg-white flex flex-col min-h-0 flex-1 lg:flex-none lg:w-96 xl:w-[28rem] rounded-lg overflow-hidden shadow-sm border border-gray-200">
          <div className="p-4 md:p-6 border-b border-gray-200 flex-shrink-0">
            <h2 className="text-xl md:text-2xl mb-2">Nearby Restaurants</h2>
            <p className="text-gray-600 text-sm md:text-base">
              {filteredRestaurants.length} restaurant
              {filteredRestaurants.length !== 1 ? "s" : ""} found within{" "}
              {searchRange} miles
            </p>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto px-4 md:px-6 py-4 pb-6">
            <div className="space-y-4">
              {filteredRestaurants.map((restaurant) => (
                <div
                  key={restaurant.placeId}
                  onClick={() => setSelected(restaurant)}
                  className={[
                    "rounded-xl p-4 transition-colors cursor-pointer border",
                    selected?.placeId === restaurant.placeId
                      ? "bg-gray-100 border-gray-400"
                      : "bg-gray-50 hover:bg-gray-100 border-gray-200",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg mb-1">{restaurant.name}</h3>
                      <div className="flex items-center gap-4 text-gray-600 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="size-4" />
                          <span>{restaurant.distanceMiles.toFixed(1)} mi</span>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="size-4 fill-current" />
                          <span className="text-gray-900">
                            {restaurant.rating ?? "—"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Safe from allergens:
                    </p>
                    <p className="text-sm text-gray-500">Not available yet</p>
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