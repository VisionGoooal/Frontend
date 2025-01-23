import React from "react";

type Link = {
  href: string;
  label: string;
};

type Section = {
  title: string;
  links: Link[];
};

type SocialLink = {
  href: string;
  srLabel: string;
  svg: React.ReactNode;
};



type FooterProps = {
  sections: Section[];
  socialLinks: SocialLink[];
  
};

const Footer: React.FC<FooterProps> = ({ sections, socialLinks }) => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <hr className=" border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0"></div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            {sections.map((section, index) => (
              <FooterSection
                key={index}
                title={section.title}
                links={section.links}
              />
            ))}
          </div>
        </div>

        <div className=" sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2025{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              VisionGoal™
            </a>
            . All Rights Reserved.
          </span>

          <SocialLinks links={socialLinks} />
        </div>
      </div>
    </footer>
  );
};

type FooterSectionProps = {
  title: string;
  links: Link[];
};

const FooterSection: React.FC<FooterSectionProps> = ({ title, links }) => {
  return (
    <div>
      <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
        {title}
      </h2>
      <ul className="text-gray-500 dark:text-gray-400 font-medium">
        {links.map((link, index) => (
          <li key={index} className={index !== links.length - 1 ? "mb-4" : ""}>
            <a href={link.href} className="hover:underline">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

type SocialLinksProps = {
  links: SocialLink[];
};

const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
  return (
    <div className="flex mt-4 sm:justify-center sm:mt-0">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            {link.svg}
          </svg>
          <span className="sr-only">{link.srLabel}</span>
        </a>
      ))}
    </div>
  );
};

export default Footer;
