import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        Header content
      </header>
      <main>
        {children}
      </main>
      <footer>
        Footer content
      </footer>
    </div>
  );
};

export default Layout;
