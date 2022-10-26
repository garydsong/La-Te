import React, { useRef, useState } from 'react'
import './Collapsible.css'


function Collapsible(props) {
  const [open, setOPen] = useState(false);

  const contentRef = useRef();
  if (contentRef.current) console.log(contentRef.current.scrollHeight);

  const toggle = () => {
    setOPen(!open);
  };


  return (
    <div>
      <div className='collapse-button'>
        <button onClick={toggle}>{props.label}</button>
      </div>
      <div className='opened-div'>
        {open &&
          <div className="toggle">{props.children}</div>
        }
      </div>
    </div>
  );
};

export default Collapsible
