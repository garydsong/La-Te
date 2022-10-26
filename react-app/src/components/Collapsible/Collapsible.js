import React, { useRef, useState } from 'react'
import plus from "../../assets/icons/plus-icon.svg"
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
        <button onClick={toggle}><img id="plus-icon" src={plus}/>{props.label}</button>
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
