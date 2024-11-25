import axios from "axios";

axios.defaults.baseURL = "https://localhost:7045/api";

export const requestHandler = async ({
    method = "GET",
    route,
    body,
    includeHeaders = true,
    customHeaders,
}) => {
    if (!route) throw new Error("URL required");

    axios.defaults.headers.authorization = includeHeaders
        ? `Bearer ${ localStorage.getItem("token") }`
        : "";

try {
    const response = await axios.request({
        method,
        url: route,
        data: body,
        headers: {
            ...(includeHeaders && { 'Content-Type': 'application/json' }),
            ...customHeaders,
        },
    });

    return response.data;
} catch (error) {
    return error
}
};
