
import { BASE_URL } from "../store/constant";

const GoogleAuthButton = ({ text = "Continue with Google" }) => {
  const handleGoogleAuth = () => {
    window.location.href = `${BASE_URL}/users/auth/google`;
  };

  return (
    <button
      onClick={handleGoogleAuth}
      className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 py-2 px-4 rounded-lg border border-gray-300 shadow-md hover:shadow-lg hover:bg-gray-50 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
    >
    
      <img 
 src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s48-fcrop64=1,00000000ffffffff-rw" 
 alt="Google logo" 
 className="w-5 h-5" // 20px
 />
      <span className="font-medium">{text}</span>
    </button>
  );
};

export default GoogleAuthButton;
