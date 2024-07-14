import axios from "axios";

const baseUrl = "http://localhost:3001/api/contacts";

const getAll = () => {
  return axios
    .get(baseUrl)
    .then((res) => res.data)
    .catch((er) => alert(`No se pudo obtener las notas del servidor ${er}`));
};

const update = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((res) => res.data)
    .catch((er) => alert(`No se pudo modificar el recurso ${er}`));
};

const create = (newObject) => {
  return axios
    .post(baseUrl, newObject)
    .then((res) => res.data)
    .catch((er) => alert(`No se pudo guardar en el servidor`));
};
const deleteThis = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then((res) =>res.data)
    .catch((er) => alert(`No se pudo borrar de la base de datos `));
};

export default {
  update,
  create,
  getAll,
  deleteThis,
};
