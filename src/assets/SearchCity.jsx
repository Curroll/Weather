import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function SearchCity() {
    const [city, setCity] = useState("");
    const [coordinates, setCoordinates] = useState(null);

    const handleSearch = async () => {
        if (city.trim()) {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`);
                const data = await response.json();

                if (data.length > 0) {
                    const { lat, lon } = data[0];
                    setCoordinates({ lat, lon });
                    console.log(`Latitude: ${lat}, Longitude: ${lon}`);
                } else {
                    alert("City not found! Please enter a valid city name.");
                }
            } catch (error) {
                console.error("Error fetching coordinates:", error);
                alert("Failed to fetch coordinates. Try again later.");
            }
        } else {
            alert("Please enter a city name");
        }
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="flex flex-row items-center mb-2 gap-2">
                <input
                    id="city"
                    type="text"
                    className="border border-gray-400 rounded-full px-4 py-2 w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter city name..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button
                    className="px-4 py-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-all"
                    onClick={handleSearch}
                    aria-label="Search city"
                >
                    <i className="fas fa-search"></i>
                </button>
            </div>
            {coordinates && (
                <p className="text-sm text-gray-700">
                    Latitude: <strong>{coordinates.lat}</strong>, Longitude: <strong>{coordinates.lon}</strong>
                </p>
            )}
        </div>
    );
}

export default SearchCity;


