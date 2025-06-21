const Header = () => {
  return (
    <div className=" text-white border-b border-gray-800">
      <header className="flex items-center justify-between p-6 bg-gray-950 text-white max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold tracking-tight">Celestia</h1>
        <nav className="space-x-6 hidden md:flex">
          <a href="/live-map" className="hover:text-indigo-400">
            Live Map
          </a>
          <a href="/passes" className="hover:text-indigo-400">
            Passes
          </a>
          <a href="/explorer" className="hover:text-indigo-400">
            Explorer
          </a>
          <a href="/tle" className="hover:text-indigo-400">
            TLE Viewer
          </a>
          <a href="/about" className="hover:text-indigo-400">
            About
          </a>
        </nav>
      </header>
    </div>
  );
};

export default Header;
