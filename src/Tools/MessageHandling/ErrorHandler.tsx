import { useState } from 'react';
import './ErrorHandler.scss';

interface DeleteHandlerProps {
    onDelete: () => Promise<void>;
  }
  
  const useDeleteHandler = ({ onDelete }: DeleteHandlerProps) => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
  
    const handleDelete = async () => {
        try {
          setLoading(true);
          setErrorMessage("");
          await onDelete();
          setLoading(false);
        } catch (error) {
          if (error instanceof Error) {
            let errorMessage = "";
            if (error.message === "Failed to fetch") {
              errorMessage = "Abruf fehlgeschlagen!";
            } else {
              errorMessage = "Ein Fehler ist aufgetreten.";
            }
            setErrorMessage(errorMessage);
          } else {
            setErrorMessage("Ein Fehler ist aufgetreten.");
          }
          setLoading(false);
        }
      };
      
      
  
    return { loading, errorMessage, handleDelete };
  };
  
  export default useDeleteHandler;