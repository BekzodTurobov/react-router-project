import React from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import About from "./components/About";
import Missing from "./components/Missing";
import EditPost from "./components/EditPost";
import { useEffect } from "react";
import useAxiosFetch from "./Hooks/useAxiosFetch";
import { Route, Routes } from "react-router-dom";
import { useStoreActions } from "easy-peasy";

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);

  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3000/posts"
  );

  useEffect(() => {
    setPosts(data);
  }, [data, setPosts]);

  return (
    <div className="App">
      <Header title="React Js Blog" />
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <Home path="/" isLoading={isLoading} fetchError={fetchError} />
          }
        ></Route>
        <Route path="/post" element={<NewPost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/about" Component={About} />
        <Route path="*" Component={Missing} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
