import Link from "next/link";
import { FC, ReactNode } from "react";

interface CustomLinkProps {
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const CustomLink: FC<CustomLinkProps> = ({
  href,
  children,
  className,
  onClick,
}) => {
  if (href && href !== "nil") {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};

export default CustomLink;
