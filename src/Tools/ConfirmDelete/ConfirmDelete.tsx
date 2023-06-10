// ConfirmDelete.tsx
import React from 'react';
import './ConfirmDelete.scss';
import useDeleteHandler from '../MessageHandling/ErrorHandler';

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
  const { loading, errorMessage, handleDelete } = useDeleteHandler({ onDelete: onConfirmDelete });

  return (
    <div className="confirmDeletePopUp">
      <div className="deleteTitleStyle">
        Möchten Sie den Eintrag wirklich löschen?
      </div>
      <div className="buttonContainer">
        <button className="blueButton" type="submit" disabled={loading} onClick={onClose}>
          {loading ? "Laden..." : "Nein, behalten"}
        </button>
        <button className="redButton" type="submit" disabled={loading} onClick={handleDelete}>
          {loading ? "Laden..." : "Ja, löschen"}
        </button>
      </div>
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
    </div>
  );
};

export default ConfirmDelete;
