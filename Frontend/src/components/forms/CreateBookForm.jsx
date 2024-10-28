import React, { useEffect, useState } from "react";
import usePost from "../../hooks/usePost";
import useFetch from "../../hooks/useFetch";

export const CreateBookForm = ({ onClose, setBooksData }) => {
  const [authorsList, setAuthorsList] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publicationDate: "",
    pages: "",
  });

  //ACA SE DEBE IMPLEMENTAR EL HOOK DE FETCH PARA OBTENER LOS autores 
  //Y SE DEBEN ALMACENAR EN EL ESTADO DE authorsList
  //SE DEBE USAR LA VARIABLE DE ENTORNO
  //SE PUEDE UTILIZAR UN USEEFFECT PARA QUE SE EJECUTE ALMACENADO AL CARGAR LA PAGINA
    //EL USEEFFECT DEBE EJECUTARSE UNA SOLA VEZ O CUANDO SE CAMBIE EL VALOR DE data



  //SE DEBE IMPLEMENTAR EL HOOK USEPOST PARA ENVIAR LOS DATOS DEL FORMULARIO
  //SE DEBE USAR LA VARIABLE DE ENTORNO


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //SE DEBE ENVIAR EL OBJETO formData CON LA FUNCION QUE PROPORCIONA EL HOOK usePost
  //SE DEBE MANEJAR EL ESTADO DE LA RESPUESTA Y EL ERROR
  const handleSubmitCreateBook = async (e) => {
    e.preventDefault();
    try {
      setBooksData((prevBooks) => [...prevBooks, formData]);
      onClose();
    } catch (error) {
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmitCreateBook}
        className="max-w-lg w-full p-6 bg-white shadow-md rounded-md"
      >
        <h2 className="text-2xl font-semibold mb-4">Create a new Book</h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            placeholder="Title of the book"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="authors"
          >
            Author
          </label>
          <select
            name="author"
            id="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
          >
            <option value="">Select Author</option>
            {authorsList.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="publicationDate"
          >
            Publication date
          </label>
          <input
            type="date"
            name="publicationDate"
            id="publicationDate"
            value={formData.publicationDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="pages"
          >
            Number of Pages
          </label>
          <input
            placeholder="Number..."
            type="number"
            name="pages"
            id="pages"
            value={formData.pages}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            required
          />
        </div>

        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition duration-200"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Save Book
          </button>
        </div>
      </form>
    </div>
  );
};
