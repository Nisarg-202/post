import postContext from "../store/posts";
import "../styles/globals.css";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  const ALL_POSTS = [
    {
      id: 1,
      title: "Javascript",
      description: "This is the javascript description",
      cardImage: "/images/javascript-card.png",
      pageImage: "/images/javascript-page.png",
    },
    {
      id: 2,
      title: "Ruby",
      description: "This is the Ruby description",
      cardImage: "/images/ruby-card.png",
      pageImage: "/images/ruby-page.jpg",
    },
    {
      id: 3,
      title: "GoLang",
      description: "This is the GoLang description",
      cardImage: "/images/go-card.png",
      pageImage: "/images/go-page.png",
    },
  ];
  return (
    <postContext.Provider value={{ posts: ALL_POSTS }}>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
      </Head>
      <Component {...pageProps} />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossOrigin="anonymous"
      ></Script>
    </postContext.Provider>
  );
}

export default MyApp;
