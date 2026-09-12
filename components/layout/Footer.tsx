import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0D2B4D] text-white py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-8 md:grid-cols-4">
        <div>
          <h2 className="text-2xl font-bold mb-4">Kivara Healthcare</h2>
          <p className="text-gray-300">
            Connecting healthcare professionals with facilities through a
            modern shift marketplace.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link href="/about" className="hover:text-teal-300">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-teal-300">
                Services
              </Link>
            </li>
            <li>
              <Link href="/facilities" className="hover:text-teal-300">
                Facilities
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-teal-300">
                Contact / Join
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Professionals</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link href="/register" className="hover:text-teal-300">
                Create profile
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-teal-300">
                Login
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Facilities</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link href="/register" className="hover:text-teal-300">
                Register facility
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-teal-300">
                Facility login
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-4 pt-6 text-sm text-gray-400 sm:px-8">
        © {new Date().getFullYear()} Kivara Healthcare. All rights reserved.
      </div>
    </footer>
  );
}
