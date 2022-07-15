<template>
  <a-layout>
    <a-layout-header class="header topHeader">
      <div class="flex">
        <div style="font-size: 18px;font-weight: 600">
          <span style="color: #303778">Euler</span>
          <span style="color: #4C92FF;margin-left: 5px">DB</span>
        </div>
        <div>
          <a-dropdown :trigger="['click']" :getPopupContainer="(triggerNode) => triggerNode.parentNode">
            <span style="cursor: pointer">
              <span style="font-size: 18px">sys.admin</span>
              <caret-down-filled style="margin-left: 8px;font-size:12px"/>
            </span>
            <template #overlay>
              <a-menu class="dropMenu">
                <a-menu-item key="0">
                  <span>个人中心</span>
                </a-menu-item>
                <a-menu-divider/>
                <a-menu-item key="1" @click="loginOut">
                  <span>退出登录</span>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" theme="dark">
          <a-menu-item key="/dataSource">
            <template #icon>
              <svg-icon icon-class="dataSource"></svg-icon>
            </template>
            <router-link to="/dataSource" class="link_a">
              <span>Data Source</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="/table">
            <template #icon>
              <svg-icon icon-class="table"></svg-icon>
            </template>
            <router-link to="/table" class="link_a">
              <span>Table</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="/sqlEditor">
            <template #icon>
              <svg-icon icon-class="sql"></svg-icon>
            </template>
            <router-link to="/sqlEditor" class="link_a">
              <span>SQL Editor</span>
            </router-link>
          </a-menu-item>
          <a-sub-menu key="sub1">
            <template #icon>
              <svg-icon icon-class="evebt"></svg-icon>
            </template>
            <template #title>EvebtEvebt</template>
            <a-menu-item key="shareReport">
              <router-link to="/shareReport" class="link_a">
                <span>Share Report</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="auditLog">
              <router-link to="/auditLog" class="link_a">
                <span>Audit Log</span>
              </router-link>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
        <img src="../assets/menu_bg.png" alt="" style="position:fixed;bottom:0px;left:0px;width: 160px">
      </a-layout-sider>
      <a-layout>
        <a-layout-content :style="{ margin: '40px 32px'}">
          <slot></slot>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  defineComponent,
  reactive,
  ref,
  toRefs
} from 'vue';
import {
  CaretDownFilled
} from '@ant-design/icons-vue';
import screenfull from 'screenfull'

export default defineComponent({
  components: {
    CaretDownFilled
  },

  setup() {
    const state = reactive({
      selectedKeys: [],
      openKeys: ['sub1'],
    });
    return {
      ...toRefs(state),
      collapsed: ref(false),
      isFullscreen: ref(false)
    };
  },
  computed: {},
  mounted() {
    this.selectedKeys = [this.$route.path]
    this.init()
  },
  methods: {
    // 全屏显示
    fullScreen() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: '你的浏览器不支持全屏',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off('change', this.change)
      }
    },
    loginOut() {
      this.$router.push({
        path: '/login'
      })
    }
  }

});
</script>
<style lang="scss">
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

.logo {
  padding: 10px;
}

.svg-icon {
  max-height: 50px !important;
}

.site-layout .site-layout-background {
  background: #fff;
}

.topHeader {
  height: 64px;
  background: #FFFFFF;
  box-shadow: 0px 12px 40px 0px rgba(0, 0, 0, 0.02);
}

.ant-layout-header {
  padding: 0px 24px;
  text-align: left;
}

.ant-breadcrumb-separator {
  margin: 0px 5px !important;
}

.ant-dropdown {
  top: 60px !important;
}


.ant-dropdown-menu {
  border-radius: 5px;
  padding: 5px;
}
</style>
