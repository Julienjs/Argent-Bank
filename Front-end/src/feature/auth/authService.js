import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}`

/**
 * 
* @param {Object} data 
* @returns {String} the token
 */

export const login = async (data) => {
    const response = await
        axios.post(API_URL + '/login', data)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data.body))
    }
    return response.data.body
}

export const logout = () => {
    localStorage.removeItem('user')
}