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
          <p class="title">找回密码</p>
        </a-form-item>
        <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名！' }]">
          <p>用户名</p>
          <a-input v-model:value="formState.username" placeholder="用户名"/>
        </a-form-item>
        <a-form-item name="phone" :rules="[{ required: true, message: '请输入注册手机号码！' }]">
          <p>手机号</p>
          <a-input v-model:value="formState.phone" placeholder="注册手机号码"/>
        </a-form-item>
        <a-form-item name="yzCode" :rules="[{ required: true, message: '请输入注册手机号码！' }]">
          <p>手机验证</p>
          <div class="flex">
            <a-input v-model:value="formState.yzCode" placeholder="注册手机号码" style="width: 60%"/>
            <a-button type="primary" :disabled="btnDisabled" @click="getYzCode">{{ codwBtnWord }}</a-button>
          </div>
        </a-form-item>
        <a-form-item style="margin-bottom: 16px">
          <a-button type="primary" shape="round" html-type="submit" class="loginBtn">下一步</a-button>
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
import {message} from 'ant-design-vue';
import {setLocalStorage} from '../serves/localStorage'

export default defineComponent({
  components: {},

  setup() {
    const formState = reactive({
      username: '',
      phone: '',
      yzCode: '',
    });
    return {
      formState,
      codwBtnWord: ref('获取验证码'),
      waitTime: 60,
      btnDisabled: ref(false)
    };
  },
  mounted() {
  },
  methods: {
    getYzCode() {
      if (!this.formState.phone) {
        message.warning('请先输入手机号码！')
      } else {
        this.waitTime--
        this.btnDisabled = true
        this.codwBtnWord = `${this.waitTime}s后重新获取`
        let timer = setInterval(() => {
          if (this.waitTime > 1) {
            this.waitTime--
            this.codwBtnWord = `${this.waitTime}s后重新获取`
          } else {
            clearInterval(timer)
            this.codwBtnWord = '获取验证码'
            this.btnDisabled = false
            this.waitTime = 60
          }
        }, 1000)
      }
    },
    onFinish(value) {
      let params = {
        username: value.username,
        password: value.password
      }
      login(params).then(res => {
        setLocalStorage('access_token', `${res.token_type} ${res.access_token}`)
        this.$router.push({
          path: '/retrievePs2'
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