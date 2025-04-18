import React from "react";
import FontAwesome from "../../../component/uiStyle/FontAwesome";
import { Link } from "react-router-dom";
import BannerSection from "../../../component/BannerSection";
import PostOnePagination from "../../../component/PostOnePagination";
import OurBlogSection from "../../../component/OurBlogSection";
import BlogComment from "../../../component/BlogComment";

// images
import author2 from "../../../assets/img/comments-1.png";
import smail1 from "../../../assets/img/post-thumb-2.png";
import banner1 from "../../../assets/img/banner/banner-1.png";

function AudioPost2() {
  return (
    <>
      <div className="archives post post1">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-10 col-lg-8 m-auto">
              <div className="bridcrumb">
                <Link to="/">Home</Link> / Archive / post 1
              </div>
            </div>
          </div>
          <span className="space-30" />
          <div className="row">
            <div className="col-12 col-md-10 col-lg-8 m-auto">
              <div className="audio_post">
                <iframe
                  title="audio"
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/509113785&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                />
              </div>
              <div className="space-20" />
              <div className="single_post_heading">
                <h1>
                  Japan’s virus success has puzzled the world. Is its luck
                  running out?
                </h1>
              </div>
              {/*ok*/}
              <div className="space-20" />
              <div className="row">
                <div className="col-lg-6 align-self-center">
                  <div className="author">
                    <div className="author_img">
                      <div className="author_img_wrap">
                        <img src={author2} alt="author2" />
                      </div>
                    </div>
                    <Link to="/">Shuvas Chandra</Link>
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
                          <FontAwesome name="youtube-play" />
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
              <div className="space-30" />
              <div className="row">
                <div className="col-12">
                  <div className="page_comments">
                    <ul className="inline">
                      <li className="page_category">HEALTH</li>
                      <li>
                        <FontAwesome name="comment" />
                        563
                      </li>
                      <li>
                        <FontAwesome name="fire" />
                        536
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="space-20" />
              <p>
                Entilators will be taken from certain New York hospitals and
                redistributed to the worst-hit parts of the state under an order
                to be signed by Governor Andrew Cuomo.
                <br />
                <br />
                New York saw its highest single-day increase in deaths, up by
                562 to 2,935 - nearly half of all virus-related US deaths
                recorded yesterday. The White House may advise those in virus
                hotspots to wear face coverings in public to help stem the
                spread.\
                <br />
                <br />
                The US now has 245,658 Covid-19 cases.
                <br />
                <br />A shortage of several hundred ventilators in New York
                City, the epicentre of the outbreak in the US, prompted Mr Cuomo
                to say that he will order the machines be taken from various
                parts of the state and give them to harder-hit areas.
                <br />
                <br />
                Amid a deepening crisis, top health official{" "}
                <span className="bold"> Dr Anthony Fauci</span> has said he
                believes all states should issue stay-at-home orders.
                <br />
                <br />
                “I don’t understand why that’s not happening,” Dr Fauci told CNN
                on Thursday. “If you look at what’s going on in this country, I
                just don’t understand why we’re not do ingthat.”
                <br />
                <br />
                “You’ve got to put your foot on the accelerator to bring that
                number down,” he added, referring to infection and death rates.
              </p>
              <div className="space-40" />
              <h3>What’s the debate over masks?</h3>
              <div className="space-10" />
              <p>
                A shortage of several hundred ventilators in New York City, the
                epicentre of the outbreak in the US, prompted Mr Cuomo to say
                that he will order the machines be taken from various parts of
                the state and give them to harder-hit areas.in New York City,
                the epicentre of the outbreak in the
                <br />
                <br />
                US, prompted Mr Cuomo to say that he will order the machines be
                taken from various parts of the state and give them to
                harder-hit areas.in New York City, the epicentre of the outbreak
                in
                <br />
                <br />
                the US, prompted Mr Cuomo to say that he will order the machines
                be taken from various parts of the state and give them to
                harder-hit areas.in New York City, the epicentre of the outbreak
                in the US, prompted Mr Cuomo to say that he will order the
                machines be taken from various parts of the state and give them
                to harder-hit areas.
              </p>

              <div className="space-40" />
              <p>
                The comments from Dr Fauci, who heads the National Institute of
                Allergy and Infectious Diseases, appeared to contradict those of
                President Trump, who has consistently dismissed the notion of a
                nationwide lockdown.
                <br />
                <br />
                “It’s awfully tough to say, ‘close it down.’ We have to have a
                little bit of flexibility,” Mr Trump said on Wednesday.
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
              </p>
              <div className="space-40" />
              <div className="row">
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
              </div>
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
              <div className="audio_post">
                <iframe
                  title="audio"
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/509113785&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                />
              </div>

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
                <div className="col-12">
                  <div className="qhote quote_type2 fourth_bg">
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
              <div className="banner1">
                <Link to="/">
                  <img src={banner1} alt="banner1" />
                </Link>
              </div>
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
              </p>
              <div className="space-40" />
              <div className="tags">
                <ul className="inline">
                  <li className="tag_list">
                    <FontAwesome name="tag" /> tags
                  </li>
                  <li>
                    <Link to="/">Health</Link>
                  </li>
                  <li>
                    <Link to="/">World</Link>
                  </li>
                  <li>
                    <Link to="/">Corona</Link>
                  </li>
                </ul>
              </div>
              <div className="space-40" />
              <div className="border_black" />
              <div className="space-40" />
              <PostOnePagination className="next_prv_single padding20 theme3_bg border-radious5" />
            </div>
          </div>
        </div>
      </div>
      <div className="space-60" />
      <OurBlogSection />
      <div className="space-60" />
      <BlogComment />
      <div className="space-100" />
      <BannerSection />
    </>
  );
}

export default AudioPost2;
