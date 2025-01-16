import { Link } from "react-router-dom";

interface NavBarProps {
  brandPath: string;
  brandName: string;
  links: { path: string; name: string }[];
  actions?: React.ReactNode; // For modals, buttons, etc.
}

const NavBar: React.FC<NavBarProps> = ({ brandPath, brandName, links, actions }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to={brandPath} className="navbar-brand">
          {brandName}
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {links.map((link) => (
              <li key={link.path} className="nav-item">
                <Link to={link.path} className="nav-link">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {actions && <div className="d-flex">{actions}</div>}
      </div>
    </nav>
  );
};

export default NavBar;
