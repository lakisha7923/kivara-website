export default function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center text-[#0D2B4D]">
          How Kivara Works
        </h2>

        <p className="text-center text-gray-600 mt-4 mb-16 text-lg">
          Simple. Fast. Reliable staffing for facilities and professionals.
        </p>

        <div className="grid lg:grid-cols-2 gap-16">

          {/* Facilities */}

          <div>

            <h3 className="text-3xl font-bold text-[#0D2B4D] mb-8">
              🏥 For Facilities
            </h3>

            <div className="space-y-6">

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-xl">Create an Account</h4>
                  <p className="text-gray-600">
                    Register your healthcare facility securely.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-xl">Post Open Shifts</h4>
                  <p className="text-gray-600">
                    Add available shifts in minutes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-xl">Review Applicants</h4>
                  <p className="text-gray-600">
                    View qualified professionals and accept the best fit.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-xl">Fill Your Shift</h4>
                  <p className="text-gray-600">
                    Manage staffing with confidence.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Professionals */}

          <div>

            <h3 className="text-3xl font-bold text-[#0D2B4D] mb-8">
              👩‍⚕️ For Professionals
            </h3>

            <div className="space-y-6">

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0D2B4D] text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-xl">Create Your Profile</h4>
                  <p className="text-gray-600">
                    Showcase your credentials and experience.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0D2B4D] text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-xl">Browse Available Shifts</h4>
                  <p className="text-gray-600">
                    Search for opportunities that fit your schedule.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0D2B4D] text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-xl">Apply Instantly</h4>
                  <p className="text-gray-600">
                    Submit applications with one click.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0D2B4D] text-white flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-xl">Start Working</h4>
                  <p className="text-gray-600">
                    Get hired, complete shifts, and grow your career.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}