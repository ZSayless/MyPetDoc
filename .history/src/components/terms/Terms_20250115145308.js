import React from "react";

function Terms() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

      <div className="prose max-w-none">
        <h2 className="text-xl font-semibold mt-6 mb-4">1. Introduction</h2>
        <p>
          Welcome to PetCare. These terms and conditions outline the rules and
          regulations for the use of our website.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">2. Services</h2>
        <p>
          We provide a platform connecting pet owners with veterinary services
          and pet care information.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">
          3. User Responsibilities
        </h2>
        <p>
          Users must provide accurate information and follow community
          guidelines.
        </p>

        {/* Add more sections as needed */}
      </div>
    </div>
  );
}

export default Terms;
