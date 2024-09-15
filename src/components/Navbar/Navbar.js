import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import logo from '../../assets/images/logo.png';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import './Navbar.css';

// Dropdown component for handling menus like "Who We Are", "Solutions", "Insight"
const Dropdown = ({ title, items }) => (
  <div className="dropdown">
    <button className="dropdown-title">{title}</button>
    <div className="dropdown-menu">
      {items.map((item, index) => (
        <Link
          key={index}
          to={`/${item.replace(/\s+/g, '-').toLowerCase()}`}
          className="dropdown-item"
                >
          {item}
        </Link>
            ))}
    </div>
  </div>
);

const Navbar = () => {
  const { user, isLoading } = useAuth0();

  const getUserInitials = (name) => {
    const names = name.split(' ');
    return names.map((n) => n[0]).join('');
  };

  const whoWeAreItems = ['Our Story', 'Our Team'];
  const solutionsItems = ['Cash Investments', 'Risk Management', 'Debt Finance Consulting'];
  const insightItems = ['News', 'Event'];

  return (
    <div className="navbar-container">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" >
          <img src={logo} alt="logo" className="navbar-logo" />
        </Link>

        {/* Dropdowns */}
        <Dropdown title="Who We Are" items={whoWeAreItems} />
        <Dropdown title="Solutions" items={solutionsItems} />
        <Dropdown title="Insight" items={insightItems} />

        <Link to="/contact-us" className="navbar-link">
          Contact Us
        </Link>

        {/* Conditional rendering for logged in/out status */}
        {user ? (
          <>
            <Link to="/investment-products" className="navbar-link">
              Investment Products
            </Link>
            <LogoutButton />
          </>
                ) : (
                  <LoginButton />
                )}

        {/* User Information */}
        <div className="navbar-user-info">
          {!isLoading && user && (
            <Link to="/profile">
              <div className="user-initials">
                {getUserInitials(user.name)}
              </div>
            </Link>
                    )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
