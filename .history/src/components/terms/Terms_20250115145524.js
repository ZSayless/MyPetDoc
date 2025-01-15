import React from "react";

function Terms() {
  return (
    <div className="p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Terms and Conditions
        </h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            1. Client Confidentiality
          </h2>
          <p className="mb-2">
            a. All information relating to both client and patient is held in
            confidence and in line with the Data Protection Acts and will not be
            disclosed except under the following circumstances:
          </p>
          <ul className="list-disc list-inside pl-4">
            <li>Where a client provides a confirmed request in writing.</li>
            <li>
              Where another Veterinary Surgeon requests this in order to
              continue the patient&#39;s care.
            </li>
            <li>
              To a court or agent of The Pet Health Partnership as part of a
              legal process.
            </li>
            <li>
              Where The Pet Health Partnership uses outsourced reminder services
              for treatments, vaccinations, or medication reminders.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            2. Ownership of Records
          </h2>
          <p>
            Case records and similar documents are the property of, and retained
            by, The Pet Health Partnership. Copies, with a summary of the
            clinical history, may be passed on request, to another veterinary
            surgeon taking over the case or at the request of your insurance
            company.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            3. Ownership of Radiographs and Similar Records
          </h2>
          <p>
            The care given to your pet may involve making some specific
            investigations, for example, taking x-rays or performing ultrasound
            scans. Although we make a charge for performing these investigations
            and interpreting their results, ownership of the resulting record
            remains with the practice.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">4. Patient Photographs</h2>
          <p>
            Photographs of your pet or their conditions may sometimes be used
            for educational or marketing purposes. Please let us know if you
            would prefer this not to happen.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">5. Fees</h2>
          <ul className="list-disc list-inside pl-4">
            <li>
              VAT is charged at the prevailing rate on all fees, diets, and
              drugs.
            </li>
            <li>
              You will receive a detailed invoice for every consultation,
              surgical procedure, or transaction with us.
            </li>
            <li>Our fee list is available on request.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            6. Estimate of Treatment Costs
          </h2>
          <p>
            We endeavor to provide estimates for all procedures. Please ask if
            one is required.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Terms;
