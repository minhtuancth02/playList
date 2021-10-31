import React from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components'
import { useAuth } from 'F:/React-Random/travel-web/src/contexts/AuthContexts.js'
// import { useSpring, animated } from 'react-spring';


const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  width: '800px',
  height: '500px',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
};

const MODAL_PROFILE = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  width: '600px',
  height: '500px',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

const Modal = ({ children, isModal, setIsModal , currentUser }) => {

    const keyPress = React.useCallback(
      (e) => {
        if (e.key === 'Escape' && isModal) {
          setIsModal(false);
        }
      },[setIsModal, isModal]
    );

    React.useEffect(() => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    }, [keyPress])
    
    if (!isModal) return null;

    return ReactDom.createPortal(
        <>
          <div style={OVERLAY_STYLES} />
          <div style={currentUser ? MODAL_PROFILE : MODAL_STYLES}>
            {children}
          </div>
        </>
        ,document.getElementById('root').children[0]
    )  
}

export default Modal
