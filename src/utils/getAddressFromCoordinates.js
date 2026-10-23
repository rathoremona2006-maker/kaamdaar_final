export async function getAddressFromCoordinates(
  latitude,
  longitude
) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Google Maps API key is missing. Check your .env file."
    );
  }

  const params = new URLSearchParams({
    "location.latitude": String(latitude),
    "location.longitude": String(longitude),
    key: apiKey,
  });

  const response = await fetch(
    `https://geocode.googleapis.com/v4/geocode/location?${params}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error?.message || "Unable to fetch your address."
    );
  }

  if (!data.results?.length) {
    throw new Error("No address found for your current location.");
  }

  return data.results[0].formattedAddress;
}