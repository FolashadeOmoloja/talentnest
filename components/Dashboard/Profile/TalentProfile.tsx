"use client";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import ClientProvider from "@/components/Client/ClientProvider";

const TalentProfile = () => {
  const { user } = useSelector((store: any) => store.auth);
  return (
    <ClientProvider>
      <Profile skillsBool user={user} skillsArr={user?.skills} />
    </ClientProvider>
  );
};

export default TalentProfile;
