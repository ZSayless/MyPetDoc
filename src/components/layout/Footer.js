import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getContactInfo } from "../../services/contactInformationService";

const ContactSkeleton = () => {
  return (
    <div>
      <div className="mb-4">
        <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="space-y-2">
        {/* Address */}
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>

        {/* Email */}
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-200 rounded mr-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        </div>

        {/* Phone */}
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-200 rounded mr-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        </div>

        {/* Hours */}
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-200 rounded mr-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

function Footer() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [contact, setContact] = useState({});

  const fetchCurrentContact = async () => {
    try {
      setIsLoading(true);
      const data = await getContactInfo();
      setContact(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentContact();
  }, []);

  return (
    <footer id="contact" className="bg-[#1A3C8E] text-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">MyPetDoc</h3>
            <p className="text-sm text-white/80">
              {t("footer.about.description")}
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://facebook.com/mypetdoc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#98E9E9] transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com/mypetdoc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#98E9E9] transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com/mypetdoc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#98E9E9] transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              {t("footer.quickLinks.title")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-white/80 hover:text-[#98E9E9] transition-colors"
                >
                  {t("footer.quickLinks.home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutus"
                  className="text-white/80 hover:text-[#98E9E9] transition-colors"
                >
                  {t("footer.quickLinks.aboutUs")}
                </Link>
              </li>
              <li>
                <Link
                  to="/find-hospital"
                  className="text-white/80 hover:text-[#98E9E9] transition-colors"
                >
                  {t("footer.quickLinks.findHospital")}
                </Link>
              </li>
              <li>
                <Link
                  to="/bloglist"
                  className="text-white/80 hover:text-[#98E9E9] transition-colors"
                >
                  {t("footer.quickLinks.blog")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="text-white/80 hover:text-[#98E9E9] transition-colors"
                >
                  {t("footer.quickLinks.contactUs")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          {isLoading ? (
            <ContactSkeleton />
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {t("footer.contact.title")}
              </h3>
              <div className="space-y-2 text-white/80">
                <p>{contact.address}</p>
                <p className="flex items-center">
                  <Mail size={16} className="mr-2 text-[#98E9E9]" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-[#98E9E9] transition-colors"
                  >
                    {contact.email}
                  </a>
                </p>
                <p className="flex items-center">
                  <Phone size={16} className="mr-2 text-[#98E9E9]" />
                  <a
                    href={`tel:${contact.phone}`}
                    className="hover:text-[#98E9E9] transition-colors"
                  >
                    {contact.phone}
                  </a>
                </p>
                <p className="flex items-center">
                  <Clock size={16} className="mr-2 text-[#98E9E9]" />
                  <span>{contact.support_hours}</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white/80">
              {t("footer.legal.copyright")}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/terms"
                className="text-sm text-white/80 hover:text-[#98E9E9] transition-colors"
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
