import { useState, useEffect, useMemo } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import loadingGif from "../../../assets/img/loading.gif"; // Path to your loading GIF

const Cybershield = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const IMAGES_PER_PAGE = 54;

  useEffect(() => {
    const WORDPRESS_API_URL = "https://api.qubicweb.com/wp-json/wp/v2/media";
    const PER_PAGE = 80;

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
          const totalItems = response.headers.get("X-WP-Total");
          if (totalItems) {
            setTotalPages(
              Math.ceil(parseInt(totalItems, 10) / IMAGES_PER_PAGE)
            );
          }

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

  // Memoized images for the current page
  const paginatedImages = useMemo(() => {
    return images.slice(
      (currentPage - 1) * IMAGES_PER_PAGE,
      currentPage * IMAGES_PER_PAGE
    );
  }, [images, currentPage]);

  // Preload images of the next page
  useEffect(() => {
    const preloadImages = (imageUrls) => {
      imageUrls.forEach((image) => {
        const img = new Image();
        img.src = image.src;
      });
    };

    // Preload images for the next page
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      const nextPageImages = images.slice(
        nextPage * IMAGES_PER_PAGE - IMAGES_PER_PAGE,
        nextPage * IMAGES_PER_PAGE
      );
      preloadImages(nextPageImages);
    }
  }, [currentPage, images, totalPages]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setTransitioning(false);
    }, 100);
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
            <h1 className="text-center mt-4 mb-4">Qybershield</h1>
            <p className="text-center mb-4 px-3">
              <b>Qybershield</b>- Your go-to hub for free cybersecurity
              awareness content. A curated repository of security tips,
              infographics, checklists and educational materials designed to
              help individuals and businesses stay informed, stay safe and stay
              ahead of cyber threats.
            </p>
            <Gallery>
              <div
                className={`row gallery-content ${transitioning ? "fade-out" : "fade-in"}`}
              >
                {paginatedImages.map((image, index) => (
                  <div
                    className="col-6 col-md-2 col-lg-2 mb-4 image-container"
                    key={index}
                  >
                    <Item
                      original={image.src}
                      thumbnail={image.src}
                      width={image.width}
                      height={image.height}
                      caption={`Gallery Image ${index + 1}`}
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
