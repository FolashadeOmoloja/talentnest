import DashCards from "./DashCards";
import StatsCard from "./StatsCard";
type analytics = {
  analtyticsTitle: string;
  stats: number;
  desc: string;
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
      <aside className="grid grid-cols-3 gap-7">
        <DashCards
          gif="/images/dashboard/profile.gif"
          title={"Profile Status:"}
          status={status1}
          link={link1}
          linkName={"View Profile"}
          className={className}
        />
        <DashCards
          gif="/images/dashboard/suitcase.gif"
          title={"Work mode preference"}
          status={status2}
          link={link2}
          linkName={"Check My Jobs"}
          className={className}
        />
        <DashCards
          gif="/images/dashboard/message.gif"
          title={"Have an idea you’d like to share?"}
          status={""}
          link={"/contact-us"}
          linkName={"Send us a message"}
          className={className}
        />
      </aside>
      <section className="bg-white pt-14 px-9 max-sm:px-[10px] pb-20 rounded-md md:basis-[75%]">
        <div>
          <h1 className="text-2xl font-bold bg-text">Welcome back, {user}!</h1>
          <p className="text-gray-700 text-sm font-medium">{dashInfo}</p>
        </div>
        <StatsCard analytics={analytics} />
      </section>
    </section>
  );
};

export default DashboardLayout;
