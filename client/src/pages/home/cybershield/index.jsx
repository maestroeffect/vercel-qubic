import { useState, useEffect } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import loadingGif from "../../../assets/img/loading.gif"; // Path to your loading GIF

const Cybershield = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const WORDPRESS_API_URL = "https://api.qubicweb.com/wp-json/wp/v2/media";
    const PER_PAGE = 100; // Adjust this to the max allowed by the API

    const fetchAllImages = async () => {
      try {
        let page = 1;
        let allImages = [];
        let hasMore = true;

        while (hasMore) {
          const response = await fetch(
            `${WORDPRESS_API_URL}?page=${page}&per_page=${PER_PAGE}`
          );
          const data = await response.json();

          if (data.length > 0) {
            allImages = [...allImages, ...data];
            page++;
          } else {
            hasMore = false;
          }
        }

        // Filter and map the response to an array of image URLs
        const imageUrls = allImages
          .filter((item) => item.media_type === "image") // Ensure it's an image
          .map((item) => ({
            src: item.source_url,
            width: item.media_details?.width || 1920, // Fallback width
            height: item.media_details?.height || 1080, // Fallback height
          }));

        console.log("Processed Images Array:", imageUrls); // Log the processed images
        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching media:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      // Log images whenever they are updated
      console.log("Images State Updated:", images);
      // Force re-initialization of gallery after images are loaded
      window.dispatchEvent(new Event("resize"));
    }
  }, [images]);

  if (loading) {
    return (
      <div className="loading-overlay">
        <img src={loadingGif} alt="Loading..." />
        {/* <p>Loading...</p> */}
      </div>
    );
  }

  return (
    <div className="archives">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mt-4 mb-4">Cybershield</h1>
            <Gallery>
              <div className="row">
                {images.map((image, index) => (
                  <div
                    className={`col-sm-6 col-md-4 col-lg-4 mb-4 image-container`}
                    key={index}
                  >
                    <Item
                      original={image.src}
                      thumbnail={image.src}
                      width={image.width}
                      height={image.height}
                    >
                      {({ ref }) => (
                        <img
                          ref={ref}
                          // onClick={open}
                          src={image.src}
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
                    <a
                      href={image.src}
                      download={`image-${index + 1}.jpg`} // Default filename for downloads
                      className="downloadIcon"
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/724/724933.png"
                        alt="Download"
                      />
                    </a>
                  </div>
                ))}
              </div>
            </Gallery>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cybershield;
