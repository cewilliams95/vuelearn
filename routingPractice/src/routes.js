import User from './components/user/User.vue';
import Home from './components/Home.vue';
import UserStart from './components/user/userStart.vue';
import UserEdit from './components/user/userEdit.vue';
import UserDetail from './components/user/userDetail.vue';
import Header from './components/Header.vue';

export const routes = [
    { path: '', components: {
        default: Home,
        'header-top': Header
    } },
    { path: '/user', components: {
            default: User,
            'header-bottom': Header
        }, 
        children: [
            {path: '', component: UserStart},
            {path: ':id', component: UserDetail},
            {path: ':id/edit', component: UserEdit, name: 'userEdit'}
    ] },
    { path: '/redirect-me', redirect: '/user'}
];