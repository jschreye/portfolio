import { createRouter, createWebHistory } from 'vue-router'
import store  from '../store';
import HomeView from '../views/HomeView.vue'
import UsersView from '../views/UsersView.vue'
import ProfileUserView from '../views/ProfileUserView.vue'
import ProfileUserMeView from '../views/ProfileUserMeView.vue'
import DashBoardChat from '../views/DashBoardChatView.vue'
import CreateChan from '../views/CreateChanView.vue'
import ChanView from '../views/ChatView.vue'
import PlayView from '../views/PlayView.vue'
import PlayStartView from '../views/PlayStartView.vue'
import CreatePrivChan from '../views/CreatePrivChanView.vue'
import ErrorView from '../views/ErrorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorView
    },
    {
      path: '/register',
      name: 'register',
      component: HomeView
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView
    },
    {
      path: '/Play',
      name: 'play',
      component: PlayView,
    },
    {
      path: '/Play/start',
      name: 'playStart',
      component: PlayStartView,
    },
    {
      path: '/profile/user',
      name: 'profileUser',
      component: ProfileUserView,
    },
    {
      path: '/profile/me',
      name: 'profileUserMe',
      component: ProfileUserMeView,
    },
    {
      path: '/dashBoardChat',
      name: 'dashBoardChat',
      component: DashBoardChat,
    },
    {
      path: '/CreateChan',
      name: 'CreateChan',
      component: CreateChan,
    },
    {
      path: '/CreatePrivChan',
      name: 'CreatePrivChan',
      component: CreatePrivChan,
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChanView,
    },
  ]
})

router.beforeEach((to, from, next) => {
  if(to.name !== 'home' && to.name !== 'register')
  {
    if(store.getters.getToken){
      next();
    }
    else {
      next({ name: 'register' });
    }
  }
  else
  {
    next();
  }
})
export default router
