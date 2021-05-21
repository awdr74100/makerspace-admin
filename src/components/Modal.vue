<template>
  <div>
    <!-- Show Modal -->
    <modal
      name="showModal"
      height="auto"
      :adaptive="true"
      :shift-y="0.2"
      :width="460"
      :max-width="maxWidth"
      @before-open="beforeOpen"
      @before-close="closeModal(null)"
    >
      <div class="container-fluid px-0">
        <div class="modal-content border-0 rounded-0">
          <div class="modal-header border-0 bg-info text-white rounded-0">
            <h5 class="modal-title">設備日誌</h5>
            <button
              type="button"
              class="btn-close"
              @click.prevent="closeModal('showModal')"
            ></button>
          </div>
        </div>
        <div class="modal-body m-body pt-0">
          <ul
            v-for="(item, index) in equipment.logs"
            :key="index"
            class="list-group pt-3"
          >
            <li class="list-group-item">
              姓名：{{ item.member.accounts[0].name }}
            </li>
            <li class="list-group-item">信箱：{{ item.member.email }}</li>
            <li class="list-group-item">
              啟動：{{ new Date(item.startAt).toLocaleString() }}
            </li>
            <li class="list-group-item">
              結束：{{ new Date(item.endAt).toLocaleString() }}
            </li>
          </ul>
        </div>
      </div>
    </modal>
    <!-- Add Modal -->
    <modal
      name="addModal"
      height="auto"
      :adaptive="true"
      :shift-y="0.2"
      :width="460"
      :max-width="maxWidth"
      @before-open="beforeOpen"
      @before-close="closeModal(null)"
    >
      <div class="container-fluid px-0">
        <div class="modal-content border-0 rounded-0">
          <div class="modal-header border-0 bg-teal text-white rounded-0">
            <h5 class="modal-title">新增設備</h5>
            <button
              type="button"
              class="btn-close"
              @click.prevent="closeModal('addModal')"
            ></button>
          </div>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="equipmentName" class="form-label">設備名稱</label>
            <input
              id="equipmentName"
              v-model="equipment.name"
              type="text"
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label for="equipmentAlias" class="form-label">設備代號</label>
            <input
              id="equipmentAlias"
              v-model="equipment.alias"
              type="text"
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label for="equipmentTiming" class="form-label">限制時間</label>
            <div class="form-check">
              <input
                id="timingTrue"
                v-model="equipment.timing"
                class="form-check-input"
                type="radio"
                :value="true"
              />
              <label class="form-check-label" for="timingTrue">
                True <span class="text-secondary">(用於設備管理)</span>
              </label>
            </div>
            <div class="form-check">
              <input
                id="timingFalse"
                v-model="equipment.timing"
                class="form-check-input"
                type="radio"
                :value="false"
              />
              <label class="form-check-label" for="timingFalse">
                False <span class="text-secondary">(用於門禁管理)</span>
              </label>
            </div>
          </div>
          <div class="mb-3">
            <label for="equipmentNet" class="form-label">聲聯網</label>
            <div class="form-check">
              <input
                id="netTrue"
                v-model="equipment.net"
                class="form-check-input"
                type="radio"
                :value="true"
              />
              <label class="form-check-label" for="netTrue">
                True <span class="text-secondary">(透過聲聯網解鎖)</span>
              </label>
            </div>
            <div class="form-check">
              <input
                id="netFalse"
                v-model="equipment.net"
                class="form-check-input"
                type="radio"
                :value="false"
              />
              <label class="form-check-label" for="netFalse">
                False <span class="text-secondary">(不透過聲聯網解鎖)</span>
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer rounded-0">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click.prevent="closeModal('addModal')"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-outline-teal"
            @click.prevent="addEquipment"
          >
            確定
          </button>
        </div>
      </div>
    </modal>
    <!-- Edit Modal -->
    <modal
      name="editModal"
      height="auto"
      :adaptive="true"
      :shift-y="0.2"
      :width="460"
      :max-width="maxWidth"
      @before-open="beforeOpen"
      @before-close="closeModal(null)"
    >
      <div class="container-fluid px-0">
        <div class="modal-content border-0 rounded-0">
          <div class="modal-header border-0 bg-teal text-white rounded-0">
            <h5 class="modal-title">編輯設備</h5>
            <button
              type="button"
              class="btn-close"
              @click.prevent="closeModal('editModal')"
            ></button>
          </div>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="equipmentName" class="form-label">設備名稱</label>
            <input
              id="equipmentName"
              v-model="equipment.name"
              type="text"
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label for="equipmentAlias" class="form-label">設備代號</label>
            <input
              id="equipmentAlias"
              v-model="equipment.alias"
              type="text"
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label for="equipmentTiming" class="form-label">限制時間</label>
            <div class="form-check">
              <input
                id="timingTrue"
                v-model="equipment.timing"
                class="form-check-input"
                type="radio"
                :value="true"
              />
              <label class="form-check-label" for="timingTrue">
                True <span class="text-secondary">(用於設備管理)</span>
              </label>
            </div>
            <div class="form-check">
              <input
                id="timingFalse"
                v-model="equipment.timing"
                class="form-check-input"
                type="radio"
                :value="false"
              />
              <label class="form-check-label" for="timingFalse">
                False <span class="text-secondary">(用於門禁管理)</span>
              </label>
            </div>
          </div>
          <div class="mb-3">
            <label for="equipmentNet" class="form-label">聲聯網</label>
            <div class="form-check">
              <input
                id="netTrue"
                v-model="equipment.net"
                class="form-check-input"
                type="radio"
                :value="true"
              />
              <label class="form-check-label" for="netTrue">
                True <span class="text-secondary">(透過聲聯網解鎖)</span>
              </label>
            </div>
            <div class="form-check">
              <input
                id="netFalse"
                v-model="equipment.net"
                class="form-check-input"
                type="radio"
                :value="false"
              />
              <label class="form-check-label" for="netFalse">
                False <span class="text-secondary">(不透過聲聯網解鎖)</span>
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer rounded-0">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click.prevent="closeModal('editModal')"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-outline-teal"
            @click.prevent="updateEquipment"
          >
            確定
          </button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    maxWidth: 0,
    equipment: {},
  }),
  computed: {
    ...mapState('modal', ['cache']),
  },
  methods: {
    beforeOpen() {
      this.maxWidth = window.innerWidth - 30;
      this.equipment = { ...this.cache };
    },
    closeModal(modal) {
      this.$store.commit('modal/SET_MODAL_CACHE', { cache: {} });
      this.$store.commit('modal/CLOSE_MODAL', { modal });
    },
    async updateEquipment() {
      this.$store.commit('SET_LOADING', { status: '設備更新中', active: true });

      await this.$store.dispatch('equipment/updateEquipment', {
        id: this.equipment._id,
        name: this.equipment.name,
        alias: this.equipment.alias,
        timing: this.equipment.timing,
        net: this.equipment.net,
      });

      this.$store.commit('SET_LOADING', { status: '設備搜尋中', active: true });

      await this.$store.dispatch('equipment/getEquipment');

      this.$store.commit('SET_LOADING', { status: '', active: false });

      this.closeModal('editModal');
    },
    async addEquipment() {
      if (!this.equipment.name || !this.equipment.alias) {
        this.$toast.error('欄位皆為必填');
        return;
      }

      this.$store.commit('SET_LOADING', { status: '設備更新中', active: true });

      await this.$store.dispatch('equipment/addEquipment', {
        name: this.equipment.name,
        alias: this.equipment.alias,
        timing: this.equipment.timing,
        net: this.equipment.net,
      });

      this.$store.commit('SET_LOADING', { status: '設備搜尋中', active: true });

      await this.$store.dispatch('equipment/getEquipment');

      this.$store.commit('SET_LOADING', { status: '', active: false });

      this.closeModal('addModal');
    },
  },
};
</script>

<style lang="scss" scoped>
.m-body {
  max-height: 378px;
  overflow: auto;
}
</style>
