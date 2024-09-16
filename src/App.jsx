import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
// Lazy loading components
const Signup = lazy(() => import("./pages/signup/Signup"));
const Login = lazy(() => import("./pages/login/Login"));
const Upload = lazy(() => import("./Home"));
const Verifyotp = lazy(() => import("./pages/verify-otp/Verifyotp"));
const Post = lazy(() => import("./components/posts/Post"));
const SeePosts = lazy(() => import("./components/seeposts/SeePosts"));
const Navbar = lazy(() => import("./components/navbar/Navbar"));
const Chatbot = lazy(() => import("./components/chatbot/chatbot"));
const Dashboard = lazy(() => import("./components/userprofile/UserProfile"));
const Search = lazy(() => import("./pages/searchpage/SearchPage"));
const PostVideo = lazy(() => import("./components//postVideo/PostVideo"));
const PostDetails = lazy(() => import("./PostDetail"));
const Error = lazy(() => import("./Error"));
const PasswordChange = lazy(() =>
  import("./pages/ChangePassword.jsx/PasswordChange")
);
function App() {
  const { authUser } = useAuthContext();
  console.log("authUser in App:", authUser); // Debugging log
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/login"
              element={
                !authUser ? <Login /> : <Navigate to="/upload" replace />
              }
            />
            <Route
              path="/upload"
              element={authUser ? <Upload /> : <Navigate to="/login" />}
            />
            <Route path="/otp-verification" element={<Verifyotp />} />
            <Route
              path="/post"
              element={authUser ? <Post /> : <Navigate to="/login" />}
            />
            {/* <Route path="/mypost" element={authUser ? <Mypost /> : <Navigate to="/login" />} /> */}
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/passwordchange" element={<PasswordChange />} />
            <Route path="/seeposts" element={<SeePosts />} />
            <Route
              path="/search"
              element={authUser ? <Search /> : <Navigate to="/login" />}
            />
            <Route path="/posts/:postId" element={<PostDetails />} />
            <Route
              path="/dashboard"
              element={authUser ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/"
              element={
                <Navigate to={authUser ? "/upload" : "/login"} replace />
              }
            />
            <Route path="/postvideo" element={<PostVideo />} />
            <Route path="*" element={<Error />} />{" "}
            {/* Fallback for any undefined route */}
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
