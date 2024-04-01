import axios from 'axios';
import storageService from './storage.service';
import { AuthKeys } from './constant';

export default class HttpService {

    async get(uri, options = { headers: {}, params: {}, body: {} }) {
        console.log("Mehtod get, uri = ", uri)
        try {
            return await this.request('GET', uri, options);
        } catch (error) {
            return error.response
        }
    }

    async post(uri, options = { headers: {}, params: {}, body: {} }) {
        try {
            return await this.request('POST', uri, options);
        } catch (error) {
            return error.response
        }
    }

    async patch(uri, options = { headers: {}, params: {}, body: {} }) {
        try {
            return await this.request('PATCH', uri, options);
        } catch (error) {
            return error.response
        }
    }

    async delete(uri, options = { headers: {}, params: {}, body: {} }) {
        try {
            return await this.request('DELETE', uri, options);
        } catch (error) {
            return error.response
        }
    }

    async put(uri, options = { headers: {}, params: {}, body: {} }) {
        try {
            return await this.request('PUT', uri, options);
        } catch (error) {
            return error.response
        }
    }

    async request(method, uri, options = { headers: {}, params: {}, body: {} }) {
        let whiteList = [];
        console.log("Call request")
        // if (whiteList.filter((item) => uri.includes(item)).length > 0 || storageService.get('accessToken')) {
        return await axios.request({
            method: method,
            baseURL: "http://localhost:8081/api.com/v2/",
            url: uri,//Khi hàm request được gọi, uri được nối với baseURL để tạo thành URL đầy đủ mà axios sử dụng để thực hiện yêu cầu. 
            headers: this.generateHttpHeaders(options.headers),
            params: options.params,
            data: options.body,
        });
        // } else {
        //     window.location = '/login';
        // }
    }

    generateHttpHeaders(headerInfo) {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storageService.get(AuthKeys.ACCESS_TOKEN)}`,
        };

        if (headerInfo) {
            for (const item of Object.keys(headerInfo)) {
                headers[item] = headerInfo[item];
            }
        }
        return headers;
    }
}
