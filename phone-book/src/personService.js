import axios from "axios";
const baseURL = "http://localhost:3001/api/persons"

const getAll = () => {
    let request = axios.get(baseURL);
    return request.then(result => result.data)
};

const create = (newObject) => {
    let request = axios.post(baseURL, newObject);
    return request.then(response => response.data);
};

const update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject);
    return request.then(response => response.data);
};
const deletePerson = id => {
    const request = axios.delete(`${baseURL}/${id}`);
    return request;
}
export default {
    getAll: getAll,
    create: create,
    update: update,
    deletePerson: deletePerson,
};