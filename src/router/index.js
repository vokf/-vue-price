import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [{
    path: '/',
    redirect: '/login'
}, {
    path: '/login',
    component: () => import('../components/Login')
}, {
    path: '/index',
    component: () => import('../components/Index'),
    children: [
        {
            path: 'shoe',
            component: () => import("../components/Shoe")

        }, {
            path: 'user',
            component: () => import("../components/User")
        }
    ]

}, {
    path: '/register',
    component: () => import('../components/Register')
}
]
const router = new VueRouter({
    routes
})

export default router
