import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/uptime';

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
}
});

const setHeader = () => {
    const AUTH_TOKEN = localStorage.getItem("jwtToken");
    instance.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;
}

export const signup = async ({username, email, password}) => {
    try {
      const response = await instance.post('/public/signup', {username, email, password});
      return response.data;
    } catch (error) {
      console.error('Error creating user: ', error);
      throw error;
    }
  };

export const login = async ({username, password}) => {
  try {
    const response = await instance.post('/public/login', {username, password});
    return response.data;
  } catch (error) {
    console.error('Error logging in user: ', error);
    throw error;
  }
};

export const createMonitor = async (monitorData) => {
    setHeader();
    await instance.post('/monitor/createMonitor', monitorData)
        .then(response => {
            console.log("Monitor created successfully", response);
            return response;
        })
        .catch(error => {
            throw error;
        })
    
};

export const getAllMonitors = async () => {
    setHeader();
    try {
        const response = await instance.get('/monitor/getAllMonitors');
        return response.data;
      } catch (error) {
        console.error('Error logging in user: ', error);
        throw error;
      }
}

export const getAllMonitorLogs = async (monitorId) => {
  setHeader();
  try {
      const response = await instance.get(`/monitor/getAllMonitorLog/${monitorId}`);
      return response.data;
    } catch (error) {
      console.error('Error in fetching logs: ', error);
      throw error;
    }
}

export const deleteMonitor = async (monitorId) => {
  setHeader();
  try {
    console.log(monitorId);
      const response = await instance.get(`/monitor/deleteMonitor/${monitorId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting monitor: ', error);
      throw error;
    }
}

export const getStats = async (monitorId) => {
  try {
    console.log(monitorId);
      const response = await instance.get(`/logs/stats/${monitorId}`);
      return response.data;
    } catch (error) {
      console.error('Error in getting stats: ', error);
      throw error;
    }
}

export const getDowntime = async (monitorId) => {
  try {
    console.log(monitorId);
      const response = await instance.get(`/logs/down/${monitorId}`);
      return response.data;
    } catch (error) {
      console.error('Error in getting stats: ', error);
      throw error;
    }
}