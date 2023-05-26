import { useState } from 'react';
import React from 'react';
import './ConfirmDelete.css';

interface ConfirmDeleteProps {
  onClose: () => void;
  onConfirmDelete: () => Promise<void>;
  fighterId: number;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  onClose,
  onConfirmDelete,
  fighterId,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await onConfirmDelete();
    setLoading(false);
  };

  return (
    <div className="confirmDeletePopUp">
      <div className="deleteTitleStyle">
        Möchten Sie den Teilnehmer wirklich löschen?
      </div>
      <div className="buttonContainer">
        <button className="addButton" type="submit" disabled={loading} onClick={onClose}>
          {loading ? "Laden..." : "Nein, behalten"}
        </button>
        <button className="addDeleteButton" type="submit" disabled={loading} onClick={handleDelete}>
          {loading ? "Laden..." : "Ja, löschen"}
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
