import Image from "next/image";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import postContext from "../../store/posts";
import Navbar from "../../components/Navbar";

export default function AllPostId(props) {
  const { posts } = useContext(postContext);
  const [post, setPost] = useState();
  useEffect(function () {
    setPost(posts[props.id - 1]);
  }, []);
  useEffect(function () {
    async function checkAuth() {
      const token = sessionStorage.getItem("TOKEN");
      const response = await axios.post("/api/checkAuth", { token });
      if (!response.data.condition) {
        window.location.href = "/";
      }
    }

    checkAuth();
  }, []);
  if (post) {
    return (
      <div>
        <Navbar />
        <div className="container text-center">
          <Image src={`${post.pageImage}`} height="100%" width="100%" />
          <h3>Title</h3>
          <p>{post.title}</p>
          <h3>Description</h3>
          <p>{post.description}</p>
        </div>
      </div>
    );
  }

  return <div>Loading...</div>;
}

export function getStaticProps(context) {
  return {
    props: {
      id: context.params.id,
    },
  };
}

export function getStaticPaths() {
  return {
    fallback: true,
    paths: [],
  };
}
