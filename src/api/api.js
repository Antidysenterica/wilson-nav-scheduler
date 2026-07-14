import axios from "axios";

const API = axios.create({
    baseURL:"https://wilson-nav-backend.onrender.com/api/buildings"

});

export default API;
