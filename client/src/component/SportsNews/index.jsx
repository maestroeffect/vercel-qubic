import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";
import SportsCarousel from "../SportsCarousel";
import FontAwesome from "../uiStyle/FontAwesome";
import { useSelector } from "react-redux";
import WithLoadingAndError from "../LoadErrorHandle";

const SportsNews = ({ dark }) => {
  const { articles } = useSelector((state) => state.feed);
  const includedCategories = [
    "TechCabal",
    "Project Zero",
    "Techradar",
    "Troy Hunt",
    "Technext",
    "TechCrunch",
  ];
  const techArticles = articles.filter((article) =>
    includedCategories.includes(article.category)
  );
  return (
    <WithLoadingAndError>
      <div className="row">
        <div className="col-12">
          <div className="sports">
            <div className="row">
              <div className="col-12">
                <div className="heading">
                  <h2 className="widget-title">Technology News</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                {
                  techArticles.slice(0, 1).map((item, i) => {
                    return (
                      <div key={i} className="single_post post_type3 mb30">
                        <div className="post_img">
                          <Link to="/">
                            <img src={item.image} className="fixed-dimensions" alt="sportsbig1" />
                          </Link>{" "}
                          <span className="tranding">
                            <FontAwesome name="bolt" />
                          </span>
                        </div>
                        <div className="single_post_text">
                          <div className="meta3">
                            <Link to="/">{item.category}</Link>
                            <Link to="/">{item.publishedDate}</Link>
                          </div>
                          <h4>
                            <Link to={item.link} onClick={(e) => {
                              e.preventDefault();
                              window.open(item.link, "_blank", "noopener,noreferrer");
                            }}>
                              {item.title.slice(0, 100)}...
                            </Link>
                          </h4>
                          <div className="space-10" />
                          <p className="post-p">
                            {item.contentSnippet.slice(0, 100)}...
                          </p>
                          <div className="space-20" />
                          <Link to={item.link} onClick={(e) => {
                            e.preventDefault();
                            window.open(item.link, "_blank", "noopener,noreferrer");
                          }} className="readmore">
                            Read More
                          </Link>
                        </div>
                      </div>
                    )

                  })
                }

              </div>
              <div className="col-md-6">
                <div className="sports_carousel nav_style1">
                  <SportsCarousel dark={dark ? dark : false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WithLoadingAndError>
  );
};

export default SportsNews;

SportsNews.propTypes = {
  dark: ProtoTypes.bool,
};
