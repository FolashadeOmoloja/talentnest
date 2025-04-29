import { Briefcase, Star, User } from "lucide-react";

type analytics = {
  analtyticsTitle: string;
  stats: number;
  desc: string | JSX.Element;
}[];
const DashboardLayout = ({
  dashInfo,
  analytics,
  link1,
  link2,
  status1,
  status2,
  className = "",
  user,
}: {
  dashInfo: string;
  analytics: analytics;
  link1: string;
  link2: string;
  status1: string;
  status2: string;
  className?: string;
  user?: string;
}) => {
  return (
    <section className="dashboard-container flex  gap-10 flex-col">
      <div>
        <h1 className="text-2xl font-bold bg-text-r">
          Welcome back, <span className="text-[#001E80]">{user}!</span>{" "}
        </h1>
        <p className="text-gray-700 text-sm font-medium">{dashInfo}</p>
      </div>
      <section className=" flex  gap-10 flex-col">
        <aside className="grid grid-cols-4 max-slg:grid-cols-3 max-md:grid-cols-2 max-smd:grid-cols-1  gap-7">
          {analytics.map((item, idx) => (
            <div
              key={`${item.analtyticsTitle}-${idx}`}
              className="rounded-2xl shadow-md p-4 bg-white flex justify-between items-center"
            >
              <span className="text-[#001E80] text-3xl"> {item.desc}</span>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-2">
                  {item.analtyticsTitle}
                </p>
                <h2 className="text-2xl font-bold">{item.stats}</h2>
              </div>
            </div>
          ))}
        </aside>
        {/* <section className="bg-white pt-14 px-9 max-sm:px-[10px] pb-20 rounded-2xl md:basis-[75%]">
        </section> */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Application Progress */}
          <div className="col-span-2 space-y-4">
            <div className="rounded-2xl shadow-md bg-white cursor-pointer">
              <div className="p-6">
                <h2 className="text-xl bg-text font-semibold mb-4">
                  Your Applications
                </h2>
                <div className="space-y-2">
                  <p className="text-gray-500">No active applications yet.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl shadow-md bg-white cursor-pointer">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Scheduled Interviews
                </h2>
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    No interviews scheduled.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl shadow-md bg-white cursor-pointer">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Offers</h2>
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    No offers received yet.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="space-y-4">
            <div className="rounded-2xl shadow-md bg-[#001E80] text-white cursor-pointer">
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <User className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Profile Status
                    </p>
                    <h3 className="text-lg font-bold">Waitlist</h3>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Briefcase className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Work Preference
                    </p>
                    <h3 className="text-lg font-bold">Remote</h3>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Star className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Profile Strength
                    </p>
                    <h3 className="text-lg font-bold">80%</h3>
                  </div>
                </div>

                <button className="w-full mt-4 bg-white text-black">
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="rounded-2xl shadow-md bg-white cursor-pointer">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Suggested Jobs</h2>
                <p className="text-muted-foreground">
                  No suggestions yet. Complete your profile to get matched!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Talent Tips and Community */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl shadow-md bg-white cursor-pointer">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">Talent Tips</h2>
              <p className="text-muted-foreground">
                Check out our guides on creating the perfect CV and preparing
                for interviews.
              </p>
            </div>
          </div>

          <div className="rounded-2xl shadow-md bg-white cursor-pointer">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">Community Updates</h2>
              <p className="text-muted-foreground">
                Join upcoming webinars and hiring events hosted by TalentNest.
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default DashboardLayout;
