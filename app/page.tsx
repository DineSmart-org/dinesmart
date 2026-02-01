import { Hamburger, MapPin } from 'lucide-react';
// import { useNavigate } from 'react-router';

export default function Home() {
  // const navigate = useNavigate();

  return (
    <div className="relative min-h-dvh w-full">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1769638913684-87c75872fda7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZnJlc2glMjBzYWxhZCUyMGJvd2x8ZW58MXx8fHwxNzY5ODg2OTQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')` }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-dvh w-full flex flex-col">
        {/* Navigation Bar */}
        <nav className="p-6">
          <div className="flex gap-8 justify-end">
            <a href="/about" className="text-white hover:text-white/80 transition-colors">
              About
            </a>
            <a href="/faq" className="text-white hover:text-white/80 transition-colors">
              FAQ
            </a>
            <a href="/account" className="text-white hover:text-white/80 transition-colors">
              Account
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
          {/* Tagline */}
          <div className="text-center mb-12">
            <h1 className="text-white text-6xl md:text-7xl mb-4">
              DineSmart
            </h1>
            <p className="text-white/90 text-xl md:text-2xl">
              Dine safely, worry-free. Find allergen information for restaurants near you.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              // onClick={() => navigate('/search/allergens')}
              className="bg-white hover:bg-white/90 text-gray-900 px-8 py-6 rounded-2xl transition-all shadow-lg hover:shadow-xl min-w-[240px]"
            >
              <div className="flex items-center justify-center gap-3">
                <Hamburger className="size-6" />
                <span className="text-lg">Search by Allergens</span>
              </div>
            </button>
            <button 
              // onClick={() => navigate('/search/location')}
              className="bg-white hover:bg-white/90 text-gray-900 px-8 py-6 rounded-2xl transition-all shadow-lg hover:shadow-xl min-w-[240px]"
            >
              <div className="flex items-center justify-center gap-3">
                <MapPin className="size-6" />
                <span className="text-lg">Search by Location</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
