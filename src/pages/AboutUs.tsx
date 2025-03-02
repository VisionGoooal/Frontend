import linkedinIcon from "../assets/icons/linkedinIcon.svg";
import coFounders from "../assets/fourCoFounders.webp";
import LandingPageNavbar from "../components/navbars-components/LandingPageNavbar";
import "../css/pages_css/AboutUs.css";
import Footer from "../components/ui-components/Footer";

const people = [
  {
    name: "Roie Raz",
    role: "Co-Founder",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D4D03AQHb6IW5xlIKfQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728378456315?e=1746057600&v=beta&t=c6pPahE2Qf2FC_W7gkrWn94hKL4ASAdlAyhh2rZ4-zc",
    linkedin: "https://www.linkedin.com/in/roieraz68/",
  },
  {
    name: "Elad Rabinovich",
    role: "Co-Founder",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D4D03AQFB6Ojq6-nj9A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1710926560970?e=1746057600&v=beta&t=orgq59weoLR8Iu97enP3iZos0z9os5FXTRrH2EXs3sA",
    linkedin: "https://www.linkedin.com/in/elad-rabinovitch-073263209/",
  },
  {
    name: "Shay Mashiach",
    role: "Co-Founder",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/C4D03AQHmighMbbUn6w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1628174648137?e=1746057600&v=beta&t=oyKTgfvv9W8nHlU3nT4RUH-mXoRYwlGEm5B8IPp4SX4",
    linkedin: "https://www.linkedin.com/in/shay-mashiach-4bb15620b/",
  },
  {
    name: "Omri Ivri",
    role: "Co-Founder",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D4D03AQFMYuWn43vC8Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718219835910?e=1746057600&v=beta&t=k7cohVm-ij3Vfx92zGrTEHjJ1vOK4p2fLDCdQ6odAuM",
    linkedin: "https://www.linkedin.com/in/omri-ivri-1306982a2/",
  },
];

const AboutUs = () => {
  return (
    <>
      <LandingPageNavbar />

      {/* About Us Section */}
      <div className="2xl:container 2xl:mx-auto lg:px-20 md:py-12 md:px-6 py-9 px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
              About Us
            </h1>
            <p className="font-normal text-xl leading-6 text-gray-600">
              VisionGoal is dedicated to revolutionizing the football experience
              by leveraging data, technology, and community engagement. Our
              mission is to empower fans with AI-driven insights, analytics, and
              the collective wisdom of the sports community.
            </p>
          </div>
          <div className="w-full lg:w-6/12 relative overflow-hidden rounded-lg shadow-lg">
            <img
              className="w-full h-full object-cover"
              src={coFounders}
              alt="Team VisionGoal"
            />
          </div>
        </div>
      </div>

      {/* Meet Our Leadership Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">
              Meet our leadership
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              We are a passionate team of football enthusiasts, data analysts,
              and tech innovators committed to transforming the way fans
              experience the game through cutting-edge insights and AI-driven
              predictions.
            </p>
          </div>
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
          >
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <img
                    alt=""
                    src={person.imageUrl}
                    className="size-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">
                      {person.name}
                    </h3>
                    <p className="text-sm/6 font-semibold text-indigo-600">
                      {person.role}
                    </p>
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={linkedinIcon}
                        alt="LinkedIn"
                        className="w-5 h-5"
                      />
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
