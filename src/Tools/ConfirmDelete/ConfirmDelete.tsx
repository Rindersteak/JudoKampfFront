// ConfirmDelete.tsx
import React from "react";
import "./ConfirmDelete.scss";
import useDeleteHandler from "../MessageHandling/ErrorHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface ConfirmDeleteProps {
  onClose: () => void;
  onConfirmDelete: () => Promise<void>;
  idToDelete: number;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  onClose,
  onConfirmDelete,
  idToDelete,
}) => {
  const { loading, errorMessage, handleDelete } = useDeleteHandler({
    onDelete: onConfirmDelete,
  });

  return (
    <div className="confirmDeletePopUp">
      <div className="deleteTitleStyle">
        Möchten Sie den Eintrag wirklich löschen?
      </div>
      <div className="buttonContainer">
        <button
          className="blueButton"
          type="submit"
          disabled={loading}
          onClick={onClose}
        >
          {loading ? "Nein, behalten" : "Nein, behalten"}
        </button>
        <button
          className="redButton"
          type="submit"
          disabled={loading}
          onClick={handleDelete}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} spin={true} />
          ) : (
            "Ja, löschen"
          )}
        </button>
      </div>
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
    </div>
  );
};

export default ConfirmDelete;
