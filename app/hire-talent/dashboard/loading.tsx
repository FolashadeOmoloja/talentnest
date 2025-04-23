import Image from "next/image";

const loading = () => (
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <Image
      width={138}
      height={54}
      src={"/images/homepage/loader.png"}
      alt="logo"
      priority
    />
    <div className="flex space-x-2">
      <div className="w-4 h-4 bg-[#000080] rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-[#00B5E8] rounded-full animate-bounce delay-75"></div>
      <div className="w-4 h-4 bg-[#22CCED] rounded-full animate-bounce delay-150"></div>
    </div>
  </div>
);

export default loading;
