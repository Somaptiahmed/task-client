// import { useState } from "react";
// import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// import { Link, useNavigate } from "react-router-dom";
// import { auth } from "../firebase/firebase.init";



// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError("");
//         try {
//             await signInWithEmailAndPassword(auth, email, password);
//             alert("Login successful");
//             navigate("/");
//         } catch (err) {
//             setError(err.message);
//         }
//     };
    
//     const handleGoogleLogin = async () => {
//         const provider = new GoogleAuthProvider();
//         try {
//             await signInWithPopup(auth, provider);
//             alert("Google login successful");
//             navigate("/");
//         } catch (err) {
//             setError(err.message);
//         }
//     };
    
//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen">
//             <h2 className="text-2xl font-bold mb-4">Login</h2>
//             {error && <p className="text-red-500">{error}</p>}
//             <form onSubmit={handleLogin} className="flex flex-col gap-3">
//                 <input 
//                     type="email" 
//                     placeholder="Email" 
//                     value={email} 
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="border p-2 rounded w-80"
//                     required
//                 />
//                 <input 
//                     type="password" 
//                     placeholder="Password" 
//                     value={password} 
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="border p-2 rounded w-80"
//                     required
//                 />

//                 <button type="submit" className="bg-blue-500 text-white py-2 rounded">Login</button>
//                 <p>Don`t have an Account? <Link to="/signUp"> SignUp</Link></p>
//             </form>
//             <button 
//                 onClick={handleGoogleLogin} 
//                 className="bg-red-500 text-white py-2 rounded mt-3 w-80">
//                 Login with Google
//             </button>
//         </div>
//     );
// };

// export default Login;


import { useState, useContext } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.init";
import { AuthContext } from "../Context/AuthContext"; // Import AuthContext

const Login = () => {
  const { setUser } = useContext(AuthContext); // Access setUser to update the user state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUser(auth.currentUser); // Update the user context
      alert("Login successful");
      navigate("/"); // Redirect after successful login
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user); // Update the user context with Google login user
      alert("Google login successful");
      navigate("/"); // Redirect after successful Google login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-80"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-80"
          required
        />

        <button type="submit" className="bg-blue-500 text-white py-2 rounded">Login</button>
        <p>Don`t have an Account? <Link to="/signUp"> SignUp</Link></p>
      </form>
      <button
        onClick={handleGoogleLogin}
        className="bg-red-500 text-white py-2 rounded mt-3 w-80">
        Login with Google
      </button>
    </div>
  );
};

export default Login;
