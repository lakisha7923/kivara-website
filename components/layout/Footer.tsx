export default function Footer() {
  return (
    <footer className="bg-[#0D2B4D] text-white py-16">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-2xl font-bold mb-4">
            Kivara Healthcare
          </h2>

          <p className="text-gray-300">
            Connecting healthcare professionals with facilities through
            trusted staffing solutions.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Company</h3>

          <ul className="space-y-2 text-gray-300">
            <li>About</li>
            <li>Services</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Professionals</h3>

          <ul className="space-y-2 text-gray-300">
            <li>Browse Jobs</li>
            <li>Create Profile</li>
            <li>Login</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Facilities</h3>

          <ul className="space-y-2 text-gray-300">
            <li>Find Staff</li>
            <li>Post Shift</li>
            <li>Facility Login</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
        © 2026 Kivara Healthcare. All rights reserved.
      </div>
    </footer>
  );
}