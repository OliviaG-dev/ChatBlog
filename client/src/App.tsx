import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Search from './pages/search/search';
import Edit from './pages/edit/edit';
import Page404 from './utils/page404/page404';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Edit" element={<Edit />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
