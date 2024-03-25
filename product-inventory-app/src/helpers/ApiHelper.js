import axios from 'axios';
import swal from 'sweetalert';

const BASE_URL = process.env.REACT_APP_API_URL;

// Function to Get data
export const fetchData = async (endpoint, headers) => {
    try {
        const response = await axios.get(`${BASE_URL}/${endpoint}`, headers);
        return response.data;
    } catch (error) {
        const errorMessage = error.response ? error.response.data.error : error.message;
        swal({
            title: "Error!",
            text: errorMessage,
            icon: "error",
            button: "Ok!",
        });
    }
};

// Function to Create data
export const createData = async (endpoint, newData, headers) => {
    try {
        const response = await axios.post(`${BASE_URL}/${endpoint}`, newData, headers);
        return response.data;
    } catch (error) {
        const errorMessage = error.response ? error.response.data.error : error.message;
        swal({
            title: "Error!",
            text: errorMessage,
            icon: "error",
            button: "Ok!",
        });
    }
};


// Function to Update data
export const updateData = async (endpoint, updatedData, headers) => {
    try {
        const response = await axios.put(`${BASE_URL}/${endpoint}`, updatedData, headers);
        return response.data;
    } catch (error) {
        const errorMessage = error.response ? error.response.data.error : error.message;
        swal({
            title: "Error!",
            text: errorMessage,
            icon: "error",
            button: "Ok!",
        });

    }
};

// Function to Delete data
export const deleteData = async (endpoint, headers) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${endpoint}`, headers);
        return response.data;
    } catch (error) {
        const errorMessage = error.response ? error.response.data.error : error.message;
        swal({
            title: "Error!",
            text: errorMessage,
            icon: "error",
            button: "Ok!",
        });

    }
};
