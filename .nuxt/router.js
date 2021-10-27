import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7b3fd6b7 = () => interopDefault(import('../pages/createRoom.vue' /* webpackChunkName: "pages/createRoom" */))
const _e16b5858 = () => interopDefault(import('../pages/loginRoom.vue' /* webpackChunkName: "pages/loginRoom" */))
const _78560830 = () => interopDefault(import('../pages/waitRoom.vue' /* webpackChunkName: "pages/waitRoom" */))
const _9fd48c7c = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/createRoom",
    component: _7b3fd6b7,
    name: "createRoom"
  }, {
    path: "/loginRoom",
    component: _e16b5858,
    name: "loginRoom"
  }, {
    path: "/waitRoom",
    component: _78560830,
    name: "waitRoom"
  }, {
    path: "/",
    component: _9fd48c7c,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
