import axios from 'axios'

class ApiService {
    static postRequest(url, data, headers = null) {
        const postArgs = {
            method: 'POST',
            url
        }
        if (data) postArgs.data = data
        if (headers) postArgs.headers = headers
        return axios(postArgs)
    }
    static getRequest(url, headers = null) {
        const postArgs = {
            method: 'GET',
            url
        }
        if (headers) postArgs.headers = headers
        return axios(postArgs)
    }
    static deleteRequest(url, headers = null) {
        const postArgs = {
            method: 'DELETE',
            url
        }
        if (headers) postArgs.headers = headers
        return axios(postArgs)
    }
    static putRequest(url, data, headers = null) {
        const postArgs = {
            method: 'PUT',
            data,
            url
        }
        if (headers) postArgs.headers = headers
        return axios(postArgs)
    }
    static patchRequest(url, data, headers = null) {
        const postArgs = {
            method: 'PATCH',
            data,
            url
        }
        if (headers) postArgs.headers = headers
        return axios(postArgs)
    }
}

export default ApiService