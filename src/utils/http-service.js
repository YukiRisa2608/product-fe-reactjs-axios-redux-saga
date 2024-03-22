import axios from 'axios';
import storageService from './storage.service';
import {token} from "../api";

export default class HttpService {

    async get(uri, options = { headers: {}, params: {}, body: {} }) {
        console.log("Mehtod get, uri = ", uri)
        try {
            return await this.request('GET', uri, options);
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async post(uri, options = { headers: {}, params: {}, body: {} }) {
        try {
            return await this.request('POST', uri, options);
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async patch(uri, options = { headers: {}, params: {}, body: {} }) {
        try {
            return await this.request('PATCH', uri, options);
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async delete(uri, options = { headers: {}, params: {}, body: {} }) {
        try {
            return await this.request('DELETE', uri, options);
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async request(method, uri, options = { headers: {}, params: {}, body: {} }) {
        let whiteList = [];
        console.log("Call request")
        // if (whiteList.filter((item) => uri.includes(item)).length > 0 || storageService.get('accessToken')) {
        return await axios.request({
            method: method,
            baseURL: "http://localhost:8081/api.com/v2/",
            url: uri,
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
            // Authorization: `Bearer ${storageService.get('accessToken')}`,
            Authorization: `Bearer ${token}`
        };

        if (headerInfo) {
            for (const item of Object.keys(headerInfo)) {
                headers[item] = headerInfo[item];
            }
        }
        return headers;
    }
}
