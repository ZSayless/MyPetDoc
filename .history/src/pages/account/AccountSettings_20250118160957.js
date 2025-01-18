import { useTranslation } from "react-i18next";

function AccountSettings() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">{t("accountSettings.title")}</h1>

      {/* Personal Info Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t("accountSettings.personalInfo.title")}</h2>
        <p className="text-gray-600 mb-4">{t("accountSettings.personalInfo.description")}</p>

        {/* Basic Information */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-2">{t("accountSettings.personalInfo.basicInfo.title")}</h3>
          <p className="text-gray-600 mb-4">{t("accountSettings.personalInfo.basicInfo.description")}</p>

          <div className="space-y-4">
            <div>
              <label>{t("accountSettings.personalInfo.basicInfo.fullName")}</label>
              {/* ... rest of the code ... */}
            </div>

            <div>
              <label>{t("accountSettings.personalInfo.basicInfo.username")}</label>
              {/* ... */}
            </div>

            <div>
              <label>{t("accountSettings.personalInfo.basicInfo.avatar")}</label>
              {/* ... */}
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t("accountSettings.socialMedia.title")}</h2>
        <p className="text-gray-600 mb-4">{t("accountSettings.socialMedia.description")}</p>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <label>{t("accountSettings.socialMedia.facebook")}</label>
              <p className="text-gray-500">{t("accountSettings.socialMedia.notUpdated")}</p>
            </div>

            <div>
              <label>{t("accountSettings.socialMedia.twitter")}</label>
              <p className="text-gray-500">{t("accountSettings.socialMedia.notUpdated")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings; 