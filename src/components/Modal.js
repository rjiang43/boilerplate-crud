//To be shown on screen in front of other components despite being deeply nested, require portals
//portals help make the component be rendered directly on the body element
import React from 'react';
import ReactDOM from 'react-dom';

//if you reference body ('#root') directly in createPortal, will replace everything in body
//so we create another id class in public.html
const Modal = (props) => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="ui dimmer modals visible active">
      <div onClick={e => e.stopPropagation()} className="ui standard modal visible active">
        <div className="header">{props.title}</div>
        <div className="content">
          <p>{props.content}</p>
        </div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
