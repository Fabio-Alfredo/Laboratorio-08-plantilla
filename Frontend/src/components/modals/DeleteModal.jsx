import useDelete from "../../hooks/useDelete";

const DeleteModal = ({
  context,
  label,
  setVisibility,
  elementId,
  onDeleted,
}) => {
  //SE DEBE IMPLEMENTAR EL HOOK DE DELETE useDelete
  //SE DEBE USAR LA VARIABLE DE ENTORNO

  
  //SE DEBE ENVIAR EL ID DEL ELEMENTO A ELIMINAR CON LA FUNCION QUE PROPORCIONA EL HOOK useDelete
  //SE DEBE MANEJAR EL ESTADO DE LA RESPUESTA Y EL ERROR
  const handleSubmitDeleted = async () => {
    try {
      onDeleted(elementId);
      setVisibility(false);
    } catch (e) {}
  };

  const handleCancel = () => {
    setVisibility(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{`Eliminando un ${context}`}</h2>
        <p className="mb-4">{label}</p>
        <div className="flex justify-center">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleSubmitDeleted}
          >
            Eliminar
          </button>
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
