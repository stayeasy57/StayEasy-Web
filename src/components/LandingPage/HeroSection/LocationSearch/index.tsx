import { MapPin, Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const LocationSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<any>(null);
  const searchRef = useRef<any>(null);

  // Debounced search function
  const searchLocations = async (query:any) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=8&countrycodes=pk&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      
      // Filter and format results
      const formattedSuggestions = data
        .filter((item: any) => item.addresstype !== 'country')
        .map((item: any) => ({
          id: item.place_id,
          name: item.display_name.split(',')[0],
          fullAddress: item.display_name,
          type: item.addresstype || item.class,
          lat: item.lat,
          lon: item.lon
        }))
        .slice(0, 6);

      setSuggestions(formattedSuggestions);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change with debouncing
  const handleInputChange = (e : any) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(true);

    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set new timeout for debounced search
    debounceRef.current = setTimeout(() => {
      searchLocations(value);
    }, 300);
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: any) => {
    setSearchQuery(suggestion.name);
    setSuggestions([]);
    setShowSuggestions(false);
    // You can add additional logic here like storing coordinates
    console.log('Selected location:', suggestion);
  };

  // Handle search button click
  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    setShowSuggestions(false);
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-4" ref={searchRef}>
      <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-2 max-w-2xl mx-auto lg:mx-0">
        <div className="flex items-center">
        
          <div className="flex-1 flex items-center space-x-3 px-4">
            <MapPin className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for Hostels, PGs, Hotels, Apartments..."
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
              className="w-full py-4 outline-none text-gray-700 placeholder-gray-400 text-base"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-[#003B95] to-[#0056D6] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2"
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && (searchQuery.length > 1 || suggestions.length > 0) && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">
                <div className="animate-spin inline-block w-4 h-4 border-2 border-gray-300 border-t-[#003B95] rounded-full mr-2"></div>
                Searching locations...
              </div>
            ) : suggestions.length > 0 ? (
              <div className="py-2">
                {suggestions.map((suggestion: any) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#003B95]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-[#003B95]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">
                          {suggestion.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {suggestion.fullAddress}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 capitalize">
                        {suggestion.type}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : searchQuery.length > 1 ? (
              <div className="p-4 text-center text-gray-500">
                No locations found for "{searchQuery}"
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSearch;