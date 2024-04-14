import { useState, useMemo, useContext } from "react";
import AppContext from "../context/app-context";
import ApiService from "../services/api-service";
/**
 * 
 * @param {*} url the request url
 * @param {*} method the method either GET, POST, PUT, PATCH, DELETE
 * @param {*} requestBody the request body
 * @returns object {
    error: string | null,
    data: object,
    loading: boolean,
    sendRequest: Function to trigger request,
  }
 */
const useAuthorizedApiHook = () => {
  const appContext = useContext(AppContext);
  const [error, setError] = useState(null);
  const [responseBody, setResponseBody] = useState({});
  const data = useMemo(() => responseBody, [responseBody]);
  const [loading, setLoading] = useState(true);
  const refreshToken = (refresh_token) => {
    return ApiService.postRequest("v1/auth/refresh-token", null, {
      Authorization: `Bearer ${refresh_token}`,
    })
      .then((res) => res.data)
      .catch((e) => {
        console.log(e.message);
        return null;
      });
  };
  const handleRefreshToken = async (refreshTokenValue, cb) => {
    try {
      const refreshTokenResponse = await refreshToken(refreshTokenValue);
      const { token } = refreshTokenResponse ? refreshTokenResponse : {};
      if (token) {
        localStorage.setItem("user", JSON.stringify(refreshTokenResponse));
        cb();
      } else {
        appContext.setCurrentUser(null);
      }
    } catch (e) {
      setError(e.message);
    }
  };
  const sendRequest = (
    url,
    method,
    requestBody = null,
    params = null,
    cb = null
  ) => {
    const userInfo = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    if (!userInfo) return false;
    setError(null);
    setLoading(true);
    const headerParams = userInfo
      ? {
          Authorization: `Bearer ${userInfo?.token}`,
        }
      : null;
    let apiRequestHandler = null;
    const paramsOp = params
      ? Object.keys(params)
          .map((el) => `${el}=${params[el]}`)
          .reduce((el, acc) => `${el}&${acc}`)
      : null;
    const urlWithParams = params ? `${url}?${paramsOp}` : url;
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
        apiRequestHandler = ApiService.deleteRequest(
          urlWithParams,
          headerParams
        );
        break;
      default:
        apiRequestHandler = ApiService.getRequest(urlWithParams, headerParams);
    }
    setLoading(false)
    // apiRequestHandler
    //   .then((res) => res.data)
    //   .then((res) => {
    //     setResponseBody(Object.assign({}, responseBody, res || {}));
    //     if (typeof cb === "function") cb();
    //   })
    //   .catch((err) => {
    //     const errMessage = err?.response?.data?.message
    //       ? err.response.data.message
    //       : err.message;
    //     if (errMessage === "jwt expired") {
    //       // handleRefreshToken(userInfo?.refreshToken, () =>
    //       //   sendRequest((url, method, headerParams, requestBody, params))
    //       // );
    //     } else {
    //       setError(errMessage);
    //     }
    //   })
    //   .finally(() => setLoading(false));
  };

  return {
    error,
    data,
    loading,
    sendRequest,
  };
};

export default useAuthorizedApiHook;
