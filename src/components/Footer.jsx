const Footer = () => {
const currentYear = new Date().getFullYear();

 return (
 <footer className="bg-gray-900 text-gray-400 border-t border-gray-900">

 <div className="max-w-6xl mx-auto px-4 py-4 text-center md:text-left">
<p className="font-semibold text-white text-sm">DevTalks</p>
 <p className="text-xs"> {/* Made this text-xs for a cleaner look */}
 Copyright © {currentYear} - All right reserved
 </p>
 </div>
 </footer>
 );
};

export default Footer;