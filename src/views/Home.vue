<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-10 col-12">
        <div class="d-flex align-items-center mt-4">
          <h2 class="mb-0">設備列表</h2>
          <button
            class="
              btn btn-teal
              text-white
              btn-sm
              d-flex
              align-items-center
              ms-auto
            "
            @click.prevent="addEquipment"
          >
            <span class="me-2">新增設備</span>
            <font-awesome-icon :icon="['fas', 'plus']" />
          </button>
          <button
            class="
              btn btn-teal
              text-white
              btn-sm
              d-flex
              align-items-center
              ms-2
            "
            @click.prevent="reload"
          >
            <span class="me-2">重新整理</span>
            <font-awesome-icon :icon="['fas', 'sync-alt']" />
          </button>
        </div>
        <div class="table-responsive-md mt-4">
          <table class="table table-striped table-hover caption-top">
            <thead>
              <tr>
                <th>編號</th>
                <th>設備名稱</th>
                <th>設備代號</th>
                <th class="text-center">限制時間</th>
                <th class="text-center">聲聯網</th>
                <th class="text-center">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in equipment" :key="index">
                <td>{{ item._id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.alias }}</td>
                <td class="text-center">
                  <span v-if="item.timing" class="text-teal">TRUE</span>
                  <span v-else class="text-danger">FALSE</span>
                </td>
                <td class="text-center">
                  <span v-if="item.net" class="text-teal">TRUE</span>
                  <span v-else class="text-danger">FALSE</span>
                </td>
                <td class="text-center">
                  <button
                    class="btn btn-teal text-white btn-sm"
                    @click.prevent="editEquipment(item)"
                  >
                    修改
                  </button>
                  <button
                    class="btn btn-info text-white btn-sm ms-2"
                    @click.prevent="showEquipmentLog(item)"
                  >
                    查看日誌
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('equipment', ['equipment']),
  },
  async created() {
    this.$store.commit('SET_LOADING', { status: '設備搜尋中', active: true });

    await this.$store.dispatch('equipment/getEquipment');

    this.$store.commit('SET_LOADING', { status: '', active: false });
  },
  methods: {
    async reload() {
      this.$store.commit('SET_LOADING', { status: '設備搜尋中', active: true });

      await this.$store.dispatch('equipment/getEquipment');

      this.$store.commit('SET_LOADING', { status: '', active: false });
    },
    editEquipment(item) {
      this.$store.commit('modal/SET_MODAL_CACHE', { cache: item });
      this.$store.commit('modal/OPEN_MODAL', { modal: 'editModal' });
    },
    addEquipment() {
      this.$store.commit('modal/SET_MODAL_CACHE', {
        cache: { timing: false, net: false },
      });
      this.$store.commit('modal/OPEN_MODAL', { modal: 'addModal' });
    },
    showEquipmentLog(item) {
      this.$store.commit('modal/SET_MODAL_CACHE', { cache: item });
      this.$store.commit('modal/OPEN_MODAL', { modal: 'showModal' });
    },
  },
};
</script>

<style lang="scss" scoped>
.table td,
.table th {
  min-width: 150px;
}
</style>
