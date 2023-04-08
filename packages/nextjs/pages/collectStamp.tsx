import { useState } from "react";
import exifr from "exifr";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const CollectStamp = () => {
  const [geoLocation, setGeoLocation] = useState<{
    latitude: number;
    longitude: number;
    countryName: string;
  }>();

  const fetchCountryName = async (latitude: number, longitude: number) => {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network error occurred while fetching country name.");
    }

    const data = await response.json();
    return data.address && data.address.country;
  };

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const exifData = await exifr.gps(file);

        if (exifData && exifData.latitude && exifData.longitude) {
          const { latitude, longitude } = exifData;
          const countryName = await fetchCountryName(latitude, longitude);
          setGeoLocation({ latitude, longitude, countryName });
        } else {
          alert("No geo-location data found in this image.");
        }
      } catch (error) {
        console.error("Error reading Exif data or fetching country name:", error);
      }
    }
  };

  const {
    writeAsync: createPassportAsync,
    isLoading: createPassportLoading,
    isSuccess,
  } = useScaffoldContractWrite({
    contractName: "MainContract",
    functionName: "collectStamp",
    args: [geoLocation?.countryName.toLowerCase()],
  });

  return (
    <div>
      <h1>Collect Stamp</h1>
      <p>Collect Stamp Page</p>
      <input type="file" onChange={handleFileUpload} />
      {geoLocation && (
        <p>
          Latitude: {geoLocation.latitude}, Longitude: {geoLocation.longitude}, country:{" "}
          {geoLocation.countryName.toLowerCase()}
        </p>
      )}

      {isSuccess ? (
        <div>Congrats! stamp collected successfully!</div>
      ) : (
        geoLocation && (
          <button className="p-2 border-green-500 border-2 rounded-md" onClick={createPassportAsync} disabled={createPassportLoading}>
            Add {geoLocation?.countryName} stamp
          </button>
        )
      )}
    </div>
  );
};

export default CollectStamp;
