import React from "react";

const HospitalMap = ({ selectedCity = "hcm" }) => {
  // Map URLs for each city
  const mapUrls = {
    hcm: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125412.37141037266!2d106.6169242891195!3d10.800654291746905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2sHo%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1710900646899!5m2!1sen!2s",
    hanoi:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59587.97785448771!2d105.80194405824945!3d21.02277876629784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSGFub2ksIEhvw6BuIEtp4bq_bSwgSGFub2ksIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1710900646899!5m2!1sen!2s",
    danang:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61349.62126486198!2d108.17168328825878!3d16.047248394721636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c792252a13%3A0xfc14e3a044436487!2sDa%20Nang%2C%20Vietnam!5e0!3m2!1sen!2s!4v1710900646899!5m2!1sen!2s",
    all: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4057814.6055167267!2d105.73291911791336!3d15.735737488499452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31157a4d736a1e5f%3A0xb03bb0c9e2fe62be!2sVietnam!5e0!3m2!1sen!2s!4v1710900646899!5m2!1sen!2s",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden" 
         style={{ height: "calc(100vh - 140px)" }}>
      <iframe
        src={mapUrls[selectedCity] || mapUrls.all}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default HospitalMap;
