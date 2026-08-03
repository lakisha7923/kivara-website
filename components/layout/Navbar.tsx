import Image from "next/image";
export default function Navbar() {
  return (
    <nav className="bg-[#0D2B4D] text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

        <div className="flex items-center gap-3">

  <Image
     src="/logo/kivara-logo.png"
    alt="Kivara Healthcare Logo"
    width={42}
    height={42}
    priority
  />

  <div>
    <h1 className="text-xl font-bold text-white leading-none">
  Kivara
</h1>

<p className="text-[10px] uppercase tracking-[0.3em] text-teal-300">
  Healthcare
</p>
  </div>

</div>

        <div className="flex gap-8 items-center">

          <a href="/">Home</a>

          <a href="/about">About</a>

          <a href="/services">Services</a>

          <a href="/facilities">Facilities</a>

          <a href="/professionals">Professionals</a>

          <a href="/contact">Contact</a>

          <a
            href="/login"
            className="bg-teal-500 px-5 py-2 rounded-full"
          >
            Login
          </a>

        </div>
      </div>
    </nav>
  );
}