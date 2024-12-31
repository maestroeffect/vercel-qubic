import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../component/BreadCrumb";
import FontAwesome from "../../../component/uiStyle/FontAwesome";
import { Link, useParams } from "react-router-dom";
import WidgetTab from "../../../component/WidgetTab";
import WidgetTrendingNews from "../../../component/WidgetTrendingNews";
import NewsLetter from "../../../component/NewsLetter";
import MostShareWidget from "../../../component/MostShareWidget";
import FollowUs from "../../../component/FollowUs";
import BannerSection from "../../../component/BannerSection";
import PostOnePagination from "../../../component/PostOnePagination";

// images
import banner2 from "../../../assets/img/banner/banner-2.jpg";
import big2 from "../../../assets/img/post-thumb-4.png";
import author2 from "../../../assets/img/comments-1.png";
import quote from "../../../assets/img/icon/q.png";
import quote_1 from "../../../assets/img/post-quote.jpg";
import big1 from "../../../assets/img/post-thumb-3.jpg";
import smail1 from "../../../assets/img/post-thumb-2.png";
import single_post1 from "../../../assets/img/post-thumb-5.png";
import OurBlogSection from "../../../component/OurBlogSection";
import BlogComment from "../../../component/BlogComment";


function Post1() {
  const { slug } = useParams(); // Get slug from URL params
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const generateSlug = (title) => {
    if (typeof title !== "string") return ""; // Ensure title is a string
    return title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  };

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const response = await fetch(`http://localhost:5000/rss-feed`);
  //       const data = await response.json();

  //       if (data.items && Array.isArray(data.items)) {
  //         const post = data.items.find(item => {
  //           const title = item.title?._ || "Unknown Title";
  //           const generatedSlug = generateSlug(title);
  //           return decodeURIComponent(generatedSlug).toLowerCase() === decodeURIComponent(slug).toLowerCase();
  //         });
  //         setPost(post);
  //       } else {
  //         setError("No items found in the RSS feed.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching post:", error);
  //       setError("Error fetching post data.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPost();
  // }, [slug]);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://vercel-qubic-server.vercel.app/rss-feed`);
        const data = await response.json();

        if (data.items && Array.isArray(data.items)) {
          const post = data.items.find(item => {
            const title = item.title?._ || "Unknown Title";
            const generatedSlug = generateSlug(title);
            return decodeURIComponent(generatedSlug).toLowerCase() === decodeURIComponent(slug).toLowerCase();
          });
          console.log(post); // Log the post data
          setPost(post);
        } else {
          setError("No items found in the RSS feed.");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Error fetching post data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);


  if (loading) {
    return (
      <div className="loading-overlay">
        Loading...
        {/* <img src={loadingGif} alt="Loading..." /> */}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="archives post post1">
      <BreadCrumb className="shadow5 padding-top-30" title={post?.title?._ || 'No Title'} />
      <span className="space-30" />
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-8">
            <div className="row">
              <div className="col-6 align-self-center">
                <div className="page_category">
                  <h4>HEALTH</h4>
                </div>
              </div>
              <div className="col-6 text-right">
                <div className="page_comments">
                  <ul className="inline">
                    <li>
                      <FontAwesome name="comment" />
                      563
                    </li>
                    <li>
                      <FontAwesome name="fire" />
                      563
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-30" />
            <div className="single_post_heading">
              <h1>{post?.title?._ || 'No Title'}</h1>
              <div className="space-10" />
              <p>{post?.contentSnippet.slice(0, 100) || "No Content"}...</p>
            </div>
            <div className="space-40" />
            <img src={post?.image} alt="thumb" />
            <div className="space-20" />
            <div className="row">
              <div className="col-lg-6 align-self-center">
                <div className="author">
                  <div className="author_img">
                    <div className="author_img_wrap">
                      <img src={author2} alt="author2" />
                    </div>
                  </div>
                  <Link to="/">{post?.author}</Link>
                  <ul>
                    <li>
                      <Link to="/">March 26, 2020</Link>
                    </li>
                    <li>Updated 1:58 p.m. ET</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 align-self-center">
                <div className="author_social inline text-right">
                  <ul>
                    <li>
                      <Link to="/">
                        <FontAwesome name="instagram" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <FontAwesome name="facebook-f" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <FontAwesome name="youtube" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <FontAwesome name="instagram" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-20" />
            <div
              dangerouslySetInnerHTML={{
                __html: post?.content?._
                  ? post.content._.replace(/<img[^>]*>/g, "") // Remove <img> tags
                  : "No Content",
              }}
            ></div>
            <div className="space-40" />

          </div>
          <div className="col-md-6 col-lg-4">
            <WidgetTab />
            <WidgetTrendingNews />
            <NewsLetter />
          </div>
        </div>
        <PostOnePagination slug={slug} />
      </div>
      <OurBlogSection />
      <BlogComment />
    </div>
  );
}

export default Post1;
