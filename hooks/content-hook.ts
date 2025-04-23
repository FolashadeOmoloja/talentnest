import { setLoading } from "@/redux/slices/authSlice";
import {
  setBlog,
  setFaq,
  setFilter,
  setReview,
} from "@/redux/slices/contentSlice";
import { TALENT_API_END_POINT } from "@/utilities/constants/constants";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const useGetAllBlogPosts = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((store: any) => store.auth);
  const { blog } = useSelector((store: any) => store.content);
  useEffect(() => {
    const fetchblogPosts = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(`${TALENT_API_END_POINT}/get-blogs`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        dispatch(setBlog(response.data.blogPosts));
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch blogPost";
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchblogPosts();
  }, []);

  return { blog, loading };
};

export const useGetAllReviews = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((store: any) => store.auth);
  const { review } = useSelector((store: any) => store.content);
  useEffect(() => {
    const fetchReviews = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(
          `${TALENT_API_END_POINT}/get-reviews`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        dispatch(setReview(response.data.data));
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch reviews";
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchReviews();
  }, []);

  return { review, loading };
};

export const useGetAllFaqs = () => {
  const dispatch = useDispatch();

  const { faq } = useSelector((store: any) => store.content);
  const { loading } = useSelector((store: any) => store.auth);
  useEffect(() => {
    const fetchFaqs = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(`${TALENT_API_END_POINT}/get-faqs`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        dispatch(setFaq(response.data.data));
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch faqs";
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchFaqs();
  }, []);

  return { faq, loading };
};

export const useGetAllFilters = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((store: any) => store.auth);
  const { filter } = useSelector((store: any) => store.content);
  useEffect(() => {
    const fetchFilters = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(
          `${TALENT_API_END_POINT}/get-filters`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        dispatch(setFilter(response.data.data));
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch filters";
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchFilters();
  }, [dispatch]);

  return { filter, loading };
};
