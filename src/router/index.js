import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '../pages/Home'
import myFile from '@/components/myFiles'
import Sidebar from '@/components/Sidebar'
import changePassword from '../pages/changePassword'
import showRes from '../pages/showRes'
import seekRes from '../pages/seekRes'
import publishRes from '../pages/publishRes'
import personInfo from '../pages/personInfo'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Homepage
        },
        {
            path: '/Main',
            component: Sidebar,
            children: [
                {
                    path: '/',
                    component: showRes,
                },
                {
                    path: '/changePassword',
                    component: changePassword
                },
                {
                    path: '/seekRes',
                    component: seekRes
                },
                {
                    path: '/publishRes',
                    component: publishRes
                },
                {
                    path: '/personInfo',
                    component: personInfo
                }
            ]
        }
    ]
})
