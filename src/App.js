import { BrowserRouter, Link } from "react-router-dom";
import Category from "./components/Category";
import Pages from "./pages/Pages";
import Search from "./components/Search";
import styled from "styled-components";
import { LuSalad } from "react-icons/lu";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav>
        <LuSalad />
        <Logo to={'/'}>Nutrishape</Logo>
      </Nav>
        <Search/>
        <Category />
        <Pages />
    </BrowserRouter>
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
