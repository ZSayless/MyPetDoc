import { useTranslation } from "react-i18next";

function RegisterHospital() {
  const { t } = useTranslation();
  
  // ... other code

  return (
    <div>
      <h2 className="text-xl mb-2">{t("addHospital.mapLocation")}</h2>
      <div className="bg-[#F8F9FF] rounded-2xl p-4">
        <h3 className="text-base font-medium mb-2">
          {t("addHospital.mapInstructions.title")}
        </h3>
        <ol className="list-decimal list-inside text-gray-600 mb-4">
          <li>{t("addHospital.mapInstructions.steps.1")}</li>
          <li>{t("addHospital.mapInstructions.steps.2")}</li>
          <li>{t("addHospital.mapInstructions.steps.3")}</li>
          <li>{t("addHospital.mapInstructions.steps.4")}</li>
        </ol>
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl"
          placeholder={t("addHospital.mapUrlPlaceholder")}
          value={mapUrl}
          onChange={(e) => setMapUrl(e.target.value)}
        />
        {errors.mapUrl && (
          <p className="mt-1 text-sm text-red-500">
            {t("addHospital.validation.invalidUrl")}
          </p>
        )}
      </div>

      {/* ... other JSX */}
    </div>
  );
} 