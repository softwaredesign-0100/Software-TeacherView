import {request_post} from "../../api/request_api";

import Vue from 'vue'
import axios from 'axios'


const app = {
    state: {
        message_box: {
            'type': 'error',
            'message': '',
            duration: 3000
        }
    },

    mutations: {
        show_message(state, payload) {
            switch (payload.status) {
                case 200:
                    state.message_box.message = '成功了……'
                    state.message_box.type = 'success'
                    break
                case 201:
                    state.message_box.message = '网络错误！请稍后重试'
                    break
                case 500:
                    state.message_box.message = 'error 500!'
                    break
                case 404:
                    state.message_box.message = '该用户不存在，请您注册后再登陆……'
                    break
                case 400:
                    state.message_box.message = '重复！'
                    break
                case 402:
                    state.message_box.message = '您填写的信息太长了……'
                    break
                case 403:
                    state.message_box.message = '密码错误……'
                    break
                default:
                    state.message_box.message = 'happy'
            }
        }
    },

    actions: {
        post_data: ({commit}, info) => {
            console.log('api: ', info.api, 'data: ', info.data)
            return new Promise((resolve, reject) => {
                request_post(info.api, info.data).then((response) => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
}

export default app