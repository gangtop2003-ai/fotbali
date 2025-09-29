import { NavLink } from "react-router-dom";
function Nav(){
return(
    <nav className="nav">
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Home
      </NavLink>
     
      <NavLink
        to="/Arsenal"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Arsenal
      </NavLink>
      <NavLink
        to="/football"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        football
      </NavLink>
      
    </nav>
)
}

export default Nav;