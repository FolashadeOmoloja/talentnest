import { Loader2, LoaderCircle } from "lucide-react";

const Loader = () => {
  return (
    <svg width="64" height="64" className="animate-spin">
      <linearGradient id="myGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: "#010D3E", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#183EC2", stopOpacity: 1 }} />
      </linearGradient>
      <LoaderCircle width={64} height={64} stroke="url(#myGradient)" />
    </svg>
  );
};

export default Loader;
