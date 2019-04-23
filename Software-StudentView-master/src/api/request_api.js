import Vue from 'vue'
import axios from 'axios'


export function request_post(api, data) {
    console.log('request.js: request_post')
    console.log('api: ', api, 'data: ', data)
    return axios.post(api, data)
}

export function requese_get(api, data) {
    console.log('request.js, request_get')
    console.log('api: ', api, 'data: ', data)
    return axios.get(api, data)
}