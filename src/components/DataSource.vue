<template>
  <div class="dataSource" ref="dataSource">
    <div class="flex header">
      <div class="title">Data Source</div>
      <div class="flex">
        <a-input v-model:value="searchVal" placeholder="Search…">
          <template #prefix>
            <svg-icon icon-class="search" style="width: 24px;height: 24px"></svg-icon>
          </template>
        </a-input>
        <a-button type="primary" shape="round" @click="addData">
          <template #icon>
            <plus-circle-filled/>
          </template>
          Add
        </a-button>
      </div>
    </div>
    <div style="margin-top: 28px">
      <a-row :gutter="32">
        <a-col :span="8" v-for="(item,index) in cardList" :key="index">
          <div class="bgc card">
            <div class="flex" style="margin-bottom: 30px">
              <div class="title">{{ item.title }}</div>
              <div>
                <svg-icon icon-class="edit" :class="editKey == item.key ? editClass : ''"
                          @click="editCard(item)"></svg-icon>
                <a-popconfirm title="Are you sure to delete this card?" ok-text="OK" cancel-text="Cancel"
                              @confirm="confirmPop"
                              @cancel="cancelPop">
                  <template #icon>
                    <exclamation-circle-filled style="color: #FB706D"/>
                  </template>
                  <svg-icon icon-class="delete" :class="delKey == item.key ? delClass : ''"
                            @click="delCard(item)"></svg-icon>
                </a-popconfirm>
              </div>
            </div>
            <div class="card_div">
              <div class="s-title">Driver Class Name</div>
              <div class="info">{{ item.driverName }}</div>
            </div>
            <div class="card_div">
              <div class="s-title">Username</div>
              <div class="info">{{ item.userName }}</div>
            </div>
            <div class="card_div">
              <div class="s-title">Connection Url</div>
              <div class="info">{{ item.url }}</div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <a-modal v-model:visible="visible" :title="title" :footer="null" @cancel="cancel"
             :getContainer="()=>$refs.dataSource">
      <a-form
          :model="formState"
          v-bind="layout"
          ref="formRef"
          name="nest-messages"
          :validate-messages="validateMessages"
          @finish="onFinish">
        <a-form-item :name="['user', 'name']" label="Name" :rules="[{ required: true }]">
          <a-input v-model:value="formState.user.name"/>
        </a-form-item>
        <a-form-item :name="['user', 'driverName']" label="Driver Class Name" :rules="[{ required: true }]">
          <a-input v-model:value="formState.user.driverName"/>
        </a-form-item>
        <a-form-item :name="['user', 'username']" label="Username" :rules="[{ required: true }]">
          <a-select
              v-model:value="formState.user.username"
              :options="userOptions"
          ></a-select>
        </a-form-item>
        <a-form-item :name="['user', 'password']" label="Password" :rules="[{ required: true }]">
          <a-input v-model:value="formState.user.password"/>
        </a-form-item>
        <a-form-item :name="['user', 'connectionUrl']" label="Connection Url" :rules="[{ required: true }]">
          <a-textarea v-model:value="formState.user.connectionUrl" :auto-size="{ minRows: 4}"/>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 24, offset: 0 }" class="btn">
          <a-button @click="cancel" shape="round">Reset</a-button>
          <a-button type="primary" html-type="submit" shape="round">Save</a-button>
        </a-form-item>
      </a-form>
    </a-modal>

  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  ref
} from 'vue';
import {PlusCircleFilled, ExclamationCircleFilled} from '@ant-design/icons-vue';
import {message} from "ant-design-vue";

export default defineComponent({
  components: {
    PlusCircleFilled,
    ExclamationCircleFilled
  },

  setup() {
    const layout = {
      labelCol: {
        span: 24,
      },
      wrapperCol: {
        span: 24,
      },
    };
    const validateMessages = {
      required: '${label} 不能为空!',
    };
    const formState = reactive({
      user: {
        name: '',
        driverName: '',
        username: '',
        password: '',
        connectionUrl: ''
      },
    });
    const formRef = ref();
    return {
      searchVal: ref(''),
      editClass: ref(''),
      delClass: ref(''),
      editKey: ref(''),
      delKey: ref(''),
      cardList: ref([
        {
          key: 1,
          title: 'Fancy_db',
          driverName: 'com.mysql.jdbc.Driver',
          userName: 'root',
          url: 'jdbc:mysql://121.37.102.108:3306/fancy_db'
        },
        {
          key: 2,
          title: 'Fancy_db',
          driverName: 'com.mysql.jdbc.Driver',
          userName: 'root',
          url: 'jdbc:mysql://121.37.102.108:3306/fancy_db'
        },
        {
          key: 3,
          title: 'Fancy_db',
          driverName: 'com.mysql.jdbc.Driver',
          userName: 'root',
          url: 'jdbc:mysql://121.37.102.108:3306/fancy_db'
        },
        {
          key: 4,
          title: 'Fancy_db',
          driverName: 'com.mysql.jdbc.Driver',
          userName: 'root',
          url: 'jdbc:mysql://121.37.102.108:3306/fancy_db'
        },
        {
          key: 5,
          title: 'Fancy_db',
          driverName: 'com.mysql.jdbc.Driver',
          userName: 'root',
          url: 'jdbc:mysql://121.37.102.108:3306/fancy_db'
        },
        {
          key: 6,
          title: 'Fancy_db',
          driverName: 'com.mysql.jdbc.Driver',
          userName: 'root',
          url: 'jdbc:mysql://121.37.102.108:3306/fancy_db'
        },
        {
          key: 7,
          title: 'Fancy_db',
          driverName: 'com.mysql.jdbc.Driver',
          userName: 'root',
          url: 'jdbc:mysql://121.37.102.108:3306/fancy_db'
        },
      ]),
      visible: ref(false),
      title: ref('Add'),
      userOptions: ref([
        {value: 'user1'},
        {value: 'user2'},
        {value: 'user3'},
      ]),
      formState,
      layout,
      validateMessages,
      formRef
    };
  },
  mounted() {


  },
  methods: {
    editCard(item) {
      this.editKey = item.key
      this.editClass = 'editActive'
      this.delClass = ''
      this.visible = true
      this.title = 'Edit'
    },
    delCard(item) {
      this.delKey = item.key
      this.delClass = 'delActive'
      this.editClass = ''
    },
    // 执行删除
    confirmPop() {
      this.delClass = ''
    },
    cancelPop() {
      this.delClass = ''
    },
    addData() {
      this.visible = true
    },
    onFinish(values) {
      if (this.title == 'Add') {
        // addNews(values.user).then(res => {
        //   if (res.id) {
        //     message.success('新增成功！')
        //     this.cancel()
        //     this.pagination.current = 1
        //     this.queryData()
        //   }
        // })
      } else {
        let params = values.user
        params.id = this.id
        // updateNews(params).then(res => {
        //   message.success('修改成功！')
        //   this.cancel()
        //   this.pagination.current = 1
        //   this.queryData()
        // })
      }
    },
    cancel() {
      this.visible = false
      this.formState = reactive({
        user: {
          title: '',
          img_url: '',
          author: '',
          date: '',
          destination_url: ''
        },
      });
      this.editClass = ''
      this.formRef.resetFields()
    }
  }

});
</script>

<style lang="scss">
.dataSource {
  .header {
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

  .ant-col {
    margin-bottom: 14px;
  }

  .card {
    padding: 34px 32px;

    .title {
      font-size: 22px;
      font-weight: 600;
      color: #303778;
      line-height: 30px;
    }

    .card_div {
      text-align: left;
      margin: 15px 0px;

      .s-title {
        font-size: 13px;
        font-weight: 400;
        color: #303778;
        line-height: 18px;
      }

      .info {
        font-size: 16px;
        font-weight: 500;
        color: #303778;
        line-height: 20px;
        word-break: break-word;
      }
    }
  }

  .svg-icon {
    width: 28px;
    height: 28px;
    color: #7C88B1;
    margin: 0px 12px;
  }

  .svg-icon:focus {
    outline: aliceblue;
  }

  .editActive {
    color: #4C92FF
  }

  .delActive {
    color: #FF726F
  }

  .ant-form-item-control {
    text-align: left;
  }

  .btn {
    .ant-form-item-control {
      text-align: right;
    }

    .ant-btn-round {
      font-size: 14px;
      font-weight: 400;
      padding: 0px 16px;
      height: 24px;
      border-radius: 12px;
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

  .ant-input {
    width: 100%;
    height: 32px;
  }

}
</style>
