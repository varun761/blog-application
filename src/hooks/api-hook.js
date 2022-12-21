import { useState, useMemo } from "react";
import ApiService from "../services/api-service";
/**
 * 
 * @param {*} url the request url
 * @param {*} method the method either GET, POST, PUT, PATCH, DELETE
 * @param {*} headerParams the hreader params
 * @param {*} requestBody the request body
 * @returns object {
    error: string | null,
    data: object,
    loading: boolean,
    sendRequest: Function to trigger request,
  }
 */
const ApiHook = () => {
  const [error, setError] = useState(null);
  const [responseBody, setResponseBody] = useState({});
  const data = useMemo(() => responseBody, [responseBody]);
  const [loading, setLoading] = useState(true);
  const sendRequest = (url, method, headerParams = null, requestBody = null, params = null) => {
    setError(null);
    setLoading(true);
    let apiRequestHandler = null;
    const paramsOp = params ? Object.keys(params).map((el) => `${el}=${params[el]}`).reduce((el,acc) => `${el}&${acc}`) : null;
    const urlWithParams = params ? `${url}?${paramsOp}` : url ;
    switch (method) {
      case "POST":
        apiRequestHandler = ApiService.postRequest(
          urlWithParams,
          requestBody,
          headerParams
        );
        break;
      case "PUT":
        apiRequestHandler = ApiService.putRequest(
          urlWithParams,
          requestBody,
          headerParams
        );
        break;
      case "PATCH":
        apiRequestHandler = ApiService.patchRequest(
          urlWithParams,
          requestBody,
          headerParams
        );
        break;
      case "DELETE":
        apiRequestHandler = ApiService.deleteRequest(urlWithParams, headerParams);
        break;
      default:
        apiRequestHandler = ApiService.getRequest(urlWithParams);
    }
    apiRequestHandler
      .then((res) => res.data)
      .then((res) => {
        setResponseBody(Object.assign({}, responseBody, res || {}));
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  return {
    error,
    data,
    loading,
    sendRequest,
  };
};

export default ApiHook;
