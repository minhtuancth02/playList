import React from 'react'

export default function Section({ children , anchor }) {
  return (
    <div className="section" id={anchor}>
      {/* a name attr for match parameter url */}
      <a name={`#${anchor}`} />
      {/* <h2>{title}</h2> */}
      {children}
    </div>
  );
};

Section.displayName = 'Section'
