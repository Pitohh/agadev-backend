import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Missions from './pages/Missions';
import Projects from './pages/Projects';
import Resources from './pages/Resources';
import News from './pages/News';
import Contact from './pages/Contact';
import Opportunities from './pages/Opportunities';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/nos-missions" element={<Missions />} />
          <Route path="/projets-programmes" element={<Projects />} />
          <Route path="/ressources" element={<Resources />} />
          <Route path="/actualites" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/opportunites" element={<Opportunities />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;