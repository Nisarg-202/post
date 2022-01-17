import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import postContext from "../store/posts";

export default function Card(props) {
  const { posts } = useContext(postContext);
  const [allPost, setAllPost] = useState([]);

  useEffect(function () {
    setAllPost(posts.slice(0, props.size));
  }, []);

  return (
    <div className="row container my-4">
      {allPost.length > 0 &&
        allPost.map(function (item) {
          return (
            <div className="col-lg-4 col-12" key={item.id}>
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={`${item.cardImage}`}
                  className="card-img-top"
                  alt={`${item.title}`}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <Link href={`/allPost/${item.id}`}>
                    <a className="btn btn-primary">See More...</a>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
