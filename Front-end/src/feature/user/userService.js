import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}`

/**
 * retrieve user general information
 * @param {String} token user identifier
 * @returns {Object} user general information
 */
export const UserInfo = async (token) => {

    const response = await
        axios({
            method: "post",
            url: API_URL + `/profile`,
            headers: { 'Authorization': `Bearer ${token}` }
        })
    return response.data.body
}

/**
 * Modify the firstnameand lastname of the user
 * @param {String} token 
 * @param {Object} data 
 * @returns the firstnameand lastname of the user
 */

export const editName = async (data, token) => {
    console.log("call", data, token);
    const response = await
        axios({
            method: "put",
            url: API_URL + `/profile`,
            headers: { 'Authorization': `Bearer ${token}` },
            data
        })
    return response.data.body
}
