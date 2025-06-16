import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import Comment from "../Comment";

const API_URL = "https://qubicweb.com/apis/comment.php"; // Change this

const BlogComment = ({ theme = 1, dark = false }) => {
  const location = useLocation();
  const slug = location.pathname; // Use blog page path as unique slug

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [comments, setComments] = useState([]);
  const validator = useRef(new SimpleReactValidator());

  // Fetch comments from the server
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `${API_URL}?slug=${encodeURIComponent(slug)}`
        );
        const data = await response.json();

        if (data.message === "No comments available") {
          setComments([]);
        } else {
          setComments(data);
        }
      } catch (error) {
        toast.error("Failed to load comments");
      }
    };

    fetchComments();
  }, [slug]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validator.current.allValid()) {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, slug }),
        });

        const result = await response.json();

        if (response.ok) {
          // Refresh comments
          setComments([
            {
              name: formData.name,
              content: formData.message,
              timestamp: new Date().toISOString(),
            },
            ...comments,
          ]);
          toast.success("Comment posted!");
          setFormData({ name: "", email: "", message: "" });
          validator.current.hideMessages();
        } else {
          toast.error(result.error || "Failed to post comment");
        }
      } catch (error) {
        toast.error("Server error");
      }
    } else {
      toast.error("Please fill the required fields correctly.");
      validator.current.showMessages();
    }
  };

  return (
    <div className="comment_form">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-10 mt-5">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <input
                    value={formData.name}
                    name="name"
                    onChange={handleChange}
                    type="text"
                    placeholder="Full name"
                  />
                  {validator.current.message(
                    "Full Name",
                    formData.name,
                    "required"
                  )}
                </div>
                <div className="col-md-6">
                  <input
                    value={formData.email}
                    name="email"
                    onChange={handleChange}
                    type="text"
                    placeholder="Email address"
                  />
                  {validator.current.message(
                    "Email",
                    formData.email,
                    "required|email"
                  )}
                </div>
                <div className="col-12">
                  <textarea
                    value={formData.message}
                    onChange={handleChange}
                    name="message"
                    cols="30"
                    rows="5"
                    placeholder="Tell us about your opinion…"
                  />
                  {validator.current.message(
                    "Message",
                    formData.message,
                    "required"
                  )}
                </div>
                <div className="col-12">
                  <button
                    className={theme === 3 ? "cbtn4" : "cbtn2"}
                    type="submit"
                  >
                    POST OPINION
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="space-60" />
        <div className="comment_list">
          <div className="row">
            <div className="col-12 col-lg-10">
              <h3>Comments</h3>
              {comments.length === 0 ? (
                <p>No comments yet.</p>
              ) : (
                comments.map((comment, idx) => (
                  <Comment
                    key={idx}
                    author={comment.name}
                    content={comment.content}
                    timestamp={comment.timestamp}
                    theme={theme}
                    dark={dark}
                  />
                ))
              )}
              {/* <div className="space-40" />
              <Link to="#" className={theme === 3 ? "cbtn4" : "cbtn2"}>
                Load More
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BlogComment.propTypes = {
  theme: PropTypes.number,
  dark: PropTypes.bool,
};

export default BlogComment;
