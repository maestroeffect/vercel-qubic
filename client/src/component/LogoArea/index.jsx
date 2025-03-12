import ProtoTypes from "prop-types";
import { Link } from "react-router-dom";
import logo2 from "../../assets/img/qubicweb01.png";
import logoDark from "../../assets/img/footer_logo.png";
import { useTheme } from "../../context/ThemeContext"; // Import the context;

const LogoArea = ({ className }) => {
  const { darkMode } = useTheme();
  return (
    <>
      <div className={`logo_area ${className ? className : ""}`}>
        <div className="container">
          <div className="row">
            <div className="align-self-center">
              <div className="logo">
                <Link to="/">
                  <img src={darkMode ? logoDark : logo2} alt="logo" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoArea;

LogoArea.propTypes = {
  className: ProtoTypes.string,
  dark: ProtoTypes.bool,
};
