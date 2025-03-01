import "/styles/root.css";
import "/styles/index.css";
import "/styles/contents.css";
import "/styles/nav.css";
import "/styles/footer.css";
import "/styles/kalender.css";
import "/styles/dokument.css";
import "/styles/fortroendevalda.css";
import "/styles/hedersmedlemmar.css";
import "/styles/publicera.css";
import "/styles/aktuellt.css";
import "/styles/feed-preview.css";
import "/styles/featured-preview.css";
import "/styles/reseberattelser.css";
import "/styles/personalrummet.css";
import "/styles/hedersorden.css";
import "/styles/TV.css";
import "/styles/sangbok.css";
import "/styles/kontakt.css";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/Footer";
import Head from "next/head";
import { useRouter } from "next/router";
import { AuthContextProvider } from "../context/AuthContext";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  if (router.pathname.includes("/TV")) {
    return <Component {...pageProps} />;
  }

  return (
    <div>
      <Head>
        <title>Sektionen för Civilingenjör och Lärare</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1" />
        <meta name="description" content="Sektionen för Civilingenjör och Lärare" />
        <meta
          name="keywords"
          content="Clsektionen, CL-sektionen, cl-sektionen, Lärare, KTH, Student, CL"
        />
        <meta name="author" content="Armin Baymani" />
        <link rel="shortcut icon" type="image/x-icon" href="/media/grafik/favicon/favicon.ico" />
      </Head>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
      <Analytics />
      <Footer />
      <Navbar />
    </div>
  );
}
