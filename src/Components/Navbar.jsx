import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext"; // Import the AuthContext

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext); // Access user state from context
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from context
    setUser(null);
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 fixed top-0 w-full shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <div className="flex space-x-4">
          {!user ? (
            <>
              <Link to="/login">
                <button className="btn">Login</button>
              </Link>
              <Link to="/signUp">
                <button className="btn">SignUp</button>
              </Link>
            </>
          ) : (
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




