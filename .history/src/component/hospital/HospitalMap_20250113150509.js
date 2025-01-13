import React from "react";

const HospitalMap = () => {
  return (
    <div className="w-full lg:w-1/2 h-[300px] lg:h-[calc(100vh-200px)] lg:sticky lg:top-0">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15677.977147902919!2d106.69842159999999!3d10.787312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1710900646899!5m2!1sen!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default HospitalMap;
