import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import Category from "./components/Category";
import Pages from "./pages/Pages";
import Search from "./components/Search";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import styled from "styled-components";
import { LuSalad } from "react-icons/lu";

function App() {
  const user = localStorage.getItem('user');

  return (
    <div className="App">
      <Router>
        {user && (
          <>
            <Nav>
              <LuSalad />
              <Logo to="/home">Nutrishape</Logo>
            </Nav>
            <Search />
            <Category />
          </>
        )}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<Pages />} />
        </Routes>
      </Router>
    </div>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Lobster Two", cursive;
`;

const Nav = styled.div`
  padding: 4rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  svg {
    font-size: 2rem;
  }
`;

export default App;
