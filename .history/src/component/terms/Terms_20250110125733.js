import React from 'react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
        
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
            <p className="text-gray-600">
              These Website Standard Terms and Conditions written on this webpage shall manage your use of our website.
              These Terms will be applied fully and affect to your use of this Website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Intellectual Property Rights</h2>
            <p className="text-gray-600">
              Other than the content you own, under these Terms, Our Company and/or its licensors own all the intellectual property rights and materials contained in this Website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Restrictions</h2>
            <p className="text-gray-600 mb-4">
              You are specifically restricted from all of the following:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Publishing any Website material in any other media</li>
              <li>Selling, sublicensing and/or otherwise commercializing any Website material</li>
              <li>Publicly performing and/or showing any Website material</li>
              <li>Using this Website in any way that is or may be damaging to this Website</li>
              <li>Using this Website contrary to applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Privacy Policy</h2>
            <p className="text-gray-600">
              Our privacy policy explains how we collect, safeguard and disclose information that results from your use of our Website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Contact Information</h2>
            <p className="text-gray-600">
              If you have any questions about these Terms, please contact us.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
