import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://newsdata.io/api/1", 
    timeout: 10000,
})


apiClient.interceptors.request.use(
    async config =>{
        // const API_KEY = "adadasdas ddasdasdasdas"
        // const API_KEY = "pub_39e88c71eab446ce96858705b2695309"
        const API_KEY = "pub_51a5cd29cca7431f83deb14ff7dc848c."
        config.params = {
            ...config.params ,
            apikey: API_KEY,
        }
        console.log(" Config is : " , config);
        return config;
    },
    error => {
        Promise.reject(error);
    }
    
)


apiClient.interceptors.response.use(
    response => {
        console.log(response)
        return response} ,
    error =>{
        console.log("API Error:", error);
        return Promise.reject(error);
    }
)



export default apiClient;