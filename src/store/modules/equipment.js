import axios from 'axios';

export default {
  namespaced: true,
  state: {
    equipment: [],
  },
  actions: {
    async getEquipment({ commit }) {
      const url = `${
        import.meta.env.VITE_APP_BACKEND_URL
      }/api/equipment?detail=true`;

      try {
        const { data } = await axios.get(url);

        if (!data.success) {
          throw new Error(data.message);
        }

        commit('SET_EQUIPMENT', { equipment: data.equipment });
      } catch (error) {
        this._vm.$toast.error(error.message);
      }
    },
    async updateEquipment(context, { id, name, alias, timing, net }) {
      const url = `${import.meta.env.VITE_APP_BACKEND_URL}/api/equipment/${id}`;

      try {
        const { data } = await axios.patch(url, { name, alias, timing, net });

        if (!data.success) {
          throw new Error(data.message);
        }

        this._vm.$toast.success(data.message);
      } catch (error) {
        this._vm.$toast.error(error.message);
      }
    },
    async addEquipment(context, { name, alias, timing, net }) {
      const url = `${import.meta.env.VITE_APP_BACKEND_URL}/api/equipment`;

      try {
        const { data } = await axios.post(url, { name, alias, timing, net });

        if (!data.success) {
          throw new Error(data.message);
        }

        this._vm.$toast.success(data.message);
      } catch (error) {
        this._vm.$toast.error(error.message);
      }
    },
  },
  mutations: {
    SET_EQUIPMENT(state, { equipment }) {
      state.equipment = equipment;
    },
  },
};
