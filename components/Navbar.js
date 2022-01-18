import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Navbar(props) {
  const [auth, setAuth] = useState(false);

  useEffect(function () {
    async function checkAuth() {
      const token = sessionStorage.getItem("TOKEN");
      const response = await axios.post("/api/checkAuth", { token });
      console.log(response.data);
      if (response.data.condition) {
        setAuth(true);
      } else {
        sessionStorage.removeItem("TOKEN");
        setAuth(false);
      }
    }

    checkAuth();
  }, []);

  function onLogout() {
    sessionStorage.removeItem("TOKEN");
    window.location.href = "/";
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">Nisarg's Blog</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {auth && (
              <li className="nav-item">
                <Link href="/allPost">
                  <a className="nav-link">All Posts</a>
                </Link>
              </li>
            )}
            {auth && (
              <li className="nav-item">
                <Link href="/contact">
                  <a className="nav-link">Contact Us</a>
                </Link>
              </li>
            )}
            {!auth && (
              <li className="nav-item">
                <Link href="/auth">
                  <a className="nav-link">Authentication</a>
                </Link>
              </li>
            )}
            {auth && (
              <li className="nav-item">
                <a className="nav-link" onClick={onLogout}>
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

// export async function getServerSideProps() {
//   const token = sessionStorage.getItem("TOKEN");
//   const response = await axios.post("/api/checkAuth", { token });
//   console.log(response.data);
//   let isAuthenticated;
//   if (response.data.condition) {
//     isAuthenticated = true;
//   } else {
//     sessionStorage.removeItem("TOKEN");
//     isAuthenticated = false;
//   }
//   console.log(isAuthenticated);
//   return {
//     props: {
//       isAuthenticated,
//     },
//   };
// }
