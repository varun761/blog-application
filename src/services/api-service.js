import axios from 'axios'

class ApiServiceClass {
    constructor() {
        this.controller = new AbortController()
    }
    cancelApiRequest () {
        this.controller.abort()
    }
    generateApiUrl (url) {
        return `${process.env.REACT_APP_API_BASE}${url}`
    }
    postRequest(url, data, headers = null) {
        const postArgs = {
            method: 'POST',
            url: this.generateApiUrl(url),
            signal: this.controller.signal
        }
        if (data) postArgs.data = data
        if (headers) postArgs.headers = headers
        return axios(postArgs)
    }
    getRequest(url, headers = null) {
        const postArgs = {
            method: 'GET',
            url: this.generateApiUrl(url),
            signal: this.controller.signal
        }
        if (headers) postArgs.headers = headers
        return axios(postArgs)
    }
    deleteRequest(url, headers = null) {
        const postArgs = {
            method: 'DELETE',
            url: this.generateApiUrl(url),
            signal: this.controller.signal
        }
        if (headers) postArgs.headers = headers
        return axios(postArgs)
    }
    putRequest(url, data, headers = null) {
        const postArgs = {
            method: 'PUT',
            data,
            url: this.generateApiUrl(url),
            signal: this.controller.signal
        }
        if (headers) postArgs.headers = headers
        return axios(postArgs)
    }
    patchRequest(url, data, headers = null) {
        const postArgs = {
            method: 'PATCH',
            data,
            url: this.generateApiUrl(url),
            signal: this.controller.signal
        }
        if (headers) postArgs.headers = headers
        return axios(postArgs)
    }
}

const ApiService = new ApiServiceClass()

export default ApiService