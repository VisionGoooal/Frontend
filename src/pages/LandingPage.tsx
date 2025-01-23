import LandingPageNavbar from "../components/navbars-components/LandingPageNavbar";
import Footer from "../components/ui-components/Footer";
import "../css/components_css/LandingPageNavbar.css";
import "../css/pages_css/LandingPage.css";
import { Link } from "react-router-dom";
import { ABOUT_US_PAGE_PATH } from "../constants/routePaths";

const LandingPage = () => {
  return (
    <>
      <LandingPageNavbar />
      <div className="relative isolate px-6 pt-14 lg:px-8 landing-container">
        <div className="mx-auto max-w-2xl ">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center">
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl ">
              Predict match outcomes with AI and fans!
            </h1>
            <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl/8">
              Predict the outcomes of your favorite football matches with the
              power of AI. Challenge your friends, test your skills, and see if
              you can outsmart the algorithm. The ultimate football prediction
              platform awaits!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <Link
                to={ABOUT_US_PAGE_PATH}
                className="text-sm/6 font-semibold text-gray-900"
              >
                About Us <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)] pointer-events-none"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[20%] aspect-[1155/678] w-[50rem] sm:w-[120rem] -translate-x-1/2 bg-gradient-to-r from-pinkish to-purpleAccent opacity-60"
          />
        </div>
      </div>
      <Footer
        sections={[
          {
            title: "Resources",
            links: [
              { href: "https://flowbite.com/", label: "Flowbite" },
              { href: "https://tailwindcss.com/", label: "Tailwind CSS" },
            ],
          },
          {
            title: "Follow us",
            links: [
              {
                href: "https://github.com/VisionGoooal",
                label: "Github",
              },
              { href: "https://discord.gg/4eeurUVvTy", label: "Discord" },
            ],
          },
          {
            title: "Legal",
            links: [
              { href: "#", label: "Privacy Policy" },
              { href: "#", label: "Terms & Conditions" },
            ],
          },
        ]}
        socialLinks={[
          {
            href: "#",
            srLabel: "Facebook page",
            svg: (
              <path
                fillRule="evenodd"
                d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                clipRule="evenodd"
              />
            ),
          },
          {
            href: "#",
            srLabel: "Twitter page",
            svg: (
              <path
                fillRule="evenodd"
                d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                clipRule="evenodd"
              />
            ),
          },
        ]}
      />
    </>
  );
};
export default LandingPage;
