import ProtoTypes from "prop-types";
import FontAwesome from "../uiStyle/FontAwesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchModal = ({ setSearchShow }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${search}`);
      setSearchShow(false); // Close modal after search
    }
  };

  return (
    <div className="searching active">
      <div className="container">
        <div className="row">
          <div className="col-8 text-center m-auto">
            <div className="v1search_form">
              <form onSubmit={submitHandler}>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  placeholder="Search Here..."
                />
                <button type="submit" className="cbtn1">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="close_btn" onClick={() => setSearchShow(false)}>
        <FontAwesome name="times" />
      </div>
    </div>
  );
};

SearchModal.propTypes = {
  setSearchShow: ProtoTypes.func.isRequired,
};

export default SearchModal;
