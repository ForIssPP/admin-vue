import { richpapaRequestLogin, logout, richpapaRequestGetInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { parseMenuList } from '@/utils'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, verifyCode } = userInfo;
    return new Promise((resolve, reject) => {
      richpapaRequestLogin({
        account: username.trim(),
        pwd: password,
        verify_code: verifyCode
      })
        .then(response => {
          const { token, nickname, avatar, introduction } = response;
          commit('SET_TOKEN', token);
          commit('SET_AVATAR', avatar || "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif")
          commit('SET_NAME', nickname || "Admin")
          commit('SET_INTRODUCTION', introduction || "无简介")
          setToken(token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) =>
      richpapaRequestGetInfo(state.token).then(data => {
        // const { data } = response
        console.log(data);
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { menu } = data
        // const { roles } = data

        const roles = parseMenuList(menu)
        console.log(roles);
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        resolve({ roles })
      }).catch(error => {
        reject(error)
      })
    )
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
