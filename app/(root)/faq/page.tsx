"use client";
// import { Navigation } from '../components/Navigation';
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "How accurate is the allergen information?",
    answer:
      "We work directly with restaurants to obtain their allergen information. However, we always recommend verifying with the restaurant staff when ordering, as ingredients and preparation methods can change.",
  },
  {
    question: "Is DineSmart free to use?",
    answer:
      "Yes! DineSmart is completely free for users. Our mission is to make dining out safer and more accessible for everyone with food allergies.",
  },
  {
    question: "How can restaurants join DineSmart?",
    answer:
      "Restaurants can contact us to add their establishment and allergen information to our database. We provide tools to help keep their allergen data up-to-date.",
  },
  {
    question: "What allergens do you track?",
    answer:
      "We track all major allergens including peanuts, tree nuts, milk, eggs, wheat, soy, fish, shellfish, sesame, and mustard. Restaurants can also add information about other allergens.",
  },
  {
    question: "Can I save my favorite restaurants?",
    answer:
      "Yes! Create a free account to save your favorite allergen-friendly restaurants as well as save allergen info for future use.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navigation /> */}
      {/* Header */}{" "}
      <header className="bg-white border-b border-gray-200">
        {" "}
        <div className="px-6 py-4 flex items-center justify-between">
          {" "}
          <Link
            href="/"
            className="text-2xl font-medium hover:opacity-80 transition-opacity"
          >
            {" "}
            DineSmart{" "}
          </Link>{" "}
          <nav className="flex gap-8">
            {" "}
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {" "}
              About{" "}
            </Link>{" "}
            <Link
              href="/faq"
              className="text-gray-900 font-medium"
            >
              {" "}
              FAQ{" "}
            </Link>{" "}
            <Link href="/account" className="text-gray-600 hover:text-gray-900 transition-colors">
              {" "}
              Account{" "}
            </Link>{" "}
          </nav>{" "}
        </div>{" "}
      </header>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl mb-8">Frequently Asked Questions</h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg pr-4">{faq.question}</span>
                <ChevronDown
                  className={`size-6 text-gray-400 transition-transform flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-8 pb-6 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
          <h2 className="text-2xl mb-4">Still have questions?</h2>
          <p className="text-gray-700 mb-6">
            We're here to help! Reach out to our support team anytime.
          </p>
          <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-xl transition-all">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
