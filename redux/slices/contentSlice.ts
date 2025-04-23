import { createSlice } from "@reduxjs/toolkit";

const contentSlice = createSlice({
  name: "content",
  initialState: {
    blog: [],
    faq: [],
    review: [],
    filter: {
      _id: "",
      skills: [""],
      country: [""],
      role: [""],
    },
    post: {
      _id: "",
      title: "",
      author: "",
      blogImage: "",
      content: "",
      createdAt: "",
      updatedAt: "",
    },
  },
  reducers: {
    setBlog: (state, action) => {
      state.blog = action.payload;
    },
    setFaq: (state, action) => {
      state.faq = action.payload;
    },
    setReview: (state, action) => {
      state.review = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
  },
});

export const { setFaq, setBlog, setReview, setPost, setFilter } =
  contentSlice.actions;
export default contentSlice.reducer;
