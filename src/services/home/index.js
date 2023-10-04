import api from "../api";

export const getOccurence = () => {
    return api.get('/occurrences')
}