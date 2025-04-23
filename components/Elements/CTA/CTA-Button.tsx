"use client";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";

interface ButtonProps {
  className?: string;
  showIcon?: boolean;
  CTA?: string;
  route: string;
  height?: string;
  height2?: string;
  width?: string;
  backGround?: string;
  color?: string;
  isFunc?: boolean;
  func?: () => void;
  disabled?: boolean;
  rounded?: string;
}

const CTABTN: React.FC<ButtonProps> = ({
  className,
  showIcon = false,
  CTA,
  route,
  height = "h-[55px]",
  width = "w-[130px]",
  backGround = "bg-[#000000]",
  color = "text-white",
  rounded = "rounded-[6px]",
  height2,
  isFunc = false,
  func,
  disabled = false,
}) => {
  const router = useRouter();

  const handleSignInClick = (route: string) => {
    if (isFunc && func) {
      func();
    } else {
      router.push(route);
    }
  };

  return (
    <button
      className={`${width} ${height} ${backGround} ${color} ${rounded} flex items-center justify-center gap-2 font-semibold button-container  `}
      onClick={() => handleSignInClick(route)}
      disabled={disabled}
    >
      <span>{CTA}</span>
      <span
        className={`text-sm ${color} ${showIcon ? "icon-animate" : "hidden"}`}
      >
        <FaArrowRight />
      </span>
    </button>
  );
};

export default CTABTN;
