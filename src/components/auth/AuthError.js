import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useToast } from "../../context/ToastContext";

function AuthError() {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const error =
    location.state?.error || t("auth.errors.signup");
  const errorCode = location.state?.errorCode;

  const getErrorMessage = (error, code) => {
    switch (code) {
      case "ACCOUNT_LOCKED":
        return t("auth.errors.accountLocked");
      case "ACCOUNT_INACTIVE":
        return t("auth.errors.accountInactive");
      case "INVALID_CREDENTIALS":
        return t("auth.errors.invalidCredentials");
      case "AUTH_ERROR":
        return error;
      default:
        return (
          error ||
          t("auth.errors.signup")
        );
    }
  };

  const getErrorAction = (code) => {
    switch (code) {
      case "ACCOUNT_INACTIVE":
        return {
          primary: {
            text: t("auth.errors.resendActivationEmail"),
            action: () => {
              // TODO: Implement resend activation email
              addToast({
                title: t("Please check your email to activate your account if you haven't see the activation email please check your spam folder"),
              });
            },
          },
        };
      case "ACCOUNT_LOCKED":
        return {
          primary: {
            text: t("auth.errors.contactSupport"),
            action: () => (window.location.href = "mailto:support@mypetdoc.vn"),
          },
        };
      default:
        return {
          primary: {
            text: t("auth.errors.tryAgain"),
            action: () => navigate("/"),
          },
        };
    }
  };

  const errorAction = getErrorAction(errorCode);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t("auth.errors.authenticationError")}
          </h2>
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-center text-sm text-red-600">
              {getErrorMessage(error, errorCode)}
            </p>
          </div>
        </div>

        <div className="mt-5 text-center space-y-4">
          {errorAction.primary && (
            <button
              onClick={errorAction.primary.action}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {errorAction.primary.text}
            </button>
          )}

          <button
            onClick={() => navigate("/")}
            className="block w-full text-sm text-gray-600 hover:text-gray-900"
          >
            {t("auth.errors.backToHome")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthError;
