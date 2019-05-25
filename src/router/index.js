import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '../pages/Home'
import myFile from '@/components/myFiles'
import Sidebar from '@/components/Sidebar'
import changePassword from '../pages/changePassword'
import showRes from '../pages/showRes'
// import seekRes from '../pages/seekRes'
import publishRes from '../pages/publishRes'
import publishExam from '../pages/publishExam'
import hisRes from '../pages/hisRes'
import hisExam from '../pages/hisExam'
import showExam from '../pages/showExam'
import personInfo from '../pages/personInfo'
import cal from '../pages/cal'

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
                    path: '/publishRes',
                    component: publishRes
                },
                {
                    path: '/publishExam',
                    component: publishExam
                },
                {
                    path: '/hisRes',
                    component: hisRes
                },
                {
                    path: '/hisExam',
                    component: hisExam
                },
                {
                    path: '/showExam',
                    component: showExam
                },
                {
                    path: '/personInfo',
                    component: personInfo
                },
                {
                    path: '/cal',
                    component: cal
                }
            ]
        }
    ]
})
