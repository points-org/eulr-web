<template>
  <div class="sqlEditor">
    <div class="flex header">
      <div class="title">SQL Editor</div>
      <div>
        <a-form
            :model="formState"
            layout="inline"
            ref="formRef"
            name="nest-messages">
          <a-form-item :name="['user', 'username']" label="">
            <a-select
                v-model:value="formState.user.username"
                placeholder="API"
                style="width: 180px"
                :options="userOptions"
            ></a-select>
          </a-form-item>
          <a-form-item :name="['user', 'username']" label="">
            <a-select
                v-model:value="formState.user.username"
                placeholder="Query Name"
                style="width: 180px"
                :options="userOptions"
            ></a-select>
          </a-form-item>
          <a-form-item :name="['user', 'connectionUrl']" label="">
            <a-input v-model:value="formState.user.password" placeholder="Endpoint Name"/>
          </a-form-item>
          <a-form-item :name="['user', 'connectionUrl']" label="">
            <a-input v-model:value="formState.user.password" placeholder="Access Code"/>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <a-row :gutter="16">
      <a-col :span="5">
        <div class="bgc left" style="padding: 24px 16px">
          <div class="flex">
            <a-select
                v-model:value="formState.user.username"
                placeholder="API"
                style="width: 200px"
                size="small"
                :options="userOptions"
            ></a-select>
            <a-button size="small">Schema</a-button>
          </div>
          <div style="margin-top: 26px">
            <p>test_and_or</p>
            <p>test_and_or</p>
            <p>test_and_or</p>
            <p>test_and_or</p>
            <p>test_and_or</p>
            <p>test_and_or</p>
            <p>test_and_or</p>
            <p>test_and_or</p>
          </div>
        </div>
      </a-col>
      <a-col :span="19">
        <div class="bgc right" style="padding: 24px 32px">
          <a-textarea v-model:value="textDes" :rows="5" class="textarea"/>
          <div class="flex" style="margin: 24px 0px">
            <div>
              <a-checkbox v-model:checked="checked">Ciphertext</a-checkbox>
            </div>
            <div>
              <a-button shape="round">Reset</a-button>
              <a-button type="primary" html-type="submit" shape="round">Run</a-button>
            </div>
          </div>
          <a-table :columns="columns" :data-source="dataSource" :pagination="false" bordered style="margin-top: 10px">
          </a-table>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  ref
} from 'vue';

const columns = [
  {
    title: 'ID card',
    dataIndex: 'idCard',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Comp',
    dataIndex: 'comp',
  },
  {
    title: 'Score',
    dataIndex: 'score',
  },
  {
    title: 'Nick_name',
    dataIndex: 'nickName',
  },
];
export default defineComponent({
  components: {},

  setup() {
    const formState = reactive({
      user: {
        name: null,
        driverName: '',
        username: null,
        password: '',
        connectionUrl: ''
      },
    });
    return {
      formState,
      userOptions: ref([
        {value: 'user1'},
        {value: 'user2'},
        {value: 'user3'},
      ]),
      textDes: ref(''),
      checked: ref(true),
      columns,
      dataSource: ref([
        {
          idCard: 'ISEORdJbcIzu5sGeeD',
          name: '6veJwW3fkaOt8QTrn',
          age: '60',
          comp: '6veJwW3fkaOt8QTrn...',
          score: '80',
          nickName: '限杭州光',
        },
        {
          idCard: 'ISEORdJbcIzu5sGeeD',
          name: '6veJwW3fkaOt8QTrn',
          age: '60',
          comp: '6veJwW3fkaOt8QTrn...',
          score: '80',
          nickName: '限杭州光',
        },
        {
          idCard: 'ISEORdJbcIzu5sGeeD',
          name: '6veJwW3fkaOt8QTrn',
          age: '60',
          comp: '6veJwW3fkaOt8QTrn...',
          score: '80',
          nickName: '限杭州光',
        },
        {
          idCard: 'ISEORdJbcIzu5sGeeD',
          name: '6veJwW3fkaOt8QTrn',
          age: '60',
          comp: '6veJwW3fkaOt8QTrn...',
          score: '80',
          nickName: '限杭州光',
        },
        {
          idCard: 'ISEORdJbcIzu5sGeeD',
          name: '6veJwW3fkaOt8QTrn',
          age: '60',
          comp: '6veJwW3fkaOt8QTrn...',
          score: '80',
          nickName: '限杭州光',
        },
        {
          idCard: 'ISEORdJbcIzu5sGeeD',
          name: '6veJwW3fkaOt8QTrn',
          age: '60',
          comp: '6veJwW3fkaOt8QTrn...',
          score: '80',
          nickName: '限杭州光',
        },
      ]),
    };
  },
  mounted() {


  },
  methods: {}

});
</script>

<style lang="scss">
.sqlEditor {
  text-align: left;

  .header {
    margin-bottom: 10px;

    .ant-input {
      width: 180px;
    }
  }

  .bgc {
    min-height: 75vh;
  }

  .left {
    justify-content: start;

    .ant-btn-sm {
      background: rgba(76, 146, 255, 0.1);
      font-size: 12px;
      font-weight: 400;
      color: #4C92FF;
    }

    p {
      font-size: 14px;
      font-weight: 400;
      color: #303778;
      line-height: 20px;
      margin-bottom: 8px;
    }
  }

  .right {
    .textarea {
      width: 100%;
    }

    .ant-btn-round {
      height: 38px;
      box-shadow: 0px 8px 44px 0px rgba(149, 158, 174, 0.1);
      border-radius: 22px;
      border: 1px solid #D2D5E1;
      font-size: 16px;
      font-weight: 600;
      padding: 0px 48px;
      margin: 0px 8px;
    }

    .ant-btn-round:nth-child(1) {
      border: 1px solid #D2D5E1;
      background: #FFFFFF;
      color: #7C88B1;
    }

    .ant-btn-round:nth-child(2) {
      border: 1px solid #4C92FF;
      background: #4C92FF;
      color: #FFFFFF;
    }
  }

}
</style>
