import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const DashCards = ({
  gif,
  title,
  status,
  link,
  linkName,
  className,
}: {
  gif: string;
  title: string;
  status: string;
  link: string;
  linkName: string;
  className?: string;
}) => {
  return (
    <div
      className={`bg-white rounded-md flex flex-col w-full h-[200px] ${className}  pl-7 pr-4 pt-6 gap-2`}
    >
      <img src={gif} alt="" className="w-11 h-11 " />
      <span className="text-lg font-semibold  ">{title}</span>
      <span className="text-3xl font-bold ">{status}</span>
      <Link
        href={link}
        className="flex items-center gap-2 text-[#000080] text-sm font-semibold"
      >
        <span>{linkName}</span>
        <FaArrowRight className="icon-animate" />
      </Link>
    </div>
  );
};

export default DashCards;
