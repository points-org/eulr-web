import {
    createRouter,
    createWebHashHistory
} from 'vue-router'


const IndexChildren = [
    {
        path: '/dataSource',
        name: 'DataSource',
        component: () => import('@/components/DataSource'),
        meta: {
            title: 'Data Source'
        }
    },
    {
        path: '/table',
        name: 'Table',
        component: () => import('@/components/Table'),
        meta: {
            title: 'Table'
        }
    },
    {
        path: '/sqlEditor',
        name: 'SqlEditor',
        component: () => import('@/components/SqlEditor'),
        meta: {
            title: 'Sql Editor'
        }
    },
    {
        path: '/imageUpload',
        name: 'ImageUpload',
        component: () => import('@/components/ImageUpload'),
        meta: {
            title: '新闻动态'
        }
    },
    {
        path: '/developHistory',
        name: 'DevelopHistory',
        component: () => import('@/components/DevelopHistory'),
        meta: {
            title: '发展历程'
        }
    },
    {
        path: '/shareReport',
        name: 'shareReport',
        component: () => import('@/components/ShareReport'),
        meta: {
            title: 'Share Report'
        }
    },
    {
        path: '/auditLog',
        name: 'auditLog',
        component: () => import('@/components/AuditLog'),
        meta: {
            title: 'Audit Log'
        }
    }
]
const routes = [
    {
        path: '',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/components/Login'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/components/Register'),
    },
    {
        path: '/retrievePs1',
        name: 'retrievePs1',
        component: () => import('@/components/RetrievePs1'),
    },
    {
        path: '/retrievePs2',
        name: 'retrievePs2',
        component: () => import('@/components/RetrievePs2'),
    },
    {
        path: '/index',
        name: 'index',
        redirect: '/imageUpload',
        component: () => import('@/components/Index'),
        children: IndexChildren
    }
]

const history = createWebHashHistory()

const router = createRouter({
    history,
    routes
})

export default router
