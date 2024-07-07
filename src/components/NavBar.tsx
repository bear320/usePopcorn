import Logo from "./Logo";

const NavBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
};

export default NavBar;
