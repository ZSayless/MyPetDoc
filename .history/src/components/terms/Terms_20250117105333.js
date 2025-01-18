import React from "react";
import { useTranslation } from "react-i18next";

function Terms() {
  const { t } = useTranslation();

  return (
    <div className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-[#1A3C8E] mb-2">
            {t("terms.title")}
          </h1>
          <p className="text-gray-600 text-center mb-8">
            {t("terms.lastUpdated")}: March 15, 2024
          </p>

          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            {/* Client Confidentiality */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1A3C8E] mb-4">
                1. Client Confidentiality
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  All information relating to both client and patient is held in confidence 
                  and in line with the Data Protection Acts and will not be disclosed 
                  except under the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Where a client provides a confirmed request in writing.</li>
                  <li>
                    Where another Veterinary Surgeon requests this in order to continue 
                    the patient's care.
                  </li>
                  <li>
                    To a court or agent of The Pet Health Partnership as part of a legal 
                    process.
                  </li>
                  <li>
                    Where The Pet Health Partnership uses outsourced reminder services for 
                    treatments, vaccinations, or medication reminders.
                  </li>
                </ul>
              </div>
            </section>

            {/* Ownership of Records */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1A3C8E] mb-4">
                2. Ownership of Records
              </h2>
              <p className="text-gray-600">
                Case records and similar documents are the property of, and retained by, 
                The Pet Health Partnership. Copies, with a summary of the clinical history, 
                may be passed on request, to another veterinary surgeon taking over the case 
                or at the request of your insurance company.
              </p>
            </section>

            {/* Radiographs Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1A3C8E] mb-4">
                3. Ownership of Radiographs and Similar Records
              </h2>
              <p className="text-gray-600">
                The care given to your pet may involve making some specific investigations, 
                for example, taking x-rays or performing ultrasound scans. Although we make 
                a charge for performing these investigations and interpreting their results, 
                ownership of the resulting record remains with the practice.
              </p>
            </section>

            {/* Patient Photographs */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1A3C8E] mb-4">
                4. Patient Photographs
              </h2>
              <p className="text-gray-600">
                Photographs of your pet or their conditions may sometimes be used for 
                educational or marketing purposes. Please let us know if you would prefer 
                this not to happen.
              </p>
            </section>

            {/* Fees Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#1A3C8E] mb-4">
                5. Fees
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>
                  VAT is charged at the prevailing rate on all fees, diets, and drugs.
                </li>
                <li>
                  You will receive a detailed invoice for every consultation, surgical 
                  procedure, or transaction with us.
                </li>
                <li>Our fee list is available on request.</li>
              </ul>
            </section>

            {/* Treatment Costs */}
            <section>
              <h2 className="text-xl font-semibold text-[#1A3C8E] mb-4">
                6. Estimate of Treatment Costs
              </h2>
              <p className="text-gray-600">
                We endeavor to provide estimates for all procedures. Please ask if one is 
                required.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;
