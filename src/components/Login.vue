<template>
  <div class="login">
    <div class="topHeader">
      <span style="color: #303778">Euler</span>
      <span style="color: #4C92FF;margin-left: 5px">DB</span>
    </div>
    <div>
      <a-form
          :model="formState"
          name="basic"
          :wrapper-col="{ span: 24 }"
          autocomplete="off"
          @finish="onFinish">
        <a-form-item label="" style="margin-bottom: 20px">
          <div class="flex">
            <p class="title">欢迎登录</p>
            <span style="cursor: pointer;color: #4C92FF;font-size: 14px"
                  @click="$router.push({path: '/register'})">注册</span>
          </div>
        </a-form-item>
        <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名！' }]">
          <p>用户名</p>
          <a-input v-model:value="formState.username" placeholder="用户名"/>
        </a-form-item>
        <a-form-item name="password" :rules="[{ required: true, message: '请输入密码！' }]" style="margin-bottom: 32px">
          <p>密码</p>
          <a-input type="password" v-model:value="formState.password" placeholder="请输入8-16位密码，其中包括字符、数字、特殊符号"/>
        </a-form-item>
        <a-form-item style="margin-bottom: 16px">
          <a-button type="primary" shape="round" html-type="submit" class="loginBtn">登录</a-button>
        </a-form-item>
        <a-form-item>
          <div style="text-align: right">
            <span style="color: #3C99F9;cursor: pointer" @click="$router.push({path: '/retrievePs1'})">忘记密码？</span>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  ref
} from 'vue';
import {login} from '../serves/index'
import {setLocalStorage} from '../serves/localStorage'

export default defineComponent({
  components: {},

  setup() {
    const formState = reactive({
      username: '',
      password: '',
      remember: true,
    });
    return {
      formState
    };
  },
  mounted() {
  },
  methods: {
    filterTableMater(code, arr, newChild) {
      for (const item of arr) {
        if (item.id === code) {
          item.children = newChild
        }
        if (item.children && item.children.length) {
          this.filterTableMater(code, item.children, newChild)
        }
      }
      return arr
    },
    onFinish(value) {
      let params = {
        username: value.username,
        password: value.password
      }
      login(params).then(res => {
        setLocalStorage('access_token', `${res.token_type} ${res.access_token}`)
        this.$router.push({
          path: '/index'
        })
      })
    }
  }
});
</script>

<style lang="scss">
.login {
  height: 100vh;
  background: #F4F7FC;

  .topHeader {
    height: 64px;
    background: #FFFFFF;
    box-shadow: 0px 12px 40px 0px rgba(0, 0, 0, 0.0200);
    font-size: 18px;
    font-weight: 600;
    padding: 0px 32px;
    line-height: 64px;
    text-align: left;
  }

  .ant-form {
    width: 400px;
    background: #fff;
    border-radius: 5px;
    padding: 30px;
    margin: 100px auto;

    .title {
      font-size: 26px;
      margin: 0px;
      font-weight: 400;
      text-align: left;
      color: #303778;
      line-height: 37px;
    }

    p {
      text-align: left;
      margin: 0px;
      font-size: 12px;
    }
  }

  .ant-input {
    width: 100%;
  }

  .ant-form-item {
    text-align: center;
    margin-bottom: 24px;
  }

  .loginBtn {
    width: 100%;
    border: none;
    background: #4C92FF;
    border-radius: 4px;
  }

  ::-webkit-input-placeholder {
    color: #7C88B199;
    font-size: 12px;
  }

  :-moz-placeholder {
    color: #7C88B199;
    font-size: 12px;
  }

  ::-moz-placeholder {
    color: #7C88B199;
    font-size: 12px;
  }

  :-ms-input-placeholder {
    color: #7C88B199;
    font-size: 12px;
  }

  .ant-form-item-explain-error {
    text-align: left;
  }


  .ant-checkbox-checked::after {
    border: none;
  }

  .ant-input-affix-wrapper > input.ant-input {
    color: #666666;
  }

}

</style>