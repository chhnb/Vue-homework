import {createRouter, createWebHashHistory} from 'vue-router'


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
        path: "/",
        component: () => import('../components/start/login')
    },
        {
        path: "/register",
        component: () => import('../components/start/register')
    },{
        path:"/search",
            component:()=>import('../components/start/search')
        },
        {
            path : "/index",
            name : 'index',
            component : ()=>import("../components/occupant/index"),
            children:[
                {
                    path : "",
                    component: () => import("../components/start/logo.vue")
                },
                {
                    path : "changDor",
                    component: () => import("../components/occupant/change/changDor.vue")
                },
                {
                    path : "searchDor",
                    component: () => import("../components/occupant/search/searchDor.vue")
                },
                {
                    path : "searchElec",
                    component: () => import("../components/occupant/search/searchElec.vue")
                },
                {
                    path : "searchWater",
                    component: () => import("../components/occupant/search/searchWater.vue")
                },
                {
                    path : "payElec",
                    component: () => import("../components/occupant/pay/payElec.vue")
                },
                {
                    path : "payWater",
                    component: () => import("../components/occupant/pay/payWater.vue")
                },
                {
                    path : "newName",
                    component: () => import("../components/occupant/user/newName.vue")
                },
                {
                    path : "changePwd",
                    component: () => import("../components/occupant/user/changePwd.vue")
                },
                {
                    path : "cancelAccount",
                    component: () => import("../components/occupant/user/cancelAccount.vue")
                },
                {
                    path : "equRepair",
                    component: () => import("../components/occupant/repair/equRepair.vue")
                },
            ]
        },
        {
            path : "/housemaster",
            name : "housemaster",
            component : ()=>import("../components/housemaster/index"),
            children:[
                {
                    path : "",
                    component: () => import("../components/start/logo.vue")
                },
                {
                    path : "dorDistribute",
                    component: () => import("../components/housemaster/dormitory/dorDistribute.vue")
                },
                {
                    path : "applyRepair",
                    component: () => import("../components/housemaster/repair/applyRepair.vue")
                },
                {
                    path : "dorRepair",
                    component: () => import("../components/housemaster/repair/dorRepair.vue")
                },
                {
                    path : "equFeedback",
                    component: () => import("../components/housemaster/repair/equFeedback.vue")
                },
                {
                    path : "newName",
                    component: () => import("../components/housemaster/user/newName.vue")
                },
                {
                    path : "changePwd",
                    component: () => import("../components/housemaster/user/changePwd.vue")
                },
                {
                    path : "cancelAccount",
                    component: () => import("../components/housemaster/user/cancelAccount.vue")
                },
            ]
        },
        {
            path : "/admin",
            name : "admin",
            component : ()=>import("../components/admin/index"),
            children:[
                {
                    path : "",
                    component: () => import("../components/start/logo.vue")
                },
                {
                    path : "newName",
                    component: () => import("../components/admin/user/newName.vue")
                },
                {
                    path : "changePwd",
                    component: () => import("../components/admin/user/changePwd.vue")
                },
                {
                    path : "cancelAccount",
                    component: () => import("../components/admin/user/cancelAccount.vue")
                },
                {
                    path : "auditAccount",
                    component: () => import("../components/admin/user/auditAccount.vue")
                },
            ]
        }
    ]
})


router.beforeEach((to,from,next) => {
    if(to.path === '/register' || to.path === '/search' || to.path === '/'){ //若是进入登录与注册页面 ==> pass
        next()
    }else{
        let userToken = localStorage.getItem('token');
        console.log("Token为:"+userToken);
        if(userToken === null || userToken === ''){
            alert("无权限，请先登录!");
            return next('/');
        }else{
            next()
        }
    }

})


export default router