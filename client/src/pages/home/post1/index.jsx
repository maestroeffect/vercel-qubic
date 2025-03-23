import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../component/BreadCrumb";
import FontAwesome from "../../../component/uiStyle/FontAwesome";
import { Link, useParams } from "react-router-dom";
import WidgetTab from "../../../component/WidgetTab";
import WidgetTrendingNews from "../../../component/WidgetTrendingNews";
import PostOnePagination from "../../../component/PostOnePagination";
import QubicwebFeed from "../../../component/RssParser";

// images
import author2 from "../../../assets/img/comments-1.png";
import OurBlogSection from "../../../component/OurBlogSection";
import BlogComment from "../../../component/BlogComment";


function Post1() {
  const { slug } = useParams(); // Get slug from URL params
  const [post, setPost] = useState(null);
  const { articles, loading, error } = useSelector((state) => state.feed);
  const generateSlug = (title) => {
    if (typeof title !== "string") return "AHHHH"; // Ensure title is a string
    return title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  };
  useEffect(() => {
    if (articles.length > 0) {
      const matchedPost = articles.find((item) => {
        const generatedSlug = generateSlug(item.title);
        return decodeURIComponent(generatedSlug).toLowerCase() === decodeURIComponent(slug).toLowerCase();
      });
      setPost(matchedPost || null);
    }
  }, [articles, slug]);

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

  if (!post) {
    return <div>No post found for the given slug.</div>;
  }

  return (
    <div className="archives post post1">
      <BreadCrumb className="shadow5 padding-top-30" title={post.title || 'No Title'} />
      <span className="space-30" />
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-8">
            <div className="row">
              <div className="col-6 align-self-center">
                <div className="page_category">
                  <h4>{post.category}</h4>
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
              <h1>{post.title || 'No Title'}</h1>
              <div className="space-10" />
              <p>{post.contentSnippet.slice(0, 100) || "No Content"}...</p>
            </div>
            <div className="space-40" />
            <img src={post.image} alt="thumb" />
            <div className="space-20" />
            <div className="row">
              <div className="col-lg-6 align-self-center">
                <div className="author">
                  <div className="author_img">
                    <div className="author_img_wrap">
                      <img src={author2} alt="author2" />
                    </div>
                  </div>
                  <Link to="/">{post.author}</Link>
                  <ul>
                    <li>
                      <Link to="/">{post.publishedDate}</Link>
                    </li>
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
