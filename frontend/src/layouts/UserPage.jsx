import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';

const UserPage = () => {
  const location = useLocation();
  const { id, name } = location.state || { id: 'N/A', name: "N/A" };
  const [pageName] = useState('User Page');

  return (
    <div>
      <Header
        pageName={pageName}
        userId={id}
        userName={name}
      />

      <h2>Handle: {id}</h2>
      <h2>Name: {name}</h2>
    </div>
  );
};

export default UserPage;