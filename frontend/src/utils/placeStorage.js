// utils/storageHelpers.js

const MAX_RECENT_PLACES = 100;
const RECENT_KEYS_STORAGE = "recentPlaceKeys";
const RECENT_HOTEL_KEYS_STORAGE = "recentHotelKeys";

export const savePlaceToLocalStorage = (place) => {
  const key = `selectedPlace_${place.location.lat}_${place.location.lon}`;
  localStorage.setItem(key, JSON.stringify(place));

  let recentKeys = JSON.parse(localStorage.getItem(RECENT_KEYS_STORAGE) || "[]");
  recentKeys = [key, ...recentKeys.filter((k) => k !== key)];

  if (recentKeys.length > MAX_RECENT_PLACES) {
    const toRemove = recentKeys.slice(MAX_RECENT_PLACES);
    toRemove.forEach((k) => localStorage.removeItem(k));
    recentKeys = recentKeys.slice(0, MAX_RECENT_PLACES);
  }

  localStorage.setItem(RECENT_KEYS_STORAGE, JSON.stringify(recentKeys));
};

export const getPlaceFromLocalStorage = (lat, lon) => {
  const key = `selectedPlace_${lat}_${lon}`;
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
};

export const saveHotelToLocalStorage = (hotel) => {
  const key = `selectedHotel_${hotel.location.lat}_${hotel.location.lon}_${hotel._id}`;
  localStorage.setItem(key, JSON.stringify(hotel));

  let recentKeys = JSON.parse(localStorage.getItem(RECENT_HOTEL_KEYS_STORAGE) || "[]");
  recentKeys = [key, ...recentKeys.filter((k) => k !== key)];

  if (recentKeys.length > MAX_RECENT_PLACES) {
    const toRemove = recentKeys.slice(MAX_RECENT_PLACES);
    toRemove.forEach((k) => localStorage.removeItem(k));
    recentKeys = recentKeys.slice(0, MAX_RECENT_PLACES);
  }

  localStorage.setItem(RECENT_HOTEL_KEYS_STORAGE, JSON.stringify(recentKeys));
};

export const getHotelFromLocalStorage = (lat, lon, id) => {
  const key = `selectedHotel_${lat}_${lon}_${id}`;
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
};
