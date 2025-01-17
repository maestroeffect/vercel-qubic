import { useState } from "react";

import Lightbox from "react-image-lightbox"; // Install this package using 'npm install react-image-lightbox'
import "react-image-lightbox/style.css";
import BreadCrumb from "../../../component/BreadCrumb";

const images = [
  "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",

  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
];

const Cybershield = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <>
      <BreadCrumb title="Cybershield" />
      <div className="archives padding-top-10">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="text-center mb-2">Cybershield</h1>
              <p className="text-center mb-5">View some of our resources</p>
              <div className="row">
                {images.map((src, index) => (
                  <div className="col-sm-6 col-md-4 col-lg-4 mb-5" key={index}>
                    <div
                      className="image-container"
                      onClick={() => {
                        setPhotoIndex(index);
                        setIsOpen(true);
                      }}
                    >
                      <img
                        src={src}
                        alt={`Gallery Image ${index + 1}`}
                        className="gallery-image"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {isOpen && (
                <Lightbox
                  mainSrc={images[photoIndex]}
                  nextSrc={images[(photoIndex + 1) % images.length]}
                  prevSrc={
                    images[(photoIndex + images.length - 1) % images.length]
                  }
                  onCloseRequest={() => setIsOpen(false)}
                  onMovePrevRequest={() =>
                    setPhotoIndex(
                      (photoIndex + images.length - 1) % images.length
                    )
                  }
                  onMoveNextRequest={() =>
                    setPhotoIndex((photoIndex + 1) % images.length)
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cybershield;
