export default function FacilityDashboard() {
  return (
    <main className="min-h-screen bg-slate-100">

      <header className="bg-[#0D2B4D] text-white p-6 shadow">
        <h1 className="text-3xl font-bold">
          Facility Dashboard
        </h1>

        <p className="text-slate-300 mt-1">
          Manage your healthcare staffing needs.
        </p>
      </header>

      <section className="p-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-2">
            ➕ Post New Job
          </h2>

          <p className="text-gray-600">
            Create a new healthcare job opening.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-2">
            👩‍⚕️ Applicants
          </h2>

          <p className="text-gray-600">
            Review professionals who applied.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-2">
            📅 Manage Shifts
          </h2>

          <p className="text-gray-600">
            Schedule healthcare professionals.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-2">
            💬 Messages
          </h2>

          <p className="text-gray-600">
            Communicate with professionals.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-2">
            📊 Reports
          </h2>

          <p className="text-gray-600">
            View staffing activity and analytics.
          </p>
        </div>

      </section>

    </main>
  );
}