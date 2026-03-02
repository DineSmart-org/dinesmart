"use client";
import {Navigation} from '@/components/Navigation';
import {Footer} from '@/components/Footer';

import { useState } from 'react';
import Link from 'next/link';
import { User, X, Mail, Phone } from 'lucide-react';

const ALLERGEN_OPTIONS = [
  'Peanuts',
  'Tree Nuts',
  'Milk',
  'Eggs',
  'Wheat',
  'Soy',
  'Fish',
  'Shellfish',
  'Sesame',
  'Gluten',
  'Corn',
  'Mustard',
  'Celery',
  'Lupin',
  'Sulfites',
];

const DIETARY_OPTIONS = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Kosher',
  'Halal',
  'Low-Carb',
  'Keto',
  'Paleo',
  'Pescatarian',
];

export default function Account() {
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  
  // Mock user data
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
  };

  const addAllergen = (allergen: string) => {
    if (!selectedAllergens.includes(allergen)) {
      setSelectedAllergens([...selectedAllergens, allergen]);
    }
  };

  const removeAllergen = (allergen: string) => {
    setSelectedAllergens(selectedAllergens.filter(a => a !== allergen));
  };

  const addDietary = (dietary: string) => {
    if (!selectedDietary.includes(dietary)) {
      setSelectedDietary([...selectedDietary, dietary]);
    }
  };

  const removeDietary = (dietary: string) => {
    setSelectedDietary(selectedDietary.filter(d => d !== dietary));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navigation />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-12">
          <div className="size-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
            <User className="size-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl mb-1">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Allergens Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl mb-6">Food Allergens</h2>
          
          {/* Selected Allergens */}
          {selectedAllergens.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm text-gray-600 mb-3">Your Allergens</h3>
              <div className="flex flex-wrap gap-2">
                {selectedAllergens.map((allergen) => (
                  <button
                    key={allergen}
                    onClick={() => removeAllergen(allergen)}
                    className="flex items-center gap-2 bg-red-50 border-2 border-red-200 text-red-800 px-4 py-2 rounded-xl hover:bg-red-100 transition-colors"
                  >
                    <span>{allergen}</span>
                    <X className="size-4" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Allergen Options */}
          <div>
            <h3 className="text-sm text-gray-600 mb-3">Available Allergens</h3>
            <div className="flex flex-wrap gap-2">
              {ALLERGEN_OPTIONS.filter(a => !selectedAllergens.includes(a)).map((allergen) => (
                <button
                  key={allergen}
                  onClick={() => addAllergen(allergen)}
                  className="bg-gray-100 border-2 border-gray-200 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-200 hover:border-gray-300 transition-colors"
                >
                  {allergen}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dietary Restrictions Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl mb-6">Dietary Restrictions</h2>
          
          {/* Selected Dietary */}
          {selectedDietary.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm text-gray-600 mb-3">Your Dietary Preferences</h3>
              <div className="flex flex-wrap gap-2">
                {selectedDietary.map((dietary) => (
                  <button
                    key={dietary}
                    onClick={() => removeDietary(dietary)}
                    className="flex items-center gap-2 bg-green-50 border-2 border-green-200 text-green-800 px-4 py-2 rounded-xl hover:bg-green-100 transition-colors"
                  >
                    <span>{dietary}</span>
                    <X className="size-4" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dietary Options */}
          <div>
            <h3 className="text-sm text-gray-600 mb-3">Available Options</h3>
            <div className="flex flex-wrap gap-2">
              {DIETARY_OPTIONS.filter(d => !selectedDietary.includes(d)).map((dietary) => (
                <button
                  key={dietary}
                  onClick={() => addDietary(dietary)}
                  className="bg-gray-100 border-2 border-gray-200 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-200 hover:border-gray-300 transition-colors"
                >
                  {dietary}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
}