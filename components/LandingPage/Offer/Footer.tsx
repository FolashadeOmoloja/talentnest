import { DarkModeLogo } from "@/components/Elements/Logo";

const Footer = () => {
  return (
    <footer className="section-container bg-black text-white  mt-0 max-slg:mt-0  pt-[100px] max-slg:pt-[50px]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-5">
        {/* Column 1 */}

        <div className="lg:col-span-2 col-span-1">
          <a className="flex justify-cente">
            <DarkModeLogo />
          </a>
          <p className="text-sm  mt-8 font-[600] leading-[26.4px] max-w-[300px] text-[#BCBCBC]">
            Let TalentNest connect help you find right person or the right job ,
            powered by our AI-driven platform designed to simplify hiring.
          </p>
        </div>

        {/* Column 2 */}
        <div className="col-span-1 flex flex-col lg:items-end">
          <ul>
            <li className="text-lg  font-bold  mb-4 cursor-pointer">
              <span className=" ">Nest For Companies</span>
              <ul className="text-sm mt-4 flex flex-col gap-1 text-[#BCBCBC]">
                <li>
                  <a href="/hire-talent">Hire Talent</a>
                </li>
                <li>
                  <a href="/talentnest-experiences">TalentNest Experiences</a>
                </li>
              </ul>
            </li>
            <li className="text-lg  font-bold  cursor-pointer">
              <span className=" ">Nest For Talents</span>
              <ul className=" text-sm mt-4 flex flex-col gap-1 text-[#BCBCBC]">
                <li>
                  <a href="/jobs"> Find Job</a>
                </li>
                <li>
                  <a href="/sign-in">Sign In</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="col-span-1 flex flex-col lg:items-end">
          <ul>
            <li className="text-lg  font-bold  mb-8">
              <span>Nest Help</span>
              <ul className=" text-sm mt-4 text-[#BCBCBC]">
                <li className=" cursor-pointer">
                  <a href="/help-desk">Nest HelpDesk</a>
                </li>
              </ul>
            </li>
            <li className="text-lg  font-bold  cursor-pointer">
              <span className=" ">NestHub</span>
              <ul className=" text-sm mt-4 flex flex-col gap-1 text-[#BCBCBC]">
                <li className=" ">
                  <a href="/blog">Blog</a>
                </li>
                <li className=" ">
                  <a href="/faq">Faq</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-[42px]  w-full h-[1px] bg-[#e7e7e7]"></div>
      <ul className="w-full  flex justify-end  text-sm gap-8 py-9 max-sm:gap-5 max-sm:flex-col text-[#BCBCBC]">
        <li>
          <a href="">Sitemap</a>
        </li>
        <li>
          <a href="">Security</a>
        </li>
        <li>
          <a href="">Privacy Policy</a>
        </li>
        <li>
          <a href="">Terms of service</a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
