// ConfirmDelete.tsx
import React from "react";
import "./ConfirmDelete.scss";
import useDeleteHandler from "../MessageHandling/ErrorHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface ConfirmDeleteProps {
  onClose: () => void;
  onConfirmDelete: () => Promise<void>;
  idToDelete?: number;
  text: string;
  subTextAvailable: boolean
  subText?: string
  buttonTextBlue: string;
  buttonTextRed: string;
  topButtonClassName: string
  bottomButtonClassName: string
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  onClose,
  onConfirmDelete,
  text,
  subTextAvailable,
  subText,
  buttonTextBlue,
  buttonTextRed,
  topButtonClassName,
  bottomButtonClassName
}) => {
  const { loading, errorMessage, handleDelete } = useDeleteHandler({
    onDelete: onConfirmDelete,
  });

  return (
    <div className="confirmDeletePopUp">
      <div className="deleteTitleStyle">
        {text}
      </div>
      {subTextAvailable ? (
          <div className="subText">
            {subText}
          </div>
          ) : (
            <div>
              </div>
          )}
      <div className="buttonContainer">
        <button
          className="blueButton"
          type="submit"
          style={{backgroundColor:topButtonClassName}}
          disabled={loading}
          onClick={onClose}
        >
          {loading ? buttonTextBlue : buttonTextBlue}
        </button>
        <button
          className="redButton"
          style={{backgroundColor:bottomButtonClassName}}
          type="submit"
          disabled={loading}
          onClick={handleDelete}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} spin={true} />
          ) : (
            buttonTextRed
          )}
        </button>
      </div>
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
    </div>
  );
};

export default ConfirmDelete;
