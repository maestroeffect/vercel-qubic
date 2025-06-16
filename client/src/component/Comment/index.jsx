import PropTypes from "prop-types";
import author2 from "../../assets/img/comments.jpg";
import { Link } from "react-router-dom";

const Comment = ({ author, content, timestamp, dark }) => (
  <>
    <div className="single_comment">
      <div className="comment_img">
        <img src={author2} alt={author} />
      </div>
      <div className="row">
        <div className="col-sm-6">
          <Link to="/">{author}</Link>
        </div>
        <div className="col-sm-6 text-right">
          <small>{new Date(timestamp).toLocaleString()}</small>
        </div>
      </div>
      <div className="space-5" />
      <p>{content}</p>
    </div>
    <div className="space-15" />
    <div className={dark ? "border_white" : "border_black"} />
    <div className="space-15" />
  </>
);

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  dark: PropTypes.bool,
};

export default Comment;
