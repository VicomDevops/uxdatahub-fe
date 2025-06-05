import axios from "axios";
import { toast } from "react-toastify";


axios.interceptors.response.use(
  (response) => {
    // Si la réponse a un statut 200 et un code spécifique 331 => session expire
    if (response.status === 200) {
      if (response.data?.header?.code === 331) {
        toast.error("Session expired. Please login again.");
        setTimeout(() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        },1000)
      }
    }

    return response;
  },
  (error) => {
    // Si la requête a un statut different de 200
    if (error.response) {
      const status = error.response.status;

      if (status === 404) {
        toast.error("Data not found.");
      } else if (status === 403) {
        toast.error("Forbidden error: " + error.response.data.message);
      }else if (status === 401) {
        if (error.response.data.message === "Invalid JWT Token" || error.response.data.message === "Expired JWT Token") {
          if(localStorage.getItem("token") !==''){
            toast.error("Token expired. Please login again.");
            setTimeout(() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            },1000)
          }
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    } else if (error.request) {
      toast.error("No response received from the server.");
    } else {
      toast.error("Error setting up the request.");
    }

    return Promise.reject(error);
  }
);

/*
axios.interceptors.request.use(config => {
  config.headers['Authorization'] = getToken();
  if(process.env.REACT_APP_ENVIRONMENT === 'local') console.log('Request made with:', config);
  return config;
}, error => {
  return Promise.reject(error);
});
*/


/**
 * Met  jour le token d'authentification par défaut de Axios.
 * Si le token est disponible dans le localStorage, il est ajout  aux headers de requéte.
 * Sinon, il est retir  (par exemple, si l'utilisateur se d  connecte).
 */
function setToken() { 
  if (getToken()) axios.defaults.headers.common["Authorization"] = getToken();
  else delete axios.defaults.headers.common["Authorization"];
} 


/**
 * Renvoie le token de l'utilisateur enregistr  dans le localStorage,
 * ou null si le localStorage n'est pas accessible ou si le token n'existe pas.
 * 
 * @returns {string|null} Le token de l'utilisateur, ou null si une erreur survient.
 */
const getToken = () =>{
  try {
      // Vérification si localStorage est accessible
      if (typeof localStorage === 'undefined') {
          console.warn('localStorage is not available');
          return null;
      }
      const tokenKey = "token";
      const token = localStorage.getItem(tokenKey);

      // Vérifier si un token est trouvé et le renvoyer, sinon renvoyer null
      return `${token}` || null;
  } catch (error) {
      // En cas d'erreur (par exemple, si localStorage est désactivé ou inaccessible)
      console.error('Error reading from localStorage:', error);
      return null;
  }
}

/**
 * Returns the Authorization header with the token from local storage.
 *
 * @returns {Object} - The Authorization header object with a Bearer token.
 */
const getAuthorization = () => {
  return { Authorization: `Bearer ${getToken()}` };
}

//ENDPOINTS
const HttpServices = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setToken,
  getAuthorization,
  getToken
};

//EXPORT ENDPOINTS
const httpServices = HttpServices;
export default httpServices;