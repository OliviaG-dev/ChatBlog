import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Post from './pages/post/post';
import Search from './pages/search/search';
import Add from './pages/add/add';
import Page404 from './utils/page404/page404';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Post />} />
        <Route path="/search" element={<Search />} />
        <Route path="/add" element={<Add />} />
        <Route path="/404" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
