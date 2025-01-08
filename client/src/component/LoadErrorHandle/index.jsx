import PropTypes from "prop-types";
// import { useSelector } from "react-redux";
import loadingGif from "../../assets/img/loading.gif"; // Path to your loading GIF


// A higher-level component to handle loading and error states
const WithLoadingAndError = ({ isLoading, children }) => {
    if (isLoading) {
        return (
            <div className="loading-overlay">
                <img src={loadingGif} alt="Loading..." />
            </div> // Show loading state
        );
    }


    // if (error) {
    //     return <div>Error: {error}</div>; // Show error state
    // }

    return children;
};
// Add PropTypes validation for 'children'
WithLoadingAndError.propTypes = {
    isLoading: PropTypes.bool.isRequired, // 'isLoading' should be a boolean and is required
    children: PropTypes.node.isRequired,  // 'children' should be a valid React node
};


export default WithLoadingAndError;
