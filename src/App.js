import SignupForm from "./components/Form";
import ArticlesPage from "./components/Articles";
import SigninForm from "./components/SignIn";
import AddArticle from "./components/AddArticle";
import AddComment from "./components/AddComment";
import Menu from "./components/Menu";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './app.css'


function App() {
  return (
    <Router>
      <div>
        <Menu />
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<ArticlesPage />} />
          <Route path="/addArticle" element={<AddArticle />} />
          <Route path="/addComment" element={<AddComment />} />
          <Route path="/signin" element={<SigninForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
