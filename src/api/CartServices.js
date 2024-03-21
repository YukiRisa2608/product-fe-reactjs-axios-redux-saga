import { instance } from ".";

const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcxMTAyOTA1OSwiZXhwIjoxNzExMDMyNjU5fQ.rh93o_LOHtmoGusri5bl5Pv4zlwPd99nL7vnz6xu3ramVkhylxeME1o1Q0dgGGRTQurHMgXSMEQknG4MJUa9Nw"

//get cart product
export const getCartInfo = async () => {
    let response = await instance.request({
        method: "GET",
        baseURL: "http://localhost:8081/api.com/v2/",
        url: 'customer/carts',
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    return response.data;
};

//get cart product
export const updateQuantity = async (payload) => {
    let response = await instance.request({
        method: "POST",
        baseURL: "http://localhost:8081/api.com/v2/",
        url: 'customer/carts',
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: payload
    });

    return response.data;
};


//get cart product
export const purchase = async () => {
    let response = await instance.request({
        method: "POST",
        baseURL: "http://localhost:8081/api.com/v2/",
        url: 'customer/carts/purchase',
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    return response.data;
};