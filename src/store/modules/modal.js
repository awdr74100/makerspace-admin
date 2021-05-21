export default {
  namespaced: true,
  state: {
    cache: {},
  },
  mutations: {
    OPEN_MODAL(state, { modal }) {
      this._vm.$modal.show(modal);
    },
    CLOSE_MODAL(state, { modal }) {
      this._vm.$modal.hide(modal);
    },
    SET_MODAL_CACHE(state, { cache }) {
      state.cache = cache;
    },
  },
};
