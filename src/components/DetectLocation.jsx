import { useState } from "react";
import { getUserCoordinates } from "../utils/getUserLocation";
import { getAddressFromCoordinates } from "../utils/getAddressFromCoordinates";

export default function DetectLocation() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const detectLocation = async () => {
    setLoading(true);
    setError("");
    setAddress("");

    try {
      const { latitude, longitude } =
        await getUserCoordinates();

      const detectedAddress =
        await getAddressFromCoordinates(
          latitude,
          longitude
        );

      setAddress(detectedAddress);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={detectLocation} disabled={loading}>
        {loading ? "Detecting..." : "Use my current location"}
      </button>

      {address && <p>Detected address: {address}</p>}
      {error && <p role="alert">{error}</p>}
    </div>
  );
}