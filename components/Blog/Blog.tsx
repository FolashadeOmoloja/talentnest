import CustomHeader, {
  HeaderTitle,
  ParagraphText,
} from "../Elements/CustomHeader";
import Header from "../FAQ/Header";
import CTA from "../LandingPage/Offer/CTA";
import BlogPost from "./BlogPost";
import Filter from "./Filter";

const Blog = () => {
  return (
    <main>
      <CustomHeader>
        <div className="flex flex-col items-center justify-center  relative h-[350px]">
          <HeaderTitle
            title="Your NestHub Guide, Talent meets opportunity"
            className="max-w-[800px]"
          />
          <ParagraphText
            text={
              <p>
                Insights, tips, and stories curated to help you thrive — whether
                you’re building your freelance career or growing your company
                with top talent. Dive in and make the most of your TalentNest
                journey.
              </p>
            }
          />
        </div>
      </CustomHeader>
      <BlogPost />
      <CTA showTwoCta />
    </main>
  );
};

export default Blog;
