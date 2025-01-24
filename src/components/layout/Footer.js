import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer id="contact" className="bg-white text-gray-700 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#1A3C8E]">
              MyPetDoc
            </h3>
            <p className="text-sm text-gray-600">
              {t("footer.about.description")}
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://facebook.com/mypetdoc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1A3C8E] hover:text-[#98E9E9] transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com/mypetdoc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1A3C8E] hover:text-[#98E9E9] transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com/mypetdoc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1A3C8E] hover:text-[#98E9E9] transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#1A3C8E]">
              {t("footer.quickLinks.title")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-[#98E9E9] transition-colors"
                >
                  {t("footer.quickLinks.home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutus"
                  className="text-gray-600 hover:text-[#98E9E9] transition-colors"
                >
                  {t("footer.quickLinks.aboutUs")}
                </Link>
              </li>
              <li>
                <Link
                  to="/find-hospital"
                  className="text-gray-600 hover:text-[#98E9E9] transition-colors"
                >
                  {t("footer.quickLinks.findHospital")}
                </Link>
              </li>
              <li>
                <Link
                  to="/bloglist"
                  className="text-gray-600 hover:text-[#98E9E9] transition-colors"
                >
                  {t("footer.quickLinks.blog")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="text-gray-600 hover:text-[#98E9E9] transition-colors"
                >
                  {t("footer.quickLinks.contactUs")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#1A3C8E]">
              {t("footer.contact.title")}
            </h3>
            <div className="space-y-2 text-gray-600">
              <p>{t("footer.contact.address")}</p>
              <p className="flex items-center">
                <Mail size={16} className="mr-2 text-[#1A3C8E]" />
                <a
                  href="mailto:support@mypetdoc.com"
                  className="hover:text-[#98E9E9] transition-colors"
                >
                  {t("footer.contact.email")}
                </a>
              </p>
              <p className="flex items-center">
                <Phone size={16} className="mr-2 text-[#1A3C8E]" />
                <a
                  href="tel:19001234"
                  className="hover:text-[#98E9E9] transition-colors"
                >
                  1900 1234
                </a>
              </p>
              <p className="flex items-center">
                <Clock size={16} className="mr-2 text-[#1A3C8E]" />
                <span>24/7</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              {t("footer.legal.copyright")}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-sm text-gray-600 hover:text-[#98E9E9] transition-colors"
              >
                {t("footer.legal.privacy")}
              </Link>
              <Link
                to="/terms"
                className="text-sm text-gray-600 hover:text-[#98E9E9] transition-colors"
              >
                {t("footer.legal.terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
