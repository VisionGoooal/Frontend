import React from "react";
import Button from "./Button"; // Import your custom Button component

interface ModalProps {
  buttonDesign: string;
  id: string;
  buttonId?: string;
  modalName: string;
  headerText: string;
  bodyContent: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  buttonDesign,
  id,
  buttonId,
  modalName,
  headerText,
  bodyContent,
}) => {
  return (
    <>
      <Button
        type="button"
        className={`btn btn-${buttonDesign}`}
        id={buttonId || `${id}-button`}
        ariaLabel={`${modalName} button`}
        onClick={() => console.log(`${modalName} button clicked`)}
        data-bs-toggle="modal"
        data-bs-target={`#${id}`}
      >
        {modalName}
      </Button>

      <div
        className="modal fade"
        id={id}
        tabIndex={-1}
        aria-labelledby={`${id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`${id}Label`}>
                {headerText}
              </h1>
              <Button
                type="button"
                className="btn-close"
                ariaLabel="Close"
                data-bs-dismiss="modal"
              ></Button>
            </div>
            <div className="modal-body">{bodyContent}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
