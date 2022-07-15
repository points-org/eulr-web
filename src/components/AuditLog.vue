<template>
  <div class="auditLog">
    <div class="flex header">
      <div class="title">Audit Log</div>
      <div>
        <a-input v-model:value="searchVal" placeholder="Search…">
          <template #prefix>
            <svg-icon icon-class="search" style="width: 24px;height: 24px"></svg-icon>
          </template>
        </a-input>
      </div>
    </div>
    <div class="bgc" style="padding: 32px;height: 75vh">
      <a-textarea v-model:value="logDes" :rows="25" placeholder="Write your descriptions" class="textarea"/>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  ref
} from 'vue';

export default defineComponent({
  components: {},

  setup() {
    return {
      searchVal: ref(''),
      logDes: ref(''),

    };
  },
  mounted() {


  },
  methods: {}

});
</script>

<style lang="scss">
.auditLog {
  .header {
    margin-bottom: 32px;

    .ant-input-affix-wrapper {
      width: 240px;
      height: 44px;
      background: #FFFFFF;
      box-shadow: 0px 8px 44px 0px rgba(149, 158, 174, 0.1);
      border-radius: 22px;
    }

    .ant-btn-round {
      width: 160px;
      height: 44px;
      background: #4C92FF;
      box-shadow: 0px 8px 44px 0px rgba(149, 158, 174, 0.1);
      border-radius: 22px;
      font-size: 16px;
      font-weight: 600;
      margin-left: 32px;
    }
  }

  .textarea {
    width: 100%;
  }
}
</style>
