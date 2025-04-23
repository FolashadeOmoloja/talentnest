import {
  useDeleteAllCompanyNotifications,
  useDeleteAllTalentNotifications,
  useDeleteCompanyNotificationById,
  useDeleteTalentNotificationById,
} from "@/hooks/notification-hook";
import { formatTimeDifference } from "@/utilities/constants";
import { Loader2 } from "lucide-react";
import { FaTrash } from "react-icons/fa6";
import { ImNotification } from "react-icons/im";
import { IoMdNotifications } from "react-icons/io";

type IsActiveState = {
  [key: number]: boolean;
};
type Notification = {
  _id: string;
  senderMessage: string;
  receiverMessage: string;
  createdAt: string;
};
const Notifications = ({
  notifications,
  loading,
  isCompany,
}: {
  notifications: Notification[];
  loading?: boolean;
  isCompany?: boolean;
}) => {
  const { onSubmit: deleteCompanyNotice } = useDeleteCompanyNotificationById();
  const { onSubmit: deleteTalentNotice } = useDeleteTalentNotificationById();
  const { onSubmit: deleteAllCompanyNotice } =
    useDeleteAllCompanyNotifications();
  const { onSubmit: deleteAllTalentNotice } = useDeleteAllTalentNotifications();
  const deleteAllNotification = () => {
    isCompany ? deleteAllCompanyNotice() : deleteAllTalentNotice();
  };
  const deleteNotice = (id: string) => {
    isCompany ? deleteCompanyNotice(id) : deleteTalentNotice(id);
  };

  return (
    <section className="dashboard-container min-h-svh">
      <h2 className="text-2xl font-bold mb-1">
        Keep track of your notifications
      </h2>
      <div className="flex w-full text-[#000080] md:text-lg font-bold mt-16 border-b-[3px] border-[#000080]">
        <span className={`tab active max-sm:h-[50px]`}>Notifications</span>
      </div>
      <section className="mt-10">
        <section>
          {loading ? (
            <Loader2 className=" h-14 w-14 animate-spin ml-10 mt-10 text-[#000080]" />
          ) : notifications.length > 0 ? (
            <ul className="gap-5 flex flex-col">
              {notifications.map((item, idx) => (
                <li
                  key={idx}
                  className="border-[#CCD2D9] border rounded-md p-6 max-sm:p-3 shadow-lg"
                >
                  <div className="flex gap-14 max-sm:gap-4">
                    <div className="bg-[#000080] text-[#00B5E8] centered rounded-full min-w-12 h-12">
                      <IoMdNotifications className="text-2xl" />
                    </div>
                    <div className="max-sm:text-sm notice-div">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.receiverMessage,
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm mt-4">
                      {formatTimeDifference(item.createdAt)}
                    </p>
                    <div
                      className="text-xl text-red-700 cursor-pointer"
                      onClick={() => {
                        deleteNotice(item._id);
                      }}
                    >
                      <FaTrash />
                    </div>
                  </div>
                </li>
              ))}
              <button
                onClick={deleteAllNotification}
                className="py-4 px-6 max-w-[300px] mt-10 bg-[#000080] text-white rounded-md font-semibold btn-hover"
              >
                Clear Notification
              </button>
            </ul>
          ) : (
            <div className="font-semibold text-2xl text-gray-800  flex gap-6 items-center italic">
              <ImNotification className="text-red-600 xsm:text-3xl text-base" />
              <span>No new notification</span>
            </div>
          )}
        </section>
      </section>
    </section>
  );
};

export default Notifications;
