// components/Footer.jsx
const Footer = () => (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-4 gap-8">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">About Us</h3>
          <p className="text-gray-400">Find the perfect school for your child with our comprehensive database.</p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-1 text-gray-400">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/about" className="hover:text-blue-400">About Us</a></li>
            <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Contact</h3>
          <div className="text-gray-400 space-y-1">
            <p><i className="fas fa-envelope mr-2"></i>info@schoolfinder.com</p>
            <p><i className="fas fa-phone mr-2"></i>+92 3055652478</p>
            <p><i className="fas fa-map-marker-alt mr-2"></i>Goheer town Street 1,<br />
            Bahawalpur, Pakistan</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex gap-4 text-2xl text-gray-400">
            <a href="https://www.linkedin.com/in/fiaz-hussain-671679340?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="hover:text-blue-400"><i className="fab fa-facebook"></i></a>
            <a href="https://www.linkedin.com/in/fiaz-hussain-671679340?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="hover:text-blue-400"><i className="fab fa-twitter"></i></a>
            <a href="https://www.linkedin.com/in/fiaz-hussain-671679340?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="hover:text-blue-400"><i className="fab fa-instagram"></i></a>
            <a href="https://www.linkedin.com/in/fiaz-hussain-671679340?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="hover:text-blue-400"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 py-4 text-center text-gray-400">
        <p>&copy; 2024 School Finder. All rights reserved.</p>
      </div>
    </footer>
  );
  
  export default Footer;