interface ModalProps {
    buttonDesign: string;
    id: string; 
    buttonId?: string; 
    modalName: string;
    headerText?: string;
    bodyContent: React.ReactNode;
    footerContent?: React.ReactNode;
  }
  
  const Modal: React.FC<ModalProps> = ({
    buttonDesign,
    id,
    buttonId,
    modalName,
    headerText,
    bodyContent,
    footerContent,
  }) => {
    return (
      <>
        <button
          type="button"
          className={`btn btn-${buttonDesign}`}
          id={buttonId || `${id}-button`}
          data-bs-toggle="modal"
          data-bs-target={`#${id}`}
        >
          {modalName}
        </button>
  
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
                  {headerText || modalName}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">{bodyContent}</div>
              {footerContent && (
                <div className="modal-footer">{footerContent}</div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Modal;
  