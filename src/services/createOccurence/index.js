import api from "../api";

export const postOccurence = (data) => {
    return api.post('/occurrences', data)
}