// import { useState, useEffect, useRef } from "react";
// import "./index.css";

// function App() {
//   const alerter = () => {
//     alert("You have clicked the button");
//   };
//   return (
//     <div className="bg-green-400 w-screen h-screen p-5 flex justify-center items-center">
//       <div className="bg-white border-blue-400 border-5 rounded-2xl w-[50%] h-[50%] flex justify-centre items-center p-6">
//         <div className="flex justify-center ">
//           <input placeholder="type here" className="border-2"></input>
//           <button
//             onClick={alerter}
//             className="rounded-2xl bg-amber-200 w-[100] h-[50]"
//           >
//             Click me!
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// This directive is necessary for using hooks like useState and useEffect

// This directive is necessary for using hooks like useState and useEffect

import React, { useState, useEffect } from "react";
// Firebase Imports
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInAnonymously,
  signInWithCustomToken,
} from "firebase/auth";

// --- Firebase Configuration ---
// These global variables are provided by the environment.
const firebaseConfig =
  typeof __firebase_config !== "undefined" ? JSON.parse(__firebase_config) : {};
const appId = typeof __app_id !== "undefined" ? __app_id : "default-app-id";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- Sample Data ---
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const TMDB_BACKDROP_URL = "https://image.tmdb.org/t/p/original";

const sampleData = {
  trending: [
    {
      id: 786892,
      title: "Furiosa: A Mad Max Saga",
      overview:
        "As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus...",
      poster_path: "/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
      backdrop_path: "/Fp96Gre7MjGAprStg0jwEndlJyB.jpg",
    },
    {
      id: 1022789,
      title: "Inside Out 2",
      overview:
        "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions!",
      poster_path: "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
      backdrop_path: "/gNPqcv1tAifbN7PRNgIeAseTJe8.jpg",
    },
    {
      id: 653346,
      title: "Kingdom of the Planet of the Apes",
      overview:
        "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows.",
      poster_path: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
      backdrop_path: "/fqv8v6AycXbS7exX7wbxIIzT6rd.jpg",
    },
    {
      id: 929590,
      title: "Civil War",
      overview:
        "In the near future, a group of war journalists attempt to survive while reporting the truth as the United States stands on the brink of civil war.",
      poster_path: "/sh7OJiThisdSSNw0EfkSCDdcT21.jpg",
      backdrop_path: "/5Eip60UDiXgxcqrAnxYMLtq2Fk.jpg",
    },
    {
      id: 573435,
      title: "Bad Boys: Ride or Die",
      overview:
        "After their late former Captain is framed, Lowrey and Burnett try to clear his name, only to end up on the run themselves.",
      poster_path: "/nP6RliHjxsz4irTKsxe8FRhKZYl.jpg",
      backdrop_path: "/Akv9GlCCMrzcDkVz4ad8MdLl9DK.jpg",
    },
  ],
  sciFi: [
    {
      id: 823464,
      title: "Godzilla x Kong: The New Empire",
      overview:
        "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
      poster_path: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
      backdrop_path: "/1XDDXPXGiI8id7MrS5TWE9sZCZ1.jpg",
    },
    {
      id: 766554,
      title: "Atlas",
      overview:
        "A brilliant counterterrorism analyst with a deep distrust of AI discovers it might be her only hope when a mission to capture a renegade robot goes awry.",
      poster_path: "/bcM2Tl5HlsvPBnL8E8kaUqHBFcf.jpg",
      backdrop_path: "/3TNSoB2L2oRpl56HwAYY2S2ADnh.jpg",
    },
    {
      id: 693134,
      title: "Dune: Part Two",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
      poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
      backdrop_path: "/xOMo8BRK7Pkr4KiL7sfC9gPqN2i.jpg",
    },
  ],
  action: [
    {
      id: 1016346,
      title: "Tarot",
      overview:
        "When a group of friends recklessly violates the sacred rule of Tarot readings, they unknowingly unleash an unspeakable evil trapped within the cursed cards.",
      poster_path: "/gAEUXC3UaE7MVcaJ2S9Sj5pDs1M.jpg",
      backdrop_path: "/oavbmL3iddJUmC8nQjL6bLHwAP4.jpg",
    },
    {
      id: 385687,
      title: "Fast X",
      overview:
        "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path.",
      poster_path: "/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
      backdrop_path: "/hUVsXFpP52Ily2t54y4b3B7bLef.jpg",
    },
    {
      id: 843527,
      title: "The Strangers: Chapter 1",
      overview:
        "After their car breaks down in an eerie small town, a young couple is forced to spend the night in a remote cabin. Panic ensues as they are terrorized by three masked strangers.",
      poster_path: "/5s3bT3l3A2n5I3UfP21I4pCslp1.jpg",
      backdrop_path: "/h56edmERPTkey89SqyKu4hINVnm.jpg",
    },
  ],
  comedies: [
    {
      id: 1072790,
      title: "Anyone But You",
      overview:
        "After an amazing first date, Bea and Ben’s fiery attraction turns ice cold — until they find themselves unexpectedly reunited at a destination wedding in Australia.",
      poster_path: "/5qHoazZiaLe7oFBok7XlUhg96f2.jpg",
      backdrop_path: "/y9Dr6yCVYR63n5b8joBe358qP9M.jpg",
    },
    {
      id: 912918,
      title: "The Garfield Movie",
      overview:
        "Garfield, the world-famous, Monday-hating, lasagna-loving indoor cat, is about to have a wild outdoor adventure!",
      poster_path: "/zK2sFxZcelJy4YG2LpE6FE5P0T.jpg",
      backdrop_path: "/vWzJDjLPmyb2Z2SscNnI6Iu4a98.jpg",
    },
  ],
};

// --- LOGGED-IN COMPONENTS ---

const Header = ({ handleSignOut }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-black bg-opacity-90" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <a href="#" className="text-2xl font-bold text-red-600">
              CLONEFLIX
            </a>
            <nav className="hidden md:flex items-center space-x-4">
              <a
                href="#"
                className="text-sm font-medium text-gray-200 hover:text-gray-400 transition"
              >
                Home
              </a>
              <a
                href="#"
                className="text-sm font-medium text-gray-200 hover:text-gray-400 transition"
              >
                TV Shows
              </a>
              <a
                href="#"
                className="text-sm font-medium text-gray-200 hover:text-gray-400 transition"
              >
                Movies
              </a>
              <a
                href="#"
                className="text-sm font-medium text-gray-200 hover:text-gray-400 transition"
              >
                My List
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-200 hover:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button
              onClick={handleSignOut}
              className="bg-red-600 text-white text-sm font-bold py-1 px-3 rounded hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const HeroSection = ({ movie }) => {
  if (!movie)
    return (
      <div className="h-[56.25vw] min-h-[400px] max-h-[800px] w-full bg-gray-900 animate-pulse"></div>
    );
  return (
    <section className="relative h-[56.25vw] min-h-[400px] max-h-[800px] w-full">
      <img
        src={`${TMDB_BACKDROP_URL}${movie.backdrop_path}`}
        alt={movie.title}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl text-white pt-20">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4">
            {movie.title || movie.name}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg mb-6 line-clamp-3">
            {movie.overview}
          </p>
          <div className="flex items-center space-x-4">
            <button className="flex items-center justify-center bg-white text-black font-bold py-2 px-6 rounded hover:bg-gray-200 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              Play
            </button>
            <button className="flex items-center justify-center bg-gray-500 bg-opacity-70 text-white font-bold py-2 px-6 rounded hover:bg-gray-600 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              More Info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const PosterCard = ({ movie }) => (
  <div className="flex-shrink-0 w-36 sm:w-40 md:w-48 lg:w-56 cursor-pointer transform transition-transform duration-200 hover:scale-110 hover:z-10">
    <img
      className="rounded"
      src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
      alt={movie.title}
      loading="lazy"
    />
  </div>
);

const ContentCarousel = ({ title, movies }) => {
  if (!movies || movies.length === 0) return null;
  return (
    <section className="pl-4 sm:pl-6 lg:pl-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="carousel-wrapper">
        <div className="carousel-container flex space-x-4 overflow-x-auto pb-4">
          {movies.map((movie) => (
            <PosterCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="border-t border-gray-800 mt-12 py-8">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-gray-400">
      ...
    </div>
  </footer>
);

const MainApp = ({ handleSignOut }) => {
  const heroMovie = sampleData.trending[0];
  return (
    <div className="bg-[#141414] text-white">
      <Header handleSignOut={handleSignOut} />
      <main>
        <HeroSection movie={heroMovie} />
        <div className="py-8 space-y-8 lg:space-y-12">
          <ContentCarousel title="Trending Now" movies={sampleData.trending} />
          <ContentCarousel title="Sci-Fi Hits" movies={sampleData.sciFi} />
          <ContentCarousel
            title="Action & Adventure"
            movies={sampleData.action}
          />
          <ContentCarousel title="Comedies" movies={sampleData.comedies} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

// --- LOGGED-OUT COMPONENT (Landing/Auth Page) ---

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative h-screen w-full">
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/51c1d7f7-3179-4a55-93d9-704ea2020999/be90e76c-83c9-46ab-b265-75c58a86ea72/IN-en-20240610-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <header className="absolute top-0 left-0 right-0 p-4 z-10">
        <a href="#" className="text-3xl font-bold text-red-600">
          CLONEFLIX
        </a>
      </header>

      <div className="relative z-10 flex justify-center items-center h-full">
        <div className="bg-black bg-opacity-75 p-16 rounded-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h1>
          {error && (
            <p className="bg-red-500 text-white p-3 rounded mb-4 text-sm">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              className="bg-red-600 text-white font-bold py-3 rounded hover:bg-red-700 transition"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>
          <div className="mt-8 text-gray-400">
            {isSignUp ? (
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-white hover:underline"
                >
                  Sign in now.
                </button>
              </p>
            ) : (
              <p>
                New to Cloneflix?{" "}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-white hover:underline"
                >
                  Sign up now.
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

export default function Home() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const authAndListen = async () => {
      // Sign in with custom token if available, otherwise sign in anonymously
      try {
        if (
          typeof __initial_auth_token !== "undefined" &&
          __initial_auth_token
        ) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error("Authentication failed:", error);
      }

      // Listen for user state changes
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setAuthReady(true);
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    };

    authAndListen();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
  };

  if (!authReady) {
    return (
      <div className="h-screen w-full bg-[#141414] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                body { background-color: #141414; color: white; font-family: 'Inter', sans-serif; }
                .carousel-container::-webkit-scrollbar { height: 8px; }
                .carousel-container::-webkit-scrollbar-thumb { background-color: rgba(255, 255, 255, 0.2); border-radius: 10px; }
                .carousel-container::-webkit-scrollbar-track { background: transparent; }
                .carousel-wrapper { position: relative; }
                .carousel-wrapper::after { content: ''; position: absolute; top: 0; right: 0; bottom: 0; width: 50px; background: linear-gradient(to right, transparent, #141414); pointer-events: none; }
                .hero-gradient { background-image: linear-gradient(to top, rgba(20, 20, 20, 1) 0, rgba(20, 20, 20, 0.6) 20%, rgba(20, 20, 20, 0) 60%, rgba(20, 20, 20, 1) 100%); }
            `,
        }}
      />

      {/* If the user is anonymous (not signed in with email), show AuthPage */}
      {user && !user.isAnonymous ? (
        <MainApp handleSignOut={handleSignOut} />
      ) : (
        <AuthPage />
      )}
    </>
  );
}
