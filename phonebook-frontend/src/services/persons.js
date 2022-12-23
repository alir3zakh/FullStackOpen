import axios from "axios";

const baseURL = '/api/persons/'

const getAll = () => {
    return axios.get(baseURL)
        .then(response => response.data)
}

const addNew = (newPerson) => {
    return axios.post(baseURL, newPerson)
        .then(response => response.data)
}

const deletePerson = (id) => {
    return axios.delete(baseURL + id)
}

const updatePerson = (id, updatedObj) => {
    return axios.put(baseURL + id, updatedObj)
        .then(response => response.data)
}

export default { getAll, addNew, deletePerson, updatePerson }
