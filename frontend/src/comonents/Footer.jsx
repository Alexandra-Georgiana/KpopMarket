import { Link } from 'react-router-dom';
import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from '../assets/data';

const Footer = () => {
  return (
    <footer className="flex flex-col items-center pb-24 pt-20 bg-white w-full">
      <div className="max_padd_container w-full px-4 flex flex-wrap justify-between gap-8">
        
        {/* First Column */}
        <div className="flex-1 min-w-[200px]">
          <FooterColumn title={FOOTER_LINKS[0].title}>
            <ul className="flex flex-col gap-2 text-gray-600">
              {FOOTER_LINKS[0].links.map((link) => (
                <li key={link}>
                  <Link to="/" className="hover:text-black">{link}</Link>
                </li>
              ))}
            </ul>
          </FooterColumn>
        </div>

        {/* Second Column */}
        <div className="flex-1 min-w-[200px]">
          <FooterColumn title={FOOTER_LINKS[1].title}>
            <ul className="flex flex-col gap-2 text-gray-600">
              {FOOTER_LINKS[1].links.map((link) => (
                <li key={link}>
                  <Link to="/" className="hover:text-black">{link}</Link>
                </li>
              ))}
            </ul>
          </FooterColumn>
        </div>

        {/* Contact Info */}
        <div className="flex-1 min-w-[200px]">
          <FooterColumn title={FOOTER_CONTACT_INFO.title}>
            <ul className="text-gray-600">
              {FOOTER_CONTACT_INFO.links.map((link) => (
                <li key={link.label}>
                  <p className="font-medium">{link.label}</p>
                  <p className="text-sm">{link.value}</p>
                </li>
              ))}
            </ul>
          </FooterColumn>
        </div>

        {/* Social Media Icons */}
        <div className="flex-1 min-w-[200px]">
          <FooterColumn title={SOCIALS.title}>
            <div className="flex gap-4 justify-center md:justify-start">
              {SOCIALS.links.map((item, index) => (
                <a href={item.url} key={index} className="hover:opacity-80" target="_blank" rel="noopener noreferrer">
                  <img src={item.icon} alt="social icon" className="w-6 h-6" />
                </a>
              ))}
            </div>
          </FooterColumn>
        </div>


      </div>

      {/* Divider & Copyright */}
      <div className="w-full border-t border-gray-300 mt-10"></div>
      <p className="text-center text-gray-500 text-sm mt-5">
        2024 Mimisky | All rights reserved
      </p>
    </footer>
  );
};

const FooterColumn = ({ title, children }) => {
  return (
    <div className="w-full">
      <h4 className="font-bold text-lg mb-3">{title}</h4>
      {children}
    </div>
  );
};

export default Footer;
