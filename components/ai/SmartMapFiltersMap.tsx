"use client"
import React, { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

// Mock data for Algerian cities
const mockLocations = [
  {
    id: "1",
    lat: 36.7525,
    lng: 3.042,
    name: "Algiers",
    description: "The capital city of Algeria.",
    type: "Capital",
  },
  {
    id: "2",
    lat: 35.6971,
    lng: -0.6308,
    name: "Oran",
    description: "A coastal city in northwest Algeria.",
    type: "Coastal",
  },
  {
    id: "3",
    lat: 36.365,
    lng: 6.6147,
    name: "Constantine",
    description: "Known as the City of Bridges.",
    type: "Historic",
  },
  {
    id: "4",
    lat: 35.5556,
    lng: 6.1744,
    name: "Batna",
    description: "A city in the Aurès Mountains.",
    type: "Mountain",
  },
  {
    id: "5",
    lat: 31.6175,
    lng: -2.2167,
    name: "Ghardaïa",
    description: "A UNESCO World Heritage site in the Sahara.",
    type: "Desert",
  },
];

const types = ["All", "Capital", "Coastal", "Historic", "Mountain", "Desert"];

const SmartMapFiltersMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<string | null>(null);

  const filteredLocations = useMemo(() => 
    mockLocations.filter((loc) => {
      const matchesSearch = loc.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = filter === "All" || loc.type === filter;
      return matchesSearch && matchesType;
    }), 
    [search, filter]
  );

  // Initialize map
  useEffect(() => {
    if (leafletMapRef.current || !mapRef.current) return;

    const ALGERIA_BOUNDS = L.latLngBounds(
      L.latLng(19.5, -12.0),
      L.latLng(37.0, 12.0)
    );

    leafletMapRef.current = L.map(mapRef.current, {
      center: [28.0339, 1.6596],
      zoom: 5,
      minZoom: 5,
      maxZoom: 10,
      maxBounds: ALGERIA_BOUNDS,
      maxBoundsViscosity: 1.0,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(leafletMapRef.current);

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  // Update markers
  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map) return;

    // Clear existing markers from map and ref
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    filteredLocations.forEach((loc) => {
      const marker = L.marker([loc.lat, loc.lng]).addTo(map);
      marker.on("click", () => setSelected(loc.id));
      marker.bindTooltip(loc.name);
      markersRef.current.push(marker);
    });
  }, [filteredLocations]);

  const selectedLocation = mockLocations.find((loc) => loc.id === selected);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 mb-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div
        ref={mapRef}
        className="w-full h-[500px] rounded-lg shadow border"
        style={{ minHeight: 400 }}
      ></div>
      {selectedLocation && (
        <div className="mt-4 p-4 border rounded bg-white shadow max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-2">{selectedLocation.name}</h2>
          <p className="mb-1 text-gray-700">{selectedLocation.description}</p>
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setSelected(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default SmartMapFiltersMap; 