import { Link } from "react-router-dom";
import "./NotFound.css";
const NotFound = () => {
  return (
    <>
      <div className="not-found">
        <div className="not-found-content">
          <h1>404 - Page Not Found</h1>
          <p>The page you were looking for doesn't exist!</p>
          <Link to={"/"} className="back-to-home rounded-5 fs-4">
            Back to Home
            <i className="bi bi-arrow-right-circle ps-3" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
