const ContactHeader = () => {
  return (
    <header className="section-container flex max-slg:flex-col justify-between items-center">
      <div className="flex flex-col max-slg:items-center max-slg:mb-6 slg:ml-[5px]">
        <span className="text-[#161519] headingspan mb-0">Let’s talk!</span>
        <h2 className="header-headline">
          How can we{" "}
          <span className="header-headline-span max-sm:text-[#000080] max-sm:bg-none">
            help ?
          </span>
        </h2>
      </div>
      <div className="rounded-xl basis-[40%]">
        <img
          src="/images/homepage/contactuspic.svg"
          alt="img"
          className="w-full"
          loading="eager"
        />
      </div>
    </header>
  );
};

export default ContactHeader;
