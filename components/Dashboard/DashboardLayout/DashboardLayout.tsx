import { Briefcase, Star, User } from "lucide-react";
import { useRouter } from "next/navigation";

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
  link3,
  status1,
  status2,
  cardDesc1,
  cardDesc2,
  cardDesc3,
  cardTitle1,
  cardTitle2,
  cardTitle3,
  user,
  company = false,
}: {
  dashInfo: string;
  analytics: analytics;
  link1: string;
  link2: string;
  link3: string;
  status1: string;
  status2: string;
  cardDesc1: string;
  cardDesc2: string;
  cardDesc3: string;
  cardTitle1: string;
  cardTitle2: string;
  cardTitle3: string;
  user?: string;
  company?: boolean;
}) => {
  const router = useRouter();
  return (
    <section className="dashboard-container flex  gap-10 flex-col">
      <div>
        <h1 className="text-2xl font-bold bg-text-r">
          Welcome back, <span className="text-[#001E80]">{user}!</span>{" "}
        </h1>
        <p className="text-gray-700 text-sm font-medium">{dashInfo}</p>
      </div>
      <section className=" flex  lg:gap-10 gap-4 flex-col">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Application Progress */}
          <div className="lg:col-span-2 space-y-4 max-lg:order-2">
            <StatsCard title={cardTitle1} desc={cardDesc1} link={link1} />
            <StatsCard title={cardTitle2} desc={cardDesc2} link={link2} />
            <StatsCard title={cardTitle3} desc={cardDesc3} link={link3} />
          </div>

          {/* Profile Info */}
          <div className="space-y-4 max-lg:order-1">
            <div className="rounded-2xl shadow-md bg-[#001E80] text-white cursor-pointer">
              <div className="p-6 space-y-4">
                <ProfileCards
                  gif="/images/dashboard/user.gif"
                  title="Work Preference"
                  status={status1}
                />
                <ProfileCards
                  gif="/images/dashboard/suitcase.gif"
                  title="Profile Status"
                  status={status2}
                />
                <ProfileCards
                  gif="/images/dashboard/star.gif"
                  title="Profile Strength"
                  status="80%"
                />

                <button
                  onClick={() => router.push("/dashboard/profile")}
                  className="w-full mt-4 form-btn bg-[#EAEEFE] font-semibold text-black hover:bg-white"
                >
                  Edit Profile
                </button>
              </div>
            </div>
            <StatsCard
              title={"Suggested Jobs"}
              desc={"No suggestions yet. Complete your profile to get matched!"}
              link={"/dashboard/jobs"}
            />
          </div>
        </div>

        {/* Bottom Section - Talent Tips and Community */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatsCard
            title={"Talent Tips"}
            desc={
              "Check out our guides on creating the perfect CV and preparing for interviews."
            }
            link={"/blog"}
          />
          <StatsCard
            title={"Community Updates"}
            desc={
              "Join upcoming webinars and hiring events hosted by TalentNest."
            }
            link={"/help-desk"}
          />
        </div>
      </section>
    </section>
  );
};

export default DashboardLayout;

const StatsCard = ({
  title,
  desc,
  link,
}: {
  title: string;
  desc: string;
  link: string;
}) => {
  const router = useRouter();
  return (
    <div
      className="rounded-2xl shadow-md bg-white cursor-pointer p-6"
      onClick={() => router.push(link)}
    >
      <h2 className="text-xl bg-text font-semibold mb-4">{title}</h2>
      <div className="space-y-2">
        <p className="text-gray-500">{desc}</p>
      </div>
    </div>
  );
};

const ProfileCards = ({ gif, title, status }: any) => (
  <div className="flex items-center gap-4">
    <img src={gif} alt="" className="w-8 h-8 " />
    <div>
      <p className="text-muted-foreground text-sm">{title}</p>
      <h3 className="text-lg font-bold">{status}</h3>
    </div>
  </div>
);
