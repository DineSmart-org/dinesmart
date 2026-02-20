"use client";

import { useMemo, useRef, useState } from "react";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  ChevronDown,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";

const commonAllergens = [
  "Peanuts",
  "Tree Nuts",
  "Milk",
  "Eggs",
  "Wheat",
  "Soy",
  "Fish",
  "Shellfish",
  "Sesame",
  "Mustard",
] as const;

type Allergen = (typeof commonAllergens)[number];

type Restaurant = {
  id: number;
  name: string;
  image: string;
  rating: number;
  distanceMiles: number;
  allergensPresent: Allergen[];
};

const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "The Garden Bistro",
    image:
      "https://images.unsplash.com/photo-1657593088889-5105c637f2a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBkaW5pbmd8ZW58MXx8fHwxNzY5ODU0MzU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.5,
    distanceMiles: 1.2,
    allergensPresent: ["Milk", "Eggs", "Wheat", "Soy"],
  },
  {
    id: 2,
    name: "Bella Italia",
    image:
      "https://images.unsplash.com/photo-1723608334799-e6398469cb04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MXx8fHwxNzY5ODY4NzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.8,
    distanceMiles: 2.9,
    allergensPresent: ["Milk", "Eggs", "Wheat"],
  },
  {
    id: 3,
    name: "Sushi Palace",
    image:
      "https://images.unsplash.com/photo-1621871908119-295c8ce5cee4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHJlc3RhdXJhbnQlMjBzdXNoaXxlbnwxfHx8fDE3Njk3ODQ2NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.7,
    distanceMiles: 4.1,
    allergensPresent: ["Fish", "Shellfish", "Soy", "Sesame"],
  },
  {
    id: 4,
    name: "Tacos El Patron",
    image:
      "https://images.unsplash.com/photo-1665541620643-38a95ca78e6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwcmVzdGF1cmFudCUyMHRhY29zfGVufDF8fHx8MTc2OTg2ODc3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.6,
    distanceMiles: 3.6,
    allergensPresent: ["Wheat", "Milk"],
  },
  {
    id: 5,
    name: "Corner Café",
    image:
      "https://images.unsplash.com/photo-1642647916129-3909c75c0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwY29mZmVlJTIwc2hvcHxlbnwxfHx8fDE3Njk4NzE4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.4,
    distanceMiles: 0.8,
    allergensPresent: ["Milk", "Tree Nuts", "Wheat"],
  },
  {
    id: 6,
    name: "Prime Steakhouse",
    image:
      "https://images.unsplash.com/photo-1600251284086-6417eff9f5fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVha2hvdXNlJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3Njk3ODg0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.9,
    distanceMiles: 6.3,
    allergensPresent: ["Mustard", "Milk"],
  },
  {
    id: 7,
    name: "Green Leaf Kitchen",
    image:
      "https://images.unsplash.com/photo-1657593088889-5105c637f2a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBkaW5pbmd8ZW58MXx8fHwxNzY5ODU0MzU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.3,
    distanceMiles: 1.9,
    allergensPresent: ["Soy", "Sesame"],
  },
  {
    id: 8,
    name: "Ocean Blue Seafood",
    image:
      "https://images.unsplash.com/photo-1621871908119-295c8ce5cee4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHJlc3RhdXJhbnQlMjBzdXNoaXxlbnwxfHx8fDE3Njk3ODQ2NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.7,
    distanceMiles: 7.4,
    allergensPresent: ["Fish", "Shellfish"],
  },
  {
    id: 9,
    name: "Pasta Paradise",
    image:
      "https://images.unsplash.com/photo-1723608334799-e6398469cb04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MXx8fHwxNzY5ODY4NzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.6,
    distanceMiles: 5.2,
    allergensPresent: ["Milk", "Eggs", "Wheat"],
  },
];

function isAllergenFree(r: Restaurant, allergen: Allergen) {
  return !r.allergensPresent.includes(allergen);
}

export default function SearchByAllergens() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedAllergens, setSelectedAllergens] = useState<Allergen[]>([]);
  const [sortBy, setSortBy] = useState<"recommended" | "rating" | "distance" | "name">("recommended");

  const isResultsMode = searchQuery.trim().length > 0 || selectedAllergens.length > 0;

  const toggleAllergen = (allergen: Allergen) => {
    setSelectedAllergens((prev) =>
      prev.includes(allergen) ? prev.filter((a) => a !== allergen) : [...prev, allergen]
    );
  };

  const filteredRestaurants = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    let list = mockRestaurants.filter((r) => {
      const matchesName = q === "" || r.name.toLowerCase().includes(q);
      const passesAllergenFilters =
        selectedAllergens.length === 0 || selectedAllergens.every((a) => isAllergenFree(r, a));
      return matchesName && passesAllergenFilters;
    });

    if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sortBy === "distance") list = [...list].sort((a, b) => a.distanceMiles - b.distanceMiles);
    if (sortBy === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [searchQuery, selectedAllergens, sortBy]);

  const discoveryRows = useMemo(() => {
    return commonAllergens.map((allergen) => {
      const items = mockRestaurants
        .filter((r) => isAllergenFree(r, allergen))
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 12);
      return { allergen, items };
    });
  }, []);

  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollRowOneCard = (allergen: Allergen, direction: "left" | "right") => {
    const el = rowRefs.current[allergen];
    if (!el) return;

    const firstCard = el.querySelector<HTMLElement>("[data-card='restaurant']");
    if (!firstCard) return;

    const styles = window.getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const step = firstCard.offsetWidth + gap;

    const current = el.scrollLeft;
    const index = Math.round(current / step);
    const nextIndex = direction === "left" ? Math.max(0, index - 1) : index + 1;
    el.scrollTo({ left: nextIndex * step, behavior: "smooth" });
  };

  const jumpToAllergenResults = (allergen: Allergen) => {
    setSelectedAllergens([allergen]);
    setIsFilterOpen(true);
  };

  const cardWidthClass = isFilterOpen
    ? "w-[clamp(200px,20vw,240px)]"
    : "w-[clamp(220px,20vw,260px)]";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 max-w-7xl mx-auto flex items-center gap-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterOpen((v) => !v)}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg border-2 transition-all ${
                isFilterOpen ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300 hover:border-gray-400"
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
                onChange={(e) => setSortBy(e.target.value as any)}
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

          <div className="flex items-center gap-4">
            <Link href="/search/locations">
              <button className="cursor-pointer flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap">
                <MapPin className="size-5" />
                <span>Search by Location</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative" style={{ height: "calc(100vh - 145px)" }}>
        <aside
          className={`absolute left-0 top-0 h-full w-80 bg-white border-r border-gray-200 z-20 transform transition-transform duration-300 ${
            isFilterOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl mb-1">Filter by Allergens</h2>
                <p className="text-gray-600 text-sm">Select allergens to exclude from restaurants</p>
              </div>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close filters"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-6 space-y-3">
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
        </aside>

        <div className={`h-full overflow-y-auto transition-[padding-left] duration-300 ${isFilterOpen ? "pl-80" : "pl-0"}`}>
          <main className="p-6">
            {!isResultsMode && (
              <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                  <h1 className="text-2xl mb-2">Browse by Allergen</h1>
                  <p className="text-gray-600">Use arrows to browse “absolutely free” picks.</p>
                </div>

                <div className="space-y-10">
                  {discoveryRows.map(({ allergen, items }) => (
                    <section key={allergen}>
                      <div className="flex items-end justify-between mb-3">
                        <div>
                          <h2 className="text-xl">
                            Absolutely <span className="font-semibold">{allergen}</span> free
                          </h2>
                          <p className="text-sm text-gray-600">Top picks (mock) that don’t include {allergen}.</p>
                        </div>

                        <button
                          onClick={() => jumpToAllergenResults(allergen)}
                          className="text-sm text-gray-900 hover:underline"
                        >
                          View all
                        </button>
                      </div>

                      <div className="relative">
                        <button
                          onClick={() => scrollRowOneCard(allergen, "left")}
                          className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 shadow-sm rounded-full p-2 hover:bg-gray-50"
                          aria-label={`Scroll ${allergen} row left`}
                        >
                          <ChevronLeft className="size-5" />
                        </button>

                        <div
                          ref={(el) => {
                            rowRefs.current[allergen] = el;
                          }}
                          className="
                            flex gap-4 overflow-x-auto px-2 pb-2
                            snap-x snap-mandatory scroll-smooth
                            [scrollbar-width:none] [-ms-overflow-style:none]
                            [&::-webkit-scrollbar]:hidden
                          "
                        >
                          {items.map((restaurant) => (
                            <div
                              key={restaurant.id}
                              data-card="restaurant"
                              className={`snap-start flex-none ${cardWidthClass} bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer`}
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
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1 text-yellow-500">
                                    <Star className="size-5 fill-current" />
                                    <span className="text-gray-900 ml-1">{restaurant.rating}</span>
                                  </div>
                                  <span className="text-sm text-gray-600">{restaurant.distanceMiles.toFixed(1)} mi</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => scrollRowOneCard(allergen, "right")}
                          className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 shadow-sm rounded-full p-2 hover:bg-gray-50"
                          aria-label={`Scroll ${allergen} row right`}
                        >
                          <ChevronRight className="size-5" />
                        </button>
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            )}

            {isResultsMode && (
              <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                  <h2 className="text-2xl mb-1">Restaurants</h2>
                  <p className="text-gray-600 text-sm">
                    {filteredRestaurants.length} result{filteredRestaurants.length === 1 ? "" : "s"}
                    {selectedAllergens.length > 0 ? ` • Excluding: ${selectedAllergens.join(", ")}` : ""}
                    {searchQuery.trim() ? ` • Searching: "${searchQuery.trim()}"` : ""}
                  </p>
                </div>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                  {filteredRestaurants.map((restaurant) => (
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
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-yellow-500">
                            <Star className="size-5 fill-current" />
                            <span className="text-gray-900 ml-1">{restaurant.rating}</span>
                          </div>
                          <span className="text-sm text-gray-600">{restaurant.distanceMiles.toFixed(1)} mi</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}