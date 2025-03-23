import Navbar from "../components/layout/Navbar";

const PrivacyPolicyPage = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-lg mx-auto p-5">
    <div className="grid grid-cols-1 md:grid-cols-12 border">
        <div className="bg-gray-900 md:col-span-4 p-10 text-white">
            <p className="mt-4 text-sm leading-7 font-regular uppercase">
                Privacy Policy
            </p>
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight">
                Our <span className="text-indigo-600">Commitment</span>
            </h3>
            <p className="mt-4 leading-7 text-gray-200">
                Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.
            </p>
        </div>
        <div className="md:col-span-8 p-10">
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <p className="text-gray-700 mb-4">We may collect personal information such as your name, email address, and contact details when you interact with our website.</p>
            
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">Your information is used to improve our services, process transactions, and communicate with you regarding updates or promotions.</p>
            
            <h2 className="text-2xl font-bold mb-4">Sharing of Information</h2>
            <p className="text-gray-700 mb-4">We do not sell or rent your personal data. However, we may share it with trusted third-party services for essential operations.</p>
            
            <h2 className="text-2xl font-bold mb-4">Your Choices</h2>
            <p className="text-gray-700 mb-4">You have the right to access, update, or delete your personal information. Contact us if you have any requests.</p>
            
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-700">If you have any questions regarding our Privacy Policy, feel free to <a href="/contact" className="text-blue-600 hover:underline">contact us</a>.</p>
        </div>
    </div>
</div>

    </>
  );
};

export default PrivacyPolicyPage;