import React, { useEffect } from "react";

const HillTopBanner = () => {
    useEffect(() => {
        // Function to inject the script dynamically
        (function (vanbx) {
          const d = document;
          const s = d.createElement("script");
          const l = d.scripts[d.scripts.length - 1];
          s.settings = vanbx || {};
          s.src =
            "//excitablepass.com/b/X.VgsvdeGmlX0DY/WgdkiAYiWB5/uwZTXTIg/Yedmu9/uaZoUIl/kYPlTLUN0qNzz_MZ0DNwDsgLtsNhTBQ/3vMmzcQF0/O/Qf";
          s.async = true;
          s.referrerPolicy = "no-referrer-when-downgrade";
          l.parentNode.insertBefore(s, l);
        })({});
      }, []);
    
      return (
        <div className="excitable-pass-ad-container">
          <div className="excitable-pass-ad"></div>
        </div>
      );
    };
export default HillTopBanner;
