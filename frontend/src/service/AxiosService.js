import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:8080/uptime";

const api = axios.create({
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
    }
});

const getHeaders = (url) => {
    const token = localStorage.getItem("jwtToken");

    // Don't add Authorization header for login/signup requests
    if (!url.includes("/public/login") && !url.includes("/public/signup")) {
        if (token) {
            return { Authorization: `Bearer ${token}` };
        } else {
            console.warn("No JWT token found. Redirect manually inside your component if needed.");            
        }
    }

}

const axiosService = {
    get: async(endpoint, data) => {
        try {
            const url = baseUrl + endpoint;
            const response = await api.get(url, data, {
                headers: getHeaders(url),
            });
            return response;
        } catch (error) {
            console.error("GET request error:", error);
            throw error;
        }
    },

    post: async(endpoint, data) => {
        try {
            const url = baseUrl + endpoint;
            const response = await api.post(url, data, {
                headers: getHeaders(url),
            });
            return response;
        } catch (error) {
            console.error("POST request error:", error);
            throw error;
        }
    },

    put: async(endpoint, data) => {
        try {
            const url = baseUrl + endpoint;
            const response = await api.put(url, data, {
                headers: getHeaders(url),
            });
            return response;
        } catch (error) {
            console.error("PUT request error:", error);
            throw error;
        }
    },

    delete: async(endpoint, data) => {
        try {
            const url = baseUrl + endpoint;
            const response = await api.delete(url, data, {
                headers: getHeaders(url),
            });
            return response;
        } catch (error) {
            console.error("DELETE request error:", error);
            throw error;
        }
    }
}

export default axiosService;

