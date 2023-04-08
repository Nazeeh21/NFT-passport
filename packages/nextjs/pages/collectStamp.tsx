import { useState } from "react";
import exifr from "exifr";

const CollectStamp = () => {
  const [geoLocation, setGeoLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const exifData = await exifr.gps(file);

        if (exifData && exifData.latitude && exifData.longitude) {
          setGeoLocation({ latitude: exifData.latitude, longitude: exifData.longitude });
        } else {
          alert("No geo-location data found in this image.");
        }
      } catch (error) {
        console.error("Error reading Exif data:", error);
      }
    }
  };

  // const convertToDecimal = (coord, ref) => {
  //   const degrees = coord[0];
  //   const minutes = coord[1];
  //   const seconds = coord[2];
  //   const decimal = degrees + minutes / 60 + seconds / (60 * 60);

  //   return ref === "S" || ref === "W" ? -decimal : decimal;
  // };
  return (
    <div>
      <h1>Collect Stamp</h1>
      <p>Collect Stamp Page</p>
      <input type="file" onChange={handleFileUpload} />
      {geoLocation && (
        <p>
          Latitude: {geoLocation.latitude}, Longitude: {geoLocation.longitude}
        </p>
      )}
    </div>
  );
};

export default CollectStamp;
