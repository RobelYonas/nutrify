// src/pages/Home.jsx
import { motion } from "framer-motion";
import Popular from "../components/Popular";
import Veggie from "../components/Veggie";
import Profile from "../components/Profile";
import React from 'react';

function Home() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Profile />
      <Veggie />
      <Popular />
    </motion.div>
  );
}

export default Home;
