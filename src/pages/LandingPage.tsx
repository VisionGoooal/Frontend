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
      <div className="relative isolate px-6 pt-14 lg:px-8 overflow-hidden min-h-screen">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl pointer-events-none"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 60% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-pinkish to-purpleAccent opacity-60"
          />
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center relative z-10">
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
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
      </div>
      <Footer />
    </>
  );
};
export default LandingPage;
