import React, { useRef, useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";

const Context = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [context, setContext] = useState();

  useEffect(() => {
    setContext(modalRef.current);
  }, []);

  return (
    <Container>
      <Context.Provider value={context}>{children}</Context.Provider>
      <div ref={modalRef} />
    </Container>
  );
}

export function Modal({ onClose, children, ...props }) {
  const modalNode = useContext(Context);

  return modalNode
    ? ReactDOM.createPortal(
        <Overlay>
          <Dialog {...props}>
            {children}
          </Dialog>
        </Overlay>,
        modalNode
      )
    : null;
}

const fadeIn = keyframes`from { opacity: 0; }`;

const Container = styled.div`
  position: relative;
  z-index: 0;
`;

const Overlay = styled.div`
  animation: ${fadeIn} 600ms ease-out;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
`;

const Dialog = styled.div`
  border: solid;
  background-border:#0982AF; 
  background: seashell;
  border-radius: 15px;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;
