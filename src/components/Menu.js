import { Link } from 'react-router-dom';
import './menu.css';

function Menu() {
  return (
    <nav>
      <ul className="nav-left">
        <li><Link to="/signup">Sign up form</Link></li>
        <li><Link to="/">Articles</Link></li>
        <li><Link to="/addArticle">Add article</Link></li>
        <li><Link to="/addComment">Add comment</Link></li>
      </ul>
      <ul className="nav-right">
        <li><Link to="/signin">Sign In</Link></li>
      </ul>
    </nav>
  );
}

export default Menu;
