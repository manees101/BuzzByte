import "./App.scss";
import { Navbar, Footer } from "./components";
import {
  Home,
  Login,
  Logout,
  Register,
  Dashboard,
  ErrorPage,
  CreatePost,
  EditPost,
  DeletePost,
  Authors,
  AuthorPosts,
  CategoryPosts,
  UserProfile,
  PostDetail,
} from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "./reducers/userReducer";
import userAPI from "./api/userAPI";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useEffect } from "react";
import postAPI from "./api/postAPI";
import { setPostList } from "./reducers/postReducer";
function App() {
  const token = localStorage.getItem("token");
  const userData = useSelector((state) => state.user.userData);
  const postList = useSelector((state) => state.post.postList);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userData) {
      console.log(token);
      userAPI
        .getUser({ token: token })
        .then((data) => dispatch(setData({ token, userData: data })));
    }
    if (!postList) {
      postAPI
        .getAllPosts()
        .then((data) => dispatch(setPostList({ postList: data })));
    }
  }, []);
  return (
    <div className=" w-full overflow-auto scrollbar-hide">
      <BrowserRouter>
        <div className="w-full h-[10vh]">
          <Navbar />
        </div>

        <div className=" w-full min-h-[80vh] scrollbar-hide">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/auth/login"
              element={token ? <Navigate to={"/"} /> : <Login />}
            />
            <Route path="/auth/logout" element={<Logout />} />
            <Route
              path="/auth/register"
              element={token ? <Navigate to={"/"} /> : <Register />}
            />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/author/posts/:id" element={<AuthorPosts />} />
            <Route path="/authors" element={<Authors />} />
            <Route
              path="/profile/:id"
              element={
                token ? <UserProfile /> : <Navigate to={"/auth/login"} />
              }
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/post/create"
              element={token ? <CreatePost /> : <Navigate to={"/auth/login"} />}
            />
            <Route path="/post/category/:id" element={<CategoryPosts />} />
            <Route
              path="/post/:id/edit"
              element={token ? <EditPost /> : <Navigate to={"/auth/login"} />}
            />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </div>
        <div className="w-[100%] h-[10vh]">
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
