import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
      {/* Hero Section with Background Image */}
      <div
        className="relative w-full h-screen flex flex-col justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 "></div>

        {/* Glassmorphism Container */}
        <div className="relative z-10 text-center p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg max-w-2xl mx-auto border border-white/20">
          <h1 className="text-white text-5xl md:text-6xl font-bold drop-shadow-lg">
            Welcome to <span className="text-yellow-400">HarvestHub</span>
          </h1>
          <p className="text-white text-lg md:text-xl mt-4 drop-shadow-md">
            Your one-stop online grocery store for fresh and organic produce delivered to your doorstep.
          </p>

          {/* Centered Buttons */}
          <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 text-lg font-semibold bg-yellow-500 text-white rounded-xl shadow-md hover:bg-yellow-600 transition duration-300"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 text-lg font-semibold bg-white text-green-600 border border-green-600 rounded-xl shadow-md hover:bg-green-600 hover:text-white transition duration-300"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
