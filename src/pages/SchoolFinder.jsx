import React, { useState, useEffect, useRef, useContext } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { Context } from '../../Context/ContextProvider';

const SchoolFinder = () => {
    const { addFavorite,addRecentlyViewed } = useContext(Context);
    const [schools, setSchools] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const mapRef = useRef(null);
    const userMarkerRef = useRef(null);
    const rangeCircleRef = useRef(null);
    const schoolMarkersRef = useRef([]);
    const activeSchoolMarkerRef = useRef(null);

    const { state } = useLocation();
    // const {  } = state || {};
    // console.log("state", state.searchData.location)
    const [locationInput, setLocationInput] = useState(state.searchData.location);

    // Initialize map
    useEffect(() => {
        mapRef.current = L.map('map').setView([24.8607, 67.0011], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(mapRef.current);

        // Load default location
        geocode('Karachi');

        return () => {
            mapRef.current.remove();
        };
    }, []);


    const geocode = async (query) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`
            );
            const data = await response.json();

            if (!data || !data.length) throw new Error('Location not found');

            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);

            setCurrentLocation({ lat, lng: lon });
            showOnMap(lat, lon);
            searchSchoolsOverpass(lat, lon);
        } catch (err) {
            setError(err.message);
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const showOnMap = (lat, lon) => {
        mapRef.current.setView([lat, lon], 12);

        // Remove existing user marker and range circle
        if (userMarkerRef.current) mapRef.current.removeLayer(userMarkerRef.current);
        if (rangeCircleRef.current) mapRef.current.removeLayer(rangeCircleRef.current);

        // Add new user marker and range circle
        userMarkerRef.current = L.marker([lat, lon])
            .addTo(mapRef.current)
            .bindPopup('Your Location')
            .openPopup();

        rangeCircleRef.current = L.circle([lat, lon], {
            radius: 5000,
            color: 'blue',
            fillColor: '#30f',
            fillOpacity: 0.2
        }).addTo(mapRef.current);
    };

    const getAddressFromOSM = (tags) => {
        const addressParts = [];
        if (tags['addr:housenumber']) addressParts.push(tags['addr:housenumber']);
        if (tags['addr:street']) addressParts.push(tags['addr:street']);
        if (tags['addr:city']) addressParts.push(tags['addr:city']);

        if (addressParts.length > 0) return addressParts.join(', ');
        if (tags['address']) return tags['address'];
        if (tags['name']) return tags['name'];

        return 'Address not available';
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Earth radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const formatDistance = (distance) => {
        if (distance < 1) return Math.round(distance * 1000) + ' meters';
        return distance.toFixed(1) + ' km';
    };

    const searchSchoolsOverpass = async (lat, lon) => {
        try {
            setLoading(true);
            setError(null);
            setSchools([]);
            clearSchoolMarkers();

            const query = `[out:json];
        (
          node["amenity"="school"](around:5000,${lat},${lon});
          way["amenity"="school"](around:5000,${lat},${lon});
          relation["amenity"="school"](around:5000,${lat},${lon});
        );
        out center;
        >;
        out skel qt;`;

            const response = await fetch('https://overpass-api.de/api/interpreter', {
                method: 'POST',
                body: query,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

            const data = await response.json();

            if (!data.elements.length) {
                setError('No schools found in this area');
                return;
            }

            const schoolsData = data.elements.map((el) => {
                const schoolLat = el.lat || el.center?.lat;
                const schoolLon = el.lon || el.center?.lon;
                const name = el.tags?.name || 'Unnamed School';

                // Calculate distance from searched location to school
                const dist = calculateDistance(lat, lon, schoolLat, schoolLon);
                const distance = formatDistance(dist);

                const address = getAddressFromOSM(el.tags || {});

                return {
                    id: el.id,
                    name,
                    address,
                    distance,
                    lat: schoolLat,
                    lon: schoolLon,
                    tags: el.tags || {}
                };
            });

            setSchools(schoolsData);
            addSchoolMarkers(schoolsData);
        } catch (err) {
            console.error(err);
            setError('Failed to load school data');
        } finally {
            setLoading(false);
        }
    };

    const addSchoolMarkers = (schoolsData) => {
        clearSchoolMarkers();

        const defaultIcon = L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        });

        const highlightedIcon = L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            iconSize: [35, 51],
            iconAnchor: [17, 51],
            popupAnchor: [1, -44],
            className: 'highlighted-marker'
        });

        const markers = schoolsData.map((school) => {
            const marker = L.marker([school.lat, school.lon], {
                icon: defaultIcon,
                schoolId: school.id
            }).addTo(mapRef.current).bindPopup(`
        <b>${school.name}</b><br>
        ${school.address}<br>
        Distance: ${school.distance}
      `);

            return marker;
        });

        schoolMarkersRef.current = markers;
    };

    const clearSchoolMarkers = () => {
        schoolMarkersRef.current.forEach(marker => {
            mapRef.current.removeLayer(marker);
        });
        schoolMarkersRef.current = [];
        activeSchoolMarkerRef.current = null;
    };

    const handleSchoolClick = (school) => {
        // Center map on the school
        mapRef.current.setView([school.lat, school.lon], 15);
         addRecentlyViewed(school);
        // Find and highlight the corresponding marker
        const marker = schoolMarkersRef.current.find(m =>
            m.options.schoolId === school.id
        );

        if (marker) {
            if (activeSchoolMarkerRef.current) {
                activeSchoolMarkerRef.current.setIcon(L.icon({
                    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34]
                }));
            }

            marker.setIcon(L.icon({
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                iconSize: [35, 51],
                iconAnchor: [17, 51],
                popupAnchor: [1, -44],
                className: 'highlighted-marker'
            }));

            marker.openPopup();
            activeSchoolMarkerRef.current = marker;
        }
    };

    const handleSearch = () => {
        const query = state.searchData.location;
        if (!query) return alert('Please enter a location');
        geocode(query);
    };

    const handleCurrentLocation = () => {
        if (!navigator.geolocation) return alert('Geolocation not supported');

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setLocationInput('My Location');
                setCurrentLocation({ lat: latitude, lng: longitude });
                showOnMap(latitude, longitude);
                searchSchoolsOverpass(latitude, longitude);
            },
            (err) => alert('Location error: ' + err.message)
        );
    };


    return (
        <div className="bg-gray-100 min-h-screen mt-16">
            <div className="container mx-auto px-4 py-8 max-w-6xl">

                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <div className="flex flex-wrap gap-3">
                        <input
                            type="text"
                            className="flex-1 min-w-[200px] p-2 border border-gray-300 rounded"
                            placeholder="Enter location or click 'Use My Location'"
                            value={locationInput}
                            onChange={(e) => setLocationInput(e.target.value)}
                        />
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                            onClick={handleSearch}
                        >
                            Search Schools
                        </button>
                        <button
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
                            onClick={handleCurrentLocation}
                        >
                            Use My Location
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 h-[450px]">
                    <div id="map" className="flex-1 min-w-[160] h-full sticky top-5 rounded-lg shadow-lg"></div>

                    <div className="flex-1 min-w-[300px] bg-white p-5 rounded-lg shadow-lg overflow-y-auto">
                        <h2 className="text-xl font-semibold text-blue-900 border-b border-gray-200 pb-2 mb-4">
                            Nearby Schools
                        </h2>

                        {loading && <div className="text-center py-4">Searching...</div>}

                        {error && (
                            <div className="bg-red-100 border-l-4 border-red-500 p-3 mb-4">
                                {error}
                            </div>
                        )}

                        {!loading && !error && schools.length === 0 && (
                            <p className="text-gray-600">No schools found in this area.</p>
                        )}

                        <div className="space-y-4  ">
                            {schools.map((school) => (
                                <div
                                    key={school.id}
                                    className="py-5 px-5 bg-gray-50 border-l-4  border-blue-500 rounded cursor-pointer hover:bg-blue-50 hover:translate-x-1 transition-all"
                                    onClick={() => handleSchoolClick(school)}
                                >
                                    <h3 className="font-medium text-lg">{school.name}</h3>
                                    <p className="text-gray-600 text-sm mt-1">{school.address}</p>
                                    <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full mt-1">
                                        {school.distance}
                                    </span>

                                    <div className='pt-5 flex justify-end items-end '>
                                        <Button  onClick={() => addFavorite(school)} variant="outlined">   Add to Faverate  </Button>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchoolFinder;