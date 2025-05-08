import CustomHeader, {
  HeaderTitle,
  ParagraphText,
} from "../Elements/CustomHeader";

const ContactHeader = () => {
  return (
    <CustomHeader>
      <div className="flex flex-col items-center justify-center  relative">
        <HeaderTitle
          title="Your NestHub Guide, Talent meets opportunity"
          className="max-w-[800px]"
        />
      </div>
    </CustomHeader>
  );
};

export default ContactHeader;
