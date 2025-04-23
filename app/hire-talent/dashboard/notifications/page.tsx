"use client";
import HireTalentNav from "@/components/Dashboard/HireTalentDashboard/HireTalentNav";
import Notifications from "@/components/Dashboard/TalentDashboard/NotificationsCont";
import { useGetCompanyNotifications } from "@/hooks/notification-hook";
import { useSelector } from "react-redux";

const SettingsPage = () => {
  const { loading } = useGetCompanyNotifications();
  const { companyNotifications } = useSelector(
    (store: any) => store.notification
  );
  return (
    <>
      <HireTalentNav activeItem={0} />
      <Notifications
        notifications={companyNotifications}
        loading={loading}
        isCompany
      />
    </>
  );
};

export default SettingsPage;
