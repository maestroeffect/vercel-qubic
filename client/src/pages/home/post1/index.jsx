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
// import banner2 from "../../../assets/img/banner/banner-2.jpg";
// import big2 from "../../../assets/img/post-thumb-4.png";
import author2 from "../../../assets/img/comments-1.png";
// import quote from "../../../assets/img/icon/q.png";
// import quote_1 from "../../../assets/img/post-quote.jpg";
// import big1 from "../../../assets/img/post-thumb-3.jpg";
import OurBlogSection from "../../../component/OurBlogSection";
import BlogComment from "../../../component/BlogComment";
import blogData from "../../../data/blogData.json";
const Post1 = () => {
  const { slug } = useParams();
  const post = blogData.find((p) => p.slug === slug);
  if (!post) return <h2>Post not found</h2>;
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
                      <div className="author_img_wrap">
                        <img src={author2} alt="author2" />
                      </div>
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
                className="post-content"
                dangerouslySetInnerHTML={{ __html: post.contentFull }}
              />
              {/* <p>
                The cyber threat landscape is undergoing a seismic shift, and
                artificial intelligence (AI) is both the catalyst and the
                battleground. What was once a domain defined by firewalls and
                antivirus software is now a high-stakes arena where intelligent
                algorithms battle one another in real time.
                <br />
                <br />
                In this digital arms race, AI is the weapon of choice for
                defenders and attackers alike. For businesses, governments and
                society, understanding the dual role of AI in cybersecurity is
                no longer optional. It is imperative.
                <br />
              </p>

              <div className="space-40" />
              <h3>What’s the debate over masks?</h3>
              <div className="space-20" />
              <p>
                Both the US Centers for Disease Control (CDC) and the World
                Health Organization (WHO) are reassessing their guidance on face
                masks, as experts race to find ways to fight the highly
                contagious virus.
                <br />
                <br />
                Covid-19 is carried in airborne droplets from people coughing or
                sneezing, but there is some dispute over how far people should
                distance themselves from each other, and whether masks are
                useful when used by the public.
              </p> */}
              {/* <div className="space-40" /> */}
              {/* <div className="row">
                <div className="col-md-6">
                  <img src={smail1} alt="smail1" />
                </div>
                <div className="col-md-6">
                  <p>
                    The WHO advises that ordinary face masks are only effective
                    if combined with careful hand-washing and social-distancing,
                    and so far it does not recommend them generally for healthy
                    people.
                    <br />
                    <br />
                    However, More and more health experts now say there are
                    benefits. They argue that the public use of masks can
                    primarily help by preventing asymptomatic patients - people
                    who have been infected with Covid-19 but are not aware, and
                    not displaying any symptoms - from unknowingly spreading the
                    virus to others.
                  </p>
                </div>
              </div> */}
              {/* <div className="space-40" />
              <p>
                Masks may also help lower the risk of individuals catching the
                virus through the droplets from another person’s sneeze or a
                cough - and people can be taught how put masks on and take them
                off correctly, they argue.
                <br />
                <br />
                On Thursday New York mayor Bill de Blasio urged all New Yorkers
                to cover their faces when outside and near others, but not to
                use surgical masks, which are in short supply.
                <br />
                <br />
                “It could be a scarf. It could be something you create yourself
                at home. It could be a bandana,” he said. Governor Cuomo weighed
                in on Friday, saying “i think it’s fair to say that the masks
                couldn’t hurt unless they gave you a false sense of security.”
                <br />
                <br />
                Meanwhile, residents in Laredo, Texas will now face a $1,000
                (£816) fine if they fail to cover their noses and mouths while
                outside, after city officials issued an emergency ordinance to
                its approximately 250,000 residents this week.
              </p>
              <div className="space-40" />
              <h3>Which states are not in lockdown?</h3>
              <div className="space-20" />
              <p>
                Both the US Centers for Disease Control (CDC) and the World
                Health Organization (WHO) are reassessing their guidance on face
                masks, as experts race to find ways to fight the highly
                contagious virus.
                <br />
                <br />
                Covid-19 is carried in airborne droplets from people coughing or
                sneezing, but there is some dispute over how far people should
                distance themselves from each other, and whether masks are
                useful when used by the public.
              </p>
              <div className="space-40" />
              <img src={big1} alt="big1" />
              <p className="img_desc">
                <span>I just had a baby - now I’m going to the frontline.</span>
              </p>
              <div className="space-40" />
              <p>
                Masks may also help lower the risk of individuals catching the
                virus through the droplets from another person’s sneeze or a
                cough - and people can be taught how put masks on and take them
                off correctly, they argue.
                <br />
                <br />
                On Thursday New York mayor Bill de Blasio urged all New Yorkers
                to cover their faces when outside and near others, but not to
                use surgical masks, which are in short supply.
                <br />
                <br />
                Meanwhile, residents in Laredo, Texas will now face a $1,000
                (£816) fine if they fail to cover their noses and mouths while
                outside, after city officials issued an emergency ordinance to
                its approximately 250,000 residents this week.
              </p>
              <div className="space-40" />
              <div className="row">
                <div className="col-md-5">
                  <img src={quote_1} alt="quote" />
                </div>
                <div className="col-md-7">
                  <div className="qhote">
                    <img src={quote} alt="quote" />
                    <p>
                      I must explain to you how all this mistake idea denouncing
                      pleasure and praising pain was born and I will give you a
                      complete account of the system, and expound the actual
                      teachings of the great explorer of the truth, the
                      master-builder of human happiness. .
                    </p>
                    <div className="author">
                      <div className="author_img">
                        <div className="author_img_wrap">
                          <img src={author2} alt="author2" />
                        </div>
                      </div>
                      <Link to="/">Shuvas Chandra</Link>
                      <ul>
                        <li>Founder at Seative Digital</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-40" />
              <p>
                The next day I came back to my team and said, This is what I
                just heard, we have to get ready, he said. We knew that it
                wasn’t going to be long before we were going to have to deal
                with it.
                <br />
                <br />
                Mr. Hogan has also leaned on his wife, Yumi Hogan, a Korean
                immigrant, who was also at the governor’s convention, which
                included a dinner at the Korean ambassador’s home. As the first
                Korean first lady in American history, Ms. Hogan has become
                something of an icon in South Korea. I just grabbed my wife and
                said, Look, you speak Korean. You know the president. You know
                the first lady. You know the ambassador. Let’s talk to them in
                Korean, and tell them we need their help. Companies in South
                Korea said would tests.
              </p>
              <div className="space-40" />
              <img src={big2} alt="big2" />
              <div className="space-40" />
              <p>
                In global terms the US has the most Covid-19 cases - more than
                245,000. And on Thursday the US authorities said more than 1,000
                had died in the past 24 hours - the highest daily toll so far in
                the world.
                <br />
                <br />
                Hospitals and morgues in New York are struggling to cope with
                the pandemic, and New York Governor Andrew Cuomo has warned that
                New York risks running out of ventilators for patients in six
                days.
              </p> */}
              <div className="space-40" />
              <div className="tags">
                <ul className="inline pl-0">
                  <li className="tag_list">
                    <FontAwesome name="tag" /> tags
                  </li>
                  <li>
                    <Link to="/">CyberSecurity</Link>
                  </li>
                  <li>
                    <Link to="/">Threat Detection</Link>
                  </li>
                  <li>
                    <Link to="/">Corona</Link>
                  </li>
                </ul>
              </div>
              {/* <div className="space-40" />
              <PostOnePagination /> */}
            </div>
            <div className="col-md-6 col-lg-4">
              <WidgetTab />
              {/* <FollowUs title="Follow Us" /> */}
              <WidgetTrendingNews />
              <div className="banner2 mb30">
                <Link to="/">Advertisement</Link>
              </div>
              <MostShareWidget title="Most Share" />
              <NewsLetter />
            </div>
          </div>
        </div>
      </div>
      <div className="space-30" />
      <OurBlogSection />
      <div className="space-60" />
      <BlogComment />
      <div className="space-100" />
      <BannerSection />
    </>
  );
};

export default Post1;
