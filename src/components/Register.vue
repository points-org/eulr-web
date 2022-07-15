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
          :rules="rules"
          autocomplete="off"
          @finish="onFinish">
        <a-form-item label="" style="margin-bottom: 20px">
          <div class="flex">
            <p class="title">欢迎注册</p>
            <span style="cursor: pointer;color: #4C92FF;font-size: 14px" @click="$router.push({path: '/login'})">登录</span>
          </div>
        </a-form-item>
        <a-form-item name="username">
          <p>用户名</p>
          <a-input v-model:value="formState.username" placeholder="请输入注册邮箱地址"/>
        </a-form-item>
        <a-form-item name="phone">
          <p>手机号</p>
          <a-input v-model:value="formState.phone" placeholder="请输入注册手机号"/>
        </a-form-item>
        <a-form-item name="password">
          <p>设置密码</p>
          <a-input type="password" v-model:value="formState.password" placeholder="请输入8-16位密码，其中包括字符、数字、特殊符号"/>
        </a-form-item>
        <a-form-item name="checkPass" style="margin-bottom: 32px">
          <p>确认密码</p>
          <a-input type="password" v-model:value="formState.checkPass" placeholder="请确认密码"/>
        </a-form-item>
        <a-form-item style="margin-bottom: 16px">
          <a-button type="primary" shape="round" html-type="submit" class="loginBtn" :disabled="!checked">同意协议并注册
          </a-button>
        </a-form-item>
        <a-form-item>
          <div>
            <a-checkbox v-model:checked="checked" style="color: #666666">
              我已阅读并同意
              <span style="color: #4C92FF">《xxxxxxxxx平台用户注册协议》</span>
            </a-checkbox>
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

  setup() {
    const formState = reactive({
      username: '',
      phone: '',
      password: '',
      checkPass: '',
    });
    let validateUsername = async (_rule, value) => {
      if (value === '') {
        return Promise.reject('请输入用户名！');
      } else {
        return Promise.resolve();
      }
    };
    let validatePhone = async (_rule, value) => {
      if (value === '') {
        return Promise.reject('请输入手机号！');
      } else {
        return Promise.resolve();
      }
    };
    let validatePass = async (_rule, value) => {
      if (value === '') {
        return Promise.reject('请输入密码！');
      } else {
        return Promise.resolve();
      }
    };

    let validatePass2 = async (_rule, value) => {
      if (value === '') {
        return Promise.reject('请确认密码！');
      } else if (value !== formState.password) {
        return Promise.reject("两次密码不一致，请重新输入!");
      } else {
        return Promise.resolve();
      }
    };
    const rules = {
      username: [{
        required: true,
        validator: validateUsername,
        trigger: 'change',
      }],
      phone: [{
        required: true,
        validator: validatePhone,
        trigger: 'change',
      }],
      password: [{
        required: true,
        validator: validatePass,
        trigger: 'change',
      }],
      checkPass: [{
        validator: validatePass2,
        trigger: 'change',
      }],
    };
    return {
      formState,
      checked: ref(false),
      rules
    };
  },
  mounted() {
  },
  methods: {
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

  ::moz-placeholder {
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

  //.ant-checkbox-checked .ant-checkbox-inner {
  //  background: linear-gradient(139deg, #FFAE42 0%, #FF7835 100%);
  //  border: none;
  //}
  //
  //.ant-checkbox-wrapper:hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner, .ant-checkbox-input:focus + .ant-checkbox-inner {
  //  border-color: #d9d9d9;
  //}

}

</style>