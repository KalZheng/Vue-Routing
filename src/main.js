import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue'
import UsersList from './components/users/UsersList.vue'
import TeamMembers from './components/teams/TeamMembers.vue'
import NotFound from './components/nav/NotFound.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/teams' },
        // or use alias but alias will not change url
        // { path: '/teams', component: TeamsList, alias: '/' },
        {
            //nested routes for display different part to be display
            path: '/teams', component: TeamsList, children: [
                { path: ':teamId', component: TeamMembers, props: true },//teams/t1
            ]
        },
        { path: '/users', component: UsersList },
        // props: true allows the :teamId to pass as props instead of $route variable
        // { path: '/teams/:teamId', component: TeamMembers, props: true },
        { path: '/:notFound(.*)', component: NotFound },
    ],
});

const app = createApp(App)

app.use(router);

app.mount('#app');
