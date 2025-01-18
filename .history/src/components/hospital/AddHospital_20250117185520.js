import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useTranslation } from "react-i18next";

function AddHospital() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [mapUrl, setMapUrl] = useState("");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      alert("You can only upload up to 5 images");
      return;
    }

    setImages([...images, ...files]);

    // Create preview URLs
    const newPreviewImages = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviewImages]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...previewImages];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setPreviewImages(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target);
      images.forEach((image) => {
        formData.append("images", image);
      });

      // TODO: Call API to submit hospital
      // const response = await fetch('/api/hospitals', {
      //   method: 'POST',
      //   body: formData
      // });

      alert(
        "Hospital registration submitted successfully! Waiting for admin approval."
      );
      navigate("/profile");
    } catch (error) {
      console.error("Error submitting hospital:", error);
      alert("Error submitting hospital. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="p-6 border-b">
              <h1 className="text-2xl font-bold text-gray-900">
                {t("hospitalRegister.title")}
              </h1>
              <p className="text-gray-500 mt-1">
                {t("hospitalRegister.subtitle")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">
                  {t("hospitalRegister.form.basicInfo")}
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("hospitalRegister.form.hospitalName")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("hospitalRegister.form.namePlaceholder")}
                    className="mt-1 w-full rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("hospitalRegister.form.phone")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("hospitalRegister.form.address")}
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Services */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Services</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    "General Checkup",
                    "Vaccination",
                    "Surgery",
                    "Pet Grooming",
                    "Emergency Care",
                    "Dental Care",
                    "Laboratory",
                    "Pet Boarding",
                    "Pharmacy",
                  ].map((service) => (
                    <label
                      key={service}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        name="services"
                        value={service}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Working Hours */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Working Hours</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weekdays
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="time"
                        name="weekdayStart"
                        className="px-2 py-1 border rounded"
                      />
                      <span className="self-center">to</span>
                      <input
                        type="time"
                        name="weekdayEnd"
                        className="px-2 py-1 border rounded"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weekends
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="time"
                        name="weekendStart"
                        className="px-2 py-1 border rounded"
                      />
                      <span className="self-center">to</span>
                      <input
                        type="time"
                        name="weekendEnd"
                        className="px-2 py-1 border rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Location</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Google Maps Embed URL
                    </label>
                    <input
                      type="text"
                      name="mapUrl"
                      placeholder="Paste only the URL from src attribute (starts with https://www.google.com/maps/embed?pb=...)"
                      onChange={(e) => setMapUrl(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      How to get URL:
                      <br />
                      1. Find your hospital on Google Maps
                      <br />
                      2. Click Share {">"} Embed a map
                      <br />
                      3. From the iframe code, copy ONLY the URL between quotes
                      in src="..."
                      <br />
                      4. DO NOT copy the entire iframe tag, just the URL
                    </p>
                  </div>

                  {mapUrl && (
                    <div className="w-full h-[400px] rounded-lg overflow-hidden">
                      <iframe
                        src={mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  )}
                </div>
              </div>

              {/* Images */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Hospital Images</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                    id="hospital-images"
                  />
                  <label
                    htmlFor="hospital-images"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-600">
                      {t("hospitalRegister.form.imageNote")}
                    </span>
                  </label>
                </div>

                {/* Image Previews */}
                {previewImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                    {previewImages.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Description</h2>
                <textarea
                  name="description"
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us about your hospital..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit for Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddHospital;
