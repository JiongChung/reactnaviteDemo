import React from 'react';
import Storage from '../storage/DeviceStorage';

export default class HttpService {
    
    /**
     * 利用 Promise 的 get 方式请求
     * @param url
     * @returns {Promise}
    */

    static get(url, header){
        return new Promise((resolve, reject) => {
            fetch(url, {
                    method: 'GET',
                    headers: header
                })
                .then(response => response.json())
                .then(result => resolve(result))
                .catch(error => reject(error))
        })
    }

    /**
     * 利用 Promise 的 post 方式请求
     * @param url
     * @param params
     * @returns {Promise}
    */

    static post(url, header, params) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                mode: "cors",
                headers: header,
                body: JSON.stringify(params)
            })
            .then(response => response.json())
            .then(result => resolve(result))
            .catch(error => reject(error))
        })
    }

    /**
     * 利用 Promise 的 put 方式请求
     * @param url
     * @param params
     * @returns {Promise}
    */

    static put(url, header, params) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'PUT',
                headers: header,
                body: JSON.stringify(params)
            })
            .then(response => response.json())
            .then(result => resolve(result))
            .catch(error => reject(error))
        })
    }

    /**
     * 利用 Promise 的 delete 方式请求
     * @param url
     * @returns {Promise}
    */

    static delete(url, header){
        return new Promise((resolve, reject) => {
            fetch(url,{
                    method: 'DELETE',
                    headers: header,
                })
                .then(response => response.json())
                .then(result => resolve(result))
                .catch(error => reject(error))
        })
    }
}