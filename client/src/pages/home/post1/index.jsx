// import BreadCrumb from "../../../component/BreadCrumb";
import FontAwesome from "../../../component/uiStyle/FontAwesome";
import { Link, useParams } from "react-router-dom";
import WidgetTab from "../../../component/WidgetTab";
import WidgetTrendingNews from "../../../component/WidgetTrendingNews";
import NewsLetter from "../../../component/NewsLetter";
import MostShareWidget from "../../../component/MostShareWidget";
// import FollowUs from "../../../component/FollowUs";
import BannerSection from "../../../component/BannerSection";
// import PostOnePagination from "../../../component/PostOnePagination";
// images
import OurBlogSection from "../../../component/OurBlogSection";
// import BlogComment from "../../../component/BlogComment";
import blogData from "../../../data/blogData.json";
import BlogComment from "../../../component/BlogComment";
import { useEffect, useState } from "react";
import axios from "axios";

const Post1 = () => {
  const [commentCount, setCommentCount] = useState(0);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const { slug } = useParams();
  const post = blogData.find((p) => p.slug === slug);
  if (!post) return <h2>Post not found</h2>;

  useEffect(() => {
    if (!slug) return;

    // Fetch comments
    axios
      .get(`https://qubicweb.com/apis/comment.php?slug=${slug}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCommentCount(res.data.length);
        }
      });

    // Fetch likes
    axios
      .get(`https://qubicweb.com/apis/likes.php?slug=${slug}`)
      .then((res) => {
        if (res.data?.likes !== undefined) {
          setLikes(res.data.likes);
        }
      });
  }, [slug]);

  const handleLikeToggle = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikes((prev) => (newLiked ? prev + 1 : prev - 1));

    axios
      .post(`https://qubicweb.com/apis/likes.php`, {
        slug,
        action: newLiked ? "like" : "unlike",
      })
      .catch(() => {
        // Revert UI on failure
        setLiked(!newLiked);
        setLikes((prev) => (newLiked ? prev - 1 : prev + 1));
      });
  };

  return (
    <>
      <div className="archives post post1">
        <div className="space-60" />
        {/* <BreadCrumb
          className="shadow5 padding-top-30"
          title="Archive / post 1"
        /> */}
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
                        {commentCount}
                      </li>
                      <li
                        onClick={handleLikeToggle}
                        style={{ cursor: "pointer" }}
                      >
                        <FontAwesome
                          name="heart"
                          style={{ color: liked ? "red" : "gray" }}
                        />
                        {likes}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="space-30" />
              <div className="single_post_heading">
                <h1>{post.title}</h1>
                <div className="space-10" />
              </div>
              <div className="space-10" />
              <img src={`/assets/img/blog/1/${post.image}`} alt="thumb" />
              <div className="space-20" />
              <div className="row">
                <div className="col-lg-6 align-self-center">
                  <div className="author">
                    <div className="author_img">
                      <img
                        src={`/assets/img/blog/1/${post.author_img}`}
                        alt="author2"
                      />
                    </div>
                    <Link to="/">{post.author}</Link>
                    <ul>
                      <li>
                        <Link to="/">{post.publishedDate}</Link>
                      </li>
                      {/* <li>Updated 1:58 p.m. ET</li> */}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6 align-self-center">
                  <div className="author_social inline text-right">
                    <ul>
                      <li>
                        <a
                          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FontAwesome name="twitter" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FontAwesome name="facebook-f" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FontAwesome name="linkedin" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " " + window.location.href)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FontAwesome name="whatsapp" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="space-20" />
              <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: post.contentFull }}
              />

              <div className="space-40" />
              <div className="tags">
                <ul className="inline pl-0">
                  <li className="tag_list">
                    <FontAwesome name="tag" /> tags
                  </li>
                  <li>
                    <Link to="#">CyberSecurity</Link>
                  </li>
                  <li>
                    <Link to="#">Threat Detection</Link>
                  </li>
                  <li>
                    <Link to="#">Corona</Link>
                  </li>
                </ul>
              </div>

              <div className="post-author-box">
                <div className="author-img-wrapper">
                  <img
                    src={`/assets/img/blog/1/${post.author_img}`}
                    alt={post.author}
                    className="author-avatar"
                  />
                </div>
                <div className="author-details">
                  <h5>
                    <Link to="#" className="author-name">
                      {post.author}
                    </Link>
                    {/* <span className="author-role">News Writer</span> */}
                  </h5>

                  <div className="author-socials">
                    <Link to="#">
                      <FontAwesome name="twitter" />
                    </Link>
                    <Link to="#">
                      <FontAwesome name="envelope" />
                    </Link>
                    {/* Add more if needed */}
                  </div>

                  <p className="author-bio">
                    {post.author_bio ||
                      "This author writes about technology and loves exploring new gadgets, devices, and trends in the digital world."}
                  </p>
                </div>
              </div>

              {/* <div className="space-40" />
              <PostOnePagination /> */}
            </div>
            <div className="col-md-6 col-lg-4">
              <WidgetTab />
              {/* <FollowUs title="Follow Us" /> */}
              <WidgetTrendingNews />
              <div className="banner2 mb30">
                <Link to="#">Advertisement</Link>
              </div>
              <MostShareWidget title="Most Share" />
              <NewsLetter />
            </div>
          </div>
        </div>
      </div>
      <div className="space-30" />
      <OurBlogSection />
      {/* <div className="space-60" /> */}
      <BlogComment />
      <div className="space-10" />
      <BannerSection />
    </>
  );
};

export default Post1;
