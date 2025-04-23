import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

type BlogPost = {
  img: string;
  date: string;
  title: string;
  readTime: string;
};

const Filter = ({
  onFilter,
  blogPosts,
}: {
  onFilter: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  blogPosts: BlogPost[];
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredPosts = blogPosts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onFilter(filteredPosts);
  }, [searchTerm, onFilter]);

  return (
    <div className=" flex justify-center w-full ">
      <div className="mb-5 relative w-full md:w-[80%] ">
        <input
          type="text"
          id="searchInput"
          placeholder="Nest Posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full  p-5 h-[56px] text-sm  bg-[#EAEEFE] rounded-full focus:border-2 focus:border-[#010D3E] focus:bg-transparent outline-none placeholder:italic transition ease-in"
        />
        <div className="absolute top-2 right-2 h-10 w-10 flex items-center justify-center bg-[#010D3E]  cursor-pointer text-white rounded-full">
          <FaSearch />
        </div>
      </div>
    </div>
  );
};

export default Filter;
