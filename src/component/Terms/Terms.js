import React from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

export default function Terms() {
  React.useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 py-10 px-6 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 text-center">Terms and Conditions</h1>

        {/* Section for Terms */}
        <section data-aos="fade-up" className="mb-6 bg-gray-50 shadow-md rounded-lg p-6 hover:bg-blue-50 transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Client Confidentiality
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>All information relating to both client and patient is held in confidence and in line with the Data Protection Acts.</li>
            <li>Information will only be disclosed under specific circumstances:</li>
            <ul className="list-disc pl-6">
              <li>Where a client provides a confirmed request in writing.</li>
              <li>To another Veterinary Surgeon for the patient's care.</li>
              <li>To a court or legal agent as part of a legal process.</li>
              <li>When using outsource reminder services for treatments or medication reminders.</li>
            </ul>
          </ul>
        </section>

        <section data-aos="fade-up" className="mb-6 bg-gray-50 shadow-md rounded-lg p-6 hover:bg-blue-50 transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Ownership of Records
          </h2>
          <p className="text-gray-600">
            Case records and similar documents are the property of The Pet Health Partnership. Copies may be shared upon request with another veterinary surgeon or insurance company.
          </p>
        </section>

        <section data-aos="fade-up" className="mb-6 bg-gray-50 shadow-md rounded-lg p-6 hover:bg-blue-50 transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Ownership of Radiographs and Similar Records
          </h2>
          <p className="text-gray-600">
            Specific investigations (e.g., x-rays) remain the property of the practice, although charges are made for conducting and interpreting these investigations.
          </p>
        </section>

        <section data-aos="fade-up" className="mb-6 bg-gray-50 shadow-md rounded-lg p-6 hover:bg-blue-50 transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Patient Photographs
          </h2>
          <p className="text-gray-600">
            Photographs of pets or their conditions may be used for educational or marketing purposes unless requested otherwise.
          </p>
        </section>

        <section data-aos="fade-up" className="mb-6 bg-gray-50 shadow-md rounded-lg p-6 hover:bg-blue-50 transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            PHP Health Care Plan
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>The plan allows monthly payments for treatments under a 12-month cycle.</li>
            <li>The Pet Owner may terminate this Agreement with notice, but unpaid balances or discounts may be charged.</li>
            <li>Direct Debit payments are required for monthly fees.</li>
            <li>Plan benefits are exclusive to the enrolled pet and cannot be transferred.</li>
          </ul>
        </section>

        <footer className="text-center mt-8 text-gray-500">
          © 2025 The Pet Health Partnership. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
