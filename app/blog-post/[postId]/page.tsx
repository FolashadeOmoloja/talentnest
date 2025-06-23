"use client";
import CTABTN from "@/components/Elements/CTA/CTA-Button";
import Navbar from "@/components/LandingPage/Navbar/NavBar";
import Footer from "@/components/LandingPage/Offer/Footer";
import { formatTimeDifference } from "@/utilities/constants";
import DOMPurify from "dompurify";
import { useSelector } from "react-redux";

const BlogPage = ({ params }: { params: { postId: string } }) => {
  const { post } = useSelector((store: any) => store.content);
  const postDate = formatTimeDifference(post.createdAt || post.updatedAt);

  const sanitizedContent = DOMPurify.sanitize(post.content ? post.content : "");

  return (
    <>
      <Navbar activeItem={2} />
      <main className="section-container  mt-0  pt-[70px] pb-[50px] max-slg:pt-[50px] bg-[#EAEEFE]">
        <div className="flex max-xsm:flex-col text-sm gap-1 xsm:items-center mb-2">
          <span className="font-semibold">
            {post?.author} | {"   "}{" "}
          </span>
          <span className="text-[#52525c]"> {postDate}</span>
        </div>
        <h3 className="bg-text font-bold text-[48px] max-md:text-[38px] max-sm:text-3xl">
          {post?.title}
        </h3>

        <div className="w-full aspect-video h-[500px] max-sm:h-[350px] rounded-2xl overflow-hidden mb-16">
          <img
            src={post.blogImage}
            alt="blog img"
            className="w-full h-full object-cover"
          />
        </div>
        <main className="tracking-[1%] blog-post">
          <article dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        </main>
        <div className="mt-24">
          <CTABTN route={"/blog"} CTA="Go back" showIcon />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogPage;
