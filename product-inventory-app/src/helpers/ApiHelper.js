import axios from 'axios';
import swal from 'sweetalert';

const BASE_URL = process.env.REACT_APP_API_URL;

// Function to Get data
export const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(`${BASE_URL}/${endpoint}`);
        return response.data;
    } catch (error) {
        swal({
            title: "Error!",
            text: (error.response && error.response.data && error.response.data.message) ? error.response.data.message : error.response,
            icon: "error",
            button: "Ok!",
        });
    }
};

// Function to Create data
export const createData = async (endpoint, newData) => {
    try {
        const response = await axios.post(`${BASE_URL}/${endpoint}`, newData);
        return response.data;
    } catch (error) {
        // Extract error message from the error object
        const errorMessage = error.response ? error.response.data.error : error.message;

        // Display SweetAlert with the error message
        swal({
            title: "Error!",
            text: errorMessage,
            icon: "error",
            button: "Ok!",
        });
        // Throw error to propagate it further if needed
    }
};


// Function to Update data
export const updateData = async (endpoint, updatedData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${endpoint}`, updatedData);
        return response.data;
    } catch (error) {
        swal({
            title: "Error!",
            text: error,
            icon: "error",
            button: "Ok!",
        });

    }
};

// Function to Delete data
export const deleteData = async (endpoint) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${endpoint}`);
        return response.data;
    } catch (error) {
        swal({
            title: "Error!",
            text: error,
            icon: "error",
            button: "Ok!",
        });

    }
};
