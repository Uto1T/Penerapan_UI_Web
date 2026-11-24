import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 bg-blue-600 text-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="font-bold text-lg">Job Sheet</h1>

        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className="hidden lg:flex gap-6 items-center">
          <Link to="/" className="hover:underline">Beranda</Link>
          <Link to="/peserta" className="hover:underline">Data Peserta</Link>
          {user === null ? (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          ) : (
            <>
              <span className="font-medium">{user.email}</span>
              <button onClick={handleLogout} className="hover:underline">Logout</button>
            </>
          )}
        </nav>
      </div>

      {menuOpen && (
        <div className="lg:hidden px-4 pb-4">
          <nav className="flex flex-col gap-3">
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:underline">Beranda</Link>
            <Link to="/peserta" onClick={() => setMenuOpen(false)} className="hover:underline">Data Peserta</Link>
            {user === null ? (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:underline">Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="hover:underline">Register</Link>
              </>
            ) : (
              <>
                <span className="font-medium">{user.email}</span>
                <button onClick={handleLogout} className="hover:underline text-left">Logout</button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;