import CustomHeader, {
  HeaderTitle,
  ParagraphText,
} from "../Elements/CustomHeader";

const Header = () => {
  return (
    <CustomHeader>
      <div className="flex flex-col items-center justify-center  relative h-[350px]">
        <HeaderTitle
          title="You've got questions? We've got answers"
          className="max-w-[700px]"
        />
        <ParagraphText
          text={
            <p>
              Some of the{" "}
              <span className="font-bold">most common questions</span> we get
              asked by our clients. If you have a question that isn't answered
              here, please feel free to reach out to us through our help desk.
            </p>
          }
        />
      </div>
    </CustomHeader>
  );
};

export default Header;
