import express from 'express';
import fs from 'fs';
import axios from 'axios';

const router = express.Router();
const apiKey = process.env.APIKEY;;
const givenLocation = { lat: 40.7128, lng: -74.0060 }; // Example: New York City

// Function to fetch places within a radius
const fetchNearbyPlaces = async (location, radius, keyword, type) => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&keyword=${encodeURIComponent(keyword)}&key=${apiKey}`;

    const response = await axios.get(url);

    return response.data.results.map(place => ({
        name: place.name,
        type: type,
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng
    }));
}

// Route to fetch and return the locations
router.get('/locations', async (req, res) => {
    const keywords = [
        { keyword: 'recycling center', type: 'recycling' },
        { keyword: 'recycling program', type: 'recycling' },
        { keyword: 'environmental policy', type: 'activism' },
        { keyword: 'sustainability education', type: 'resources' }
    ];
    const radius = 25 * 1609; // Convert 25 miles to meters

    const allLocations = [];

    for (const { keyword, type } of keywords) {
        const places = await fetchNearbyPlaces(givenLocation, radius, keyword, type);
        allLocations.push(...places);
    }

    res.status(200).json(allLocations);
});

export default router;