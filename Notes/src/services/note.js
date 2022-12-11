import axios from "axios";

const baseURL = '/api/notes/'

const getAll = () => {
    return axios.get(baseURL)
        .then(response => response.data)
}

const create = (newNote) => {
    return axios.post(baseURL, newNote)
        .then(response => response.data)
}

const update = (changedNote, id) => {
    return axios.put(baseURL + id, changedNote)
        .then(response => response.data)
}

export default { getAll, create, update }
