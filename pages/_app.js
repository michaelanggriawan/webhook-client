import { useEffect, useState } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [showing, setShowing] = useState(false);
  // fix nextjs hybrid rendering
  useEffect(() => {
    setShowing(true);
  }, []);

  if (!showing) {
    return null;
  }

  return <Component {...pageProps} />;
}

export default MyApp;
