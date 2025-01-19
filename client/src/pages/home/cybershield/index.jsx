import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

import BreadCrumb from "../../../component/BreadCrumb";

const images = [
  "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
];

const Cybershield = () => {
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
                        thumbnail={src}
                        width="1024"
                        height="768"
                      >
                        {({ ref, open }) => (
                          <img
                            ref={ref}
                            onClick={open}
                            src={src}
                            alt={`Gallery Image ${index + 1}`}
                            className="gallery-image img-fluid"
                            style={{ cursor: "pointer" }}
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
