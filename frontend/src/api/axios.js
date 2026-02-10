import axios from "axios";

console.log("Current API URL:", "https://task-contact-manager.onrender.com/api");

const API = axios.create({
  baseURL:"https://task-contact-manager.onrender.com/api"
});

// Token attach 

API.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
});

export default API;