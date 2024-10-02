import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-center text-lg-start mt-auto">
    <div className="text-center p-3 text-light">
      © {new Date().getFullYear()} Portal Empleados
    </div>
  </footer>
  );
};

export default Footer;
