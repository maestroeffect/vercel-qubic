import { useState, useEffect } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import loadingGif from "../../../assets/img/loading.gif"; // Path to your loading GIF
// import "./Cybershield.css"; // Import custom styles for animations

const Cybershield = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [transitioning, setTransitioning] = useState(false); // Track animation state
  const IMAGES_PER_PAGE = 6; // Number of images per page

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

        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching media:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllImages();
  }, []);

  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);

  // Paginate images based on current page
  const paginatedImages = images.slice(
    (currentPage - 1) * IMAGES_PER_PAGE,
    currentPage * IMAGES_PER_PAGE
  );

  const handlePageChange = (pageNumber) => {
    setTransitioning(true); // Start transition
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setTransitioning(false); // End transition
    }, 300); // Match this duration to the CSS animation time
  };

  if (loading) {
    return (
      <div className="loading-overlay">
        <img src={loadingGif} alt="Loading..." />
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
              <div
                className={`row gallery-content ${
                  transitioning ? "fade-out" : "fade-in"
                }`}
              >
                {paginatedImages.map((image, index) => (
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

            {/* Pagination Controls */}
            <div className="pagination flex justify-content-center text-center mt-4 mb-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className={`btn pagination-btn mx-1 ${
                  currentPage === 1 ? "disabled" : ""
                }`}
                disabled={currentPage === 1}
              >
                <i className="bi bi-chevron-left"></i> Prev
              </button>
              {[...Array(totalPages).keys()].map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page + 1)}
                  className={`btn pagination-btn mx-1 ${
                    currentPage === page + 1 ? "active" : ""
                  }`}
                >
                  {page + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className={`btn pagination-btn mx-1 ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
                disabled={currentPage === totalPages}
              >
                Next <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cybershield;
