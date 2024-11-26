import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
});


axiosInstance.interceptors.request.use(
    (config) => {
      const email = localStorage.getItem("email");
      const password = localStorage.getItem("password");
  
      if (email && password) {
        const encodedCredentials = btoa(`${email}:${password}`);
        config.headers.Authorization = `Basic ${encodedCredentials}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  export const uploadFile = async (studentEmail, file) => {
    if (!studentEmail) {
      throw new Error("Student email is required to upload the file");
    }
 
    const formData = new FormData();
    formData.append("file", file); 
  
    return axiosInstance.post(`/upload/${studentEmail}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });
  };


export const getTaskDetail = async (studentEmail, taskId) => {
  return axiosInstance.get(`/task/${studentEmail}/${taskId}`);
};

export const updateTask = async (studentEmail, taskId, taskData) => {
  return axiosInstance.post(`/task/update/${studentEmail}/${taskId}`, taskData);
};

export const getAllTasks = async (studentEmail) => {
  return axiosInstance.get(`/tasks/${studentEmail}`);
};

export const sortTasksByDueDate = async (studentEmail, order) => {
  return axiosInstance.get(`/tasks/sort-due-date/${studentEmail}`, {
    params: { order },
  });
};

export const sortTasksByEntryDate = async (studentEmail, order) => {
  return axiosInstance.get(`/tasks/sort-entry-date/${studentEmail}`, {
    params: { order },
  });
};

export const filterTasksByCategory = async (studentEmail, filters) => {
  return axiosInstance.get(`/tasks/filter-tasks/${studentEmail}`, {
    params: filters,
  });
};

export const registerUser = async (userData) => {
  return axiosInstance.post(`/api/signup/`, userData);
};

export const loginUser = async (userData) => {
  return axiosInstance.post(`/api/signin/`, userData);
};

export const publishEvent = async (eventData) => {
  return axiosInstance.post(`/api/publish-event/`, eventData);
};

export const updateEventStatus = async (eventId, statusData) => {
    return axiosInstance.patch(`/api/update-event-status/${eventId}/status`, statusData);
  };

export const listEvents = async (sortParam) => {
  return axiosInstance.get(`/api/list-events/`, {
    params: { sort: sortParam },
  });
};

export const filterEventsByCategory = async (category) => {
  return axiosInstance.get(`/api/filter-events/`, {
    params: { category },
  });
};


/**
 * Generate SQL query from natural language input
 * @param {string} userInput - The natural language query.
 * @returns {Promise} - Axios response with generated SQL query.
 */
export const generateSQL = async (userInput) => {
  if (!userInput) {
    throw new Error("'user_input' is required.");
  }

  return axiosInstance.post(`/api/generate-sql/`, { user_input: userInput }, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Execute SQL query on the connected database
 * @param {string} sqlQuery - The SQL query to execute.
 * @returns {Promise} - Axios response with query execution result.
 */
export const executeSQL = async (sqlQuery) => {
  if (!sqlQuery) {
    throw new Error("'sql_query' is required.");
  }

  return axiosInstance.post(`/api/execute-sql/`, { sql_query: sqlQuery }, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};