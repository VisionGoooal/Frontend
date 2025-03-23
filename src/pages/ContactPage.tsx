import Navbar from "../components/layout/Navbar";

const ContactPage = () => {
  return (
    <>
      <Navbar />
      
      {/* Contact Us Header Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">Contact</h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              Want to contact us? Choose an option below and we'll be happy to show you how we can transform your company's web experience.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Content */}
      <div className="bg-white pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid md:grid-cols-2 gap-x-8 gap-y-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-gray-900">Contact Us</h3>
            <p className="mt-4 text-base/7 text-gray-600">
              Have something to say? We are here to help. Fill up the form or send email or call phone.
            </p>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z">
                  </path>
                </svg>
                <span className="text-base/7">Eli Visel 1, Miami</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75">
                  </path>
                </svg>
                <a href="mailto:hello@company.com" className="text-base/7 hover:text-indigo-600 transition-colors">hello@VisionGoal.com</a>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z">
                  </path>
                </svg>
                <a href="tel:11111111111" className="text-base/7 hover:text-indigo-600 transition-colors">+972 503585555</a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <form>
              <input type="checkbox" id="botcheck" className="hidden" style={{display: "none"}} name="botcheck" />
              
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  autoComplete="false"
                  className="w-full px-4 py-3 border-2 placeholder:text-gray-500 rounded-md outline-none focus:ring-2 border-gray-300 focus:border-indigo-600 ring-indigo-100"
                  name="name"
                />
              </div>
              
              <div className="mb-5">
                <label htmlFor="email_address" className="sr-only">Email Address</label>
                <input
                  id="email_address"
                  type="email"
                  placeholder="Email Address"
                  autoComplete="false"
                  className="w-full px-4 py-3 border-2 placeholder:text-gray-500 rounded-md outline-none focus:ring-2 border-gray-300 focus:border-indigo-600 ring-indigo-100"
                  name="email"
                />
              </div>
              
              <div className="mb-5">
                <textarea
                  placeholder="Your Message"
                  className="w-full px-4 py-3 border-2 placeholder:text-gray-500 rounded-md outline-none h-36 focus:ring-2 border-gray-300 focus:border-indigo-600 ring-indigo-100"
                  name="message"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full py-3 px-6 font-semibold text-white transition-colors bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;