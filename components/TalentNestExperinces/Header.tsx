import StatCounter from "./StatCounter";
import CustomHeader, {
  HeaderTitle,
  ParagraphText,
} from "../Elements/CustomHeader";

const Header = () => {
  return (
    <CustomHeader>
      <div className="flex flex-col items-center text-center relative">
        <HeaderTitle title="TalentNest Experiences – Real Stories From Our Community" />
        <ParagraphText
          text={
            <p>
              <span className="font-bold">Stories from the Nest! </span> Get
              inspired by real experiences from our TalentNest
              community—freelancers growing their careers and companies finding
              the right talent to bring their vision to life.
            </p>
          }
        />
        <StatCounter />
      </div>
    </CustomHeader>
  );
};

export default Header;
