import { useState, useEffect } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import loadingGif from "../../../assets/img/loading.gif"; // Path to your loading GIF

const Cybershield = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const IMAGES_PER_PAGE = 6;

  useEffect(() => {
    const WORDPRESS_API_URL = "https://api.qubicweb.com/wp-json/wp/v2/media";
    const PER_PAGE = 50;

    const fetchAllImages = async () => {
      try {
        let allImages = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
          const response = await fetch(
            `${WORDPRESS_API_URL}?page=${page}&per_page=${PER_PAGE}`
          );

          if (!response.ok)
            throw new Error(`Failed to fetch images: ${response.status}`);

          const data = await response.json();

          console.log("Fetched Data:", data);

          // Read total pages from headers
          const totalPagesHeader = response.headers.get("X-WP-TotalPages");
          const totalPages = totalPagesHeader
            ? parseInt(totalPagesHeader, 10)
            : 1;
          setTotalPages(totalPages);

          if (data.length > 0) {
            allImages = [...allImages, ...data];
            page++;

            // Stop fetching if we reach the last page
            if (page > totalPages) {
              hasMore = false;
            }
          } else {
            hasMore = false;
          }
        }

        const filteredImages = allImages.filter(
          (item) =>
            item.mime_type?.startsWith("image/") &&
            item.source_url &&
            !item.source_url.includes("rss")
        );

        const imageUrls = filteredImages.map((item) => ({
          src: item.source_url,
          width: item.media_details?.width || 1920,
          height: item.media_details?.height || 1080,
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

  const paginatedImages = images.slice(
    (currentPage - 1) * IMAGES_PER_PAGE,
    currentPage * IMAGES_PER_PAGE
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setTransitioning(true);
    setCurrentPage(pageNumber);
    setTimeout(() => {
      setTransitioning(false);
    }, 300);
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
                className={`row gallery-content ${transitioning ? "fade-out" : "fade-in"}`}
              >
                {paginatedImages.map((image, index) => (
                  <div
                    className="col-sm-6 col-md-4 col-lg-4 mb-4 image-container"
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
                      download={`image-${index + 1}.jpg`}
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
            <div className="pagination flex justify-content-center text-center mt-4 mb-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className={`btn pagination-btn mx-1 ${currentPage === 1 ? "disabled" : ""}`}
                disabled={currentPage === 1}
              >
                <i className="bi bi-chevron-left"></i> Prev
              </button>
              {[...Array(totalPages).keys()].map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page + 1)}
                  className={`btn pagination-btn mx-1 ${currentPage === page + 1 ? "active" : ""}`}
                >
                  {page + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className={`btn pagination-btn mx-1 ${currentPage === totalPages ? "disabled" : ""}`}
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
