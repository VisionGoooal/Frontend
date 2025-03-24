import LandingPageNavbar from "../components/layout/Navbar";

const Terms = () => {
  return (
    <>
      <LandingPageNavbar />
      <div className="container mx-auto mt-10 p-6 max-w-4xl bg-white shadow-lg rounded-lg">
        <h1 className="text-center text-3xl font-bold mb-6">Terms & Conditions</h1>
        
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p className="mt-2 text-gray-600">
            Welcome to <strong>VisionGoal</strong>. By accessing our platform, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.
          </p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">2. User Responsibilities</h2>
          <p className="mt-2 text-gray-600">
            Users must ensure that all interactions on the platform are respectful and lawful. Any misuse, including fraudulent activities or harmful behavior, may result in termination of access.
          </p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">3. Intellectual Property</h2>
          <p className="mt-2 text-gray-600">
            All content on VisionGoal, including text, graphics, logos, and software, is the property of VisionGoal and protected by copyright laws.
          </p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">4. Limitation of Liability</h2>
          <p className="mt-2 text-gray-600">
            VisionGoal is not responsible for any indirect or consequential loss resulting from the use of our platform. Users agree to use the service at their own risk.
          </p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">5. Changes to Terms</h2>
          <p className="mt-2 text-gray-600">
            VisionGoal reserves the right to update these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.
          </p>
        </div>
        
        <div className="text-center mt-8">
          <h3 className="text-xl font-medium">Thank you for being a part of VisionGoal!</h3>
        </div>
      </div>
    </>
  );
};

export default Terms;
