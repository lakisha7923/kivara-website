import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#0D2B4D] text-white p-6">

      <h1 className="text-2xl font-bold mb-10">
        Kivara
      </h1>

      <nav className="space-y-4">

        <Link
          href="/professional"
          className="block hover:text-teal-300"
        >
          🏠 Dashboard
        </Link>

        <Link
          href="/post-job"
          className="block hover:text-teal-300"
        >
          💼 Jobs
        </Link>

        <Link
          href="#"
          className="block hover:text-teal-300"
        >
          📄 Applications
        </Link>

        <Link
          href="#"
          className="block hover:text-teal-300"
        >
          💬 Messages
        </Link>

        <Link
          href="#"
          className="block hover:text-teal-300"
        >
          👤 Profile
        </Link>

        <Link
          href="#"
          className="block hover:text-teal-300"
        >
          ⚙️ Settings
        </Link>

      </nav>

    </aside>
  );
}