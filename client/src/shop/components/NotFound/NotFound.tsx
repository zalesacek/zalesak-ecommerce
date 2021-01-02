import React from 'react';

const NotFound = () => {
  return (
    <main
        className="content"
        role="main"
        itemScope={undefined}
        itemProp="mainContentOfPage"
    >
        <section className="content__intro">
          <div className="container">
            <h1>404 - Page not found</h1>
          </div>
        </section>              
    </main>
  );
}

export default NotFound;
