import { useEffect, useRef } from "react";

const BannerAd2 = () => {
  const adRef = useRef(null);

  useEffect(() => {
    // Clear any previous content in the ad container
    if (adRef.current) {
      adRef.current.innerHTML = ''; // Clear previous content
    }

    // Create the script element for the ad
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "//www.topcreativeformat.com/5d821ecf7285968830894277e9520b3e/invoke.js";

    // Define the ad options
    window.atOptions = {
      'key': '5d821ecf7285968830894277e9520b3e',
      'format': 'iframe',
      'height': 60,
      'width': 468,
      'params': {}
    };

    // Append the script to the ad container
    if (adRef.current) {
      adRef.current.appendChild(script);
    }

    // Clean up on unmount
    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = ''; // Clean up on unmount
      }
    };
  }, []);

  return (
    <div
      ref={adRef}
      style={{
        width: "468px",
        height: "60px",
        margin: "20px auto",  // Centering the ad container
      }}
    >
      {/* The banner ad will be injected here */}
    </div>
  );
};

export default BannerAd2;
