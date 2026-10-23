export function getUserCoordinates() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(
        new Error("Your browser does not support location detection.")
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        const messages = {
          1: "Location permission denied. Please allow location access.",
          2: "Your current location could not be determined.",
          3: "Location request timed out. Please try again.",
        };

        reject(
          new Error(
            messages[error.code] || "Unable to detect your location."
          )
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000,
      }
    );
  });
}