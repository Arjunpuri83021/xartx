import { useEffect } from "react";

const BannerAd = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = `
      atOptions = {
        'key' : '5d821ecf7285968830894277e9520b3e',
        'format' : 'iframe',
        'height' : 60,
        'width' : 468,
        'params' : {}
      };
    `;
    const scriptSrc = document.createElement("script");
    scriptSrc.type = "text/javascript";
    scriptSrc.src = "//www.topcreativeformat.com/5d821ecf7285968830894277e9520b3e/invoke.js";
    scriptSrc.async = true;

    const adContainer = document.getElementById("ad-container");
    if (adContainer) {
      adContainer.appendChild(script);
      adContainer.appendChild(scriptSrc);
    }

    return () => {
      if (adContainer) {
        adContainer.innerHTML = ''; // Cleanup
      }
    };
  }, []);

  return (
    <div
      id="ad-container"
      style={{
        width: "100%",
        maxWidth: "468px", // Maximum width of the ad
        height: "60px",
        margin: "20px auto", // Center horizontally
        position: "relative",
        padding: "0",
        boxSizing: "border-box",
      }}
    >
      {/* The ad iframe will be injected here */}
    </div>
  );
};

export default BannerAd;
