"use client";
import Notifications from "@/components/Dashboard/TalentDashboard/NotificationsCont";
import TalentNavbar from "@/components/Dashboard/TalentDashboard/TalentNavbar";
import { useGetTalentNotifications } from "@/hooks/notification-hook";
import { useSelector } from "react-redux";

const SettingsPage = () => {
  const { loading } = useGetTalentNotifications();
  const { talentNotifications } = useSelector(
    (store: any) => store.notification
  );
  return (
    <>
      <TalentNavbar activeItem={0} />
      <Notifications
        notifications={talentNotifications}
        loading={loading}
        isCompany={false}
      />
    </>
  );
};

export default SettingsPage;
