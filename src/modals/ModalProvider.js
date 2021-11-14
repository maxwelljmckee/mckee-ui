import React from "react";
import { DialogWrapper } from "./DialogWrapper";

const ModalContext = React.createContext();

export const ModalProvider = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("TestModal");
  const [props, setProps] = React.useState({});

  const showModal = (id, props) => {
    setId(id);
    setProps(props);
    setOpen(true);
  };

  const hideModal = () => setOpen(false);

  const deferShowModal = (id, props) => () => {
    setId(id);
    setProps(props);
    setOpen(true);
  };

  const onToggle = () => setOpen((prev) => !prev);

  return (
    <ModalContext.Provider
      value={{ open, showModal, hideModal, deferShowModal }}
    >
      <DialogWrapper
        id={id}
        open={open}
        onClose={hideModal}
        onToggle={onToggle}
        {...props}
      />
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const { open, showModal, hideModal, deferShowModal, deferHideModal } =
    React.useContext(ModalContext);
  return { open, showModal, hideModal, deferShowModal, deferHideModal };
};
