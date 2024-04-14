// const LoadingIndividualBlogPosts = (navigate) => {
//   const appContext = useContext(AppContext);
//   const [error, setError] = useState(null);
//   const [apiData, setApiData] = useState([]);
//   const data = useMemo(() => apiData, [apiData]);
//   const [loading, setLoading] = useState(true);
//   const refreshToken = (refresh_token) => {
//     return ApiService.postRequest("v1/auth/refresh-token", null, {
//       Authorization: `Bearer ${refresh_token}`,
//     })
//       .then((res) => res.data)
//       .catch((e) => {
//         console.log(e.message);
//         return null;
//       });
//   };
//   const handleRefreshToken = async (refreshTokenValue, cb) => {
//     try {
//       const refreshTokenResponse = await refreshToken(refreshTokenValue);
//       console.log('refreshTokenResponse :', refreshTokenResponse)
//       const { token } = refreshTokenResponse ? refreshTokenResponse : {};
//       console.log('token :', token)

//       if (token) {
//         localStorage.setItem("user", JSON.stringify(refreshTokenResponse));
//         cb();
//       } else {
//         appContext.setCurrentUser(null);
//         navigate("/login");
//       }
//     } catch (e) {
//       setError(e.message);
//     }
//   };
//   const handleChangeVisibility = (postId, visibility, skip, limit) => {
//     setError(null);
//     setLoading(true);
//     const userInfo = localStorage.getItem("user")
//       ? JSON.parse(localStorage.getItem("user"))
//       : null;
//     const headersInfo = userInfo
//       ? {
//           Authorization: `Bearer ${userInfo?.token}`,
//         }
//       : null;
//     ApiService.postRequest(
//       "/v1/post/update-visibility",
//       {
//         postId,
//         visibility
//       },
//       headersInfo
//     )
//       .then(() => {
//         getAllPosts(skip, limit);
//       })
//       .catch(async (err) => {
//         const errMessage = err?.response?.data?.message
//           ? err.response.data.message
//           : err.message;
//         console.log('errMessage :', errMessage)
//         if (errMessage === "jwt expired") {
//           handleRefreshToken(
//             userInfo?.refreshToken,
//             () => handleChangeVisibility(postId, visibility, skip, limit)
//           );
//         } else {
//           setError(errMessage);
//         }
//       })
//       .finally(() => setLoading(false));
//   };
//   const getAllPosts = (skip, limit) => {
//     setError(null);
//     setLoading(true);
//     const userInfo = localStorage.getItem("user")
//       ? JSON.parse(localStorage.getItem("user"))
//       : null;
//     const headersInfo = userInfo
//       ? {
//           Authorization: `Bearer ${userInfo?.token}`,
//         }
//       : null;
//     ApiService.getRequest(
//       `/v1/post/by-author/?skip=${skip}&limit=${limit}`,
//       headersInfo
//     )
//       .then((res) => res.data)
//       .then((res) => {
//         setApiData(res);
//       })
//       .catch(async (err) => {
//         const errMessage = err?.response?.data?.message
//           ? err.response.data.message
//           : err.message;
//         const statusCode = err?.response?.status
//         if (statusCode === 401 && errMessage === "jwt expired") {
//           handleRefreshToken(userInfo?.refreshToken, () => getAllPosts(skip, limit));
//         } else if (statusCode === 401) {
//           appContext.setCurrentUser(null);
//           navigate("/login");
//         } else {
//           setError(errMessage);
//         }
//       })
//       .finally(() => setLoading(false));
//   };

//   return {
//     error,
//     data,
//     loading,
//     getAllPosts,
//     handleChangeVisibility,
//   };
// };