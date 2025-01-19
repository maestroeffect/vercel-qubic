import { useState, useEffect } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

import BreadCrumb from "../../../component/BreadCrumb";

const Cybershield = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const WORDPRESS_API_URL = "https://api.qubicweb.com/wp-json/wp/v2/media";

    // Fetch images from WordPress REST API
    fetch(WORDPRESS_API_URL)
      .then((response) => response.json())
      .then((data) => {
        // Filter and map the response to an array of image URLs
        const imageUrls = data
          .filter((item) => item.media_type === "image") // Ensure it's an image
          .map((item) => item.source_url); // Get the image URL
        console.log(imageUrls); // Log the image URLs
        setImages(imageUrls);
      })
      .catch((error) => console.error("Error fetching media:", error));
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      // Force re-initialization of gallery after images are loaded
      window.dispatchEvent(new Event("resize"));
    }
  }, [images]);

  return (
    <>
      <BreadCrumb title="Cybershield" />
      <div className="archives padding-top-10">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="text-center mb-2">Cybershield</h1>
              <p className="text-center mb-4">View some of our resources</p>
              <Gallery>
                <div className="row">
                  {images.map((src, index) => (
                    <div
                      className="col-sm-6 col-md-4 col-lg-4 mb-4 image-container"
                      key={index}
                    >
                      <Item
                        original={src}
                        thumbnail={src} // You can adjust this if needed
                      >
                        {({ ref, open }) => (
                          <img
                            ref={ref}
                            onClick={open}
                            src={src}
                            alt={`Gallery Image ${index + 1}`}
                            className="gallery-image img-fluid"
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              height: "auto",
                            }}
                          />
                        )}
                      </Item>
                    </div>
                  ))}
                </div>
              </Gallery>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cybershield;
