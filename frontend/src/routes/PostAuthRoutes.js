import { lazy } from "react"

const Home = lazy(() => import('../pages/Home.page'));
const NewsFields = lazy(() => import('../pages/NewsFields.page'));
const NewsArticles = lazy(() => import('../pages/NewsArticles.page'));
const About = lazy(() => import('../pages/About.page'));
const Contact = lazy(() => import('../pages/Contact.page'));
const NotFound = lazy(() => import('../pages/Page404.page'));

const PostAuthroutes = [
    {
        name: 'Home',
        path: '/',
        exact: true,
        component: Home,
        authentication: false,
        theme: "theme-1"
    },
    {
        name: 'News fields',
        path: '/news/news-fields',
        exact: true,
        component: NewsFields,
        authentication: false,
        theme: "theme-1"
    },
    {
        name: 'News Articles',
        path: '/news/news-articles',
        exact: true,
        component: NewsArticles,
        authentication: false,
        theme: "theme-1"
    },
    {
        name: 'About',
        path: '/about',
        exact: true,
        component: About,
        authentication: false,
        theme: "theme-1"
    },
    {
        name: 'Contact',
        path: '/contact',
        exact: true,
        component: Contact,
        authentication: false,
        theme: "theme-1"
    },
    {
        name: 'NotFound',
        path: '/*',
        exact: false,
        component: NotFound,
        authentication: false,
    }
];

export default PostAuthroutes;