import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue'
import UsersList from './components/users/UsersList.vue'
import TeamMembers from './components/teams/TeamMembers.vue'
import NotFound from './components/nav/NotFound.vue'
import TeamsFooter from './components/teams/TeamsFooter'
import UsersFooter from './components/users/UsersFooter'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/teams' },
        // or use alias but alias will not change url
        // { path: '/teams', component: TeamsList, alias: '/' },
        {
            //nested routes for display different part to be display
            name: 'teams', path: '/teams',
            // component: TeamsList,
            components: { default: TeamsList, footer: TeamsFooter },
            children: [
                { name: 'team-members', path: ':teamId', component: TeamMembers, props: true },//teams/t1
            ]
        },
        {
            path: '/users',
            // component: UsersList
            components: { default: UsersList, footer: UsersFooter },
            //individual guard/hook
            beforeEnter(to, from, next){
                console.log('user BeforeEnter');
                console.log(to, from);
                next();
            },
        },
        // props: true allows the :teamId to pass as props instead of $route variable
        // { path: '/teams/:teamId', component: TeamMembers, props: true },
        { path: '/:notFound(.*)', component: NotFound },
    ],
    //change name for default active class
    //linkActiveClass: 'active'// TheNavigation:53
    // scrollBehavior(to, from, savedPosition) {
    scrollBehavior(_, _2, savedPosition) {
        // console.log(to, from, savedPosition);
        if (savedPosition) {
            return savedPosition;
        }
        return { left: 0, top: 0 };
    }
});

// this is for all,
router.beforeEach((to, from, next) => {
    console.log('Global BeforeEach');
    console.log(to, from);
    //the if is just to proof test
    // if (to.name === 'team-members') {
    //     next();
    // } else {
    //     next({ name: 'team-members', params: { teamId: 't2' } });
    // }
    next();
});

const app = createApp(App)

app.use(router);

app.mount('#app');
