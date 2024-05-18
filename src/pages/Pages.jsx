import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Home';
import Meal from './Meal';
import Searched from './Searched';
import Recipe from './Recipe';
import CalorieTracker from './CalorieTracker' // Import CalorieTracker
import { AnimatePresence } from 'framer-motion';

function Pages() {
  const location = useLocation();
  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/meal/:type' element={<Meal />} />
        <Route path='/recipe/:id' element={<Recipe />} />
        <Route path='/searched/:query' element={<Searched />} />
        <Route path='/tracker' element={<CalorieTracker />} /> {/* Add tracker route */}
      </Routes>
    </AnimatePresence>
  );
}

export default Pages;
