<template>
  <div class="tableData">
    <div class="header">
      <div class="title">Table</div>
      <div style="margin: 24px 0px 32px">
        <a-button shape="round" :class="flag ? 'active' : ''" @click="flag = true" style="margin-right: 50px">Table
          SQL
        </a-button>
        <a-button shape="round" :class="!flag ? 'active' : ''" @click="flag = false">Table Design</a-button>
      </div>
    </div>
    <div class="bgc" v-if="flag">
      <p class="tabName">Table SQL</p>
      <a-form
          :model="formState"
          v-bind="layout"
          ref="formRef"
          name="nest-messages"
          :validate-messages="validateMessages"
          @finish="onFinish">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item :name="['user', 'username']" label="Data Source" :rules="[{ required: true }]">
              <a-select
                  v-model:value="formState.user.username"
                  placeholder="Data Source"
                  :options="userOptions"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12"></a-col>
          <a-col :span="12">
            <a-form-item :name="['user', 'connectionUrl']" label="Create Table" :rules="[{ required: true }]">
              <a-textarea v-model:value="formState.user.connectionUrl" :auto-size="{ minRows: 8}"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :name="['user', 'connectionUrl']" label="Encrypted Columns">
              <a-textarea v-model:value="formState.user.connectionUrl" :auto-size="{ minRows: 8}"/>
            </a-form-item>
          </a-col>
          <a-col :span="24" style="text-align: right;margin-top: 30px">
            <a-form-item :wrapper-col="{ span: 24, offset: 0 }" class="btn">
              <a-button @click="cancel" shape="round">Reset</a-button>
              <a-button type="primary" html-type="submit" shape="round">Save</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="bgc" v-if="!flag">
      <p class="tabName">Table Design</p>
      <a-form
          :model="formState"
          layout="inline"
          ref="formRef"
          name="nest-messages"
          @finish="onFinish">
        <a-form-item :name="['user', 'username']" style="margin-right: 40px">
          <a-select
              v-model:value="formState.user.username"
              placeholder="Data Source"
              style="width: 200px;height: 32px"
              :options="userOptions"
          ></a-select>
        </a-form-item>
        <a-form-item :name="['user', 'password']">
          <a-input v-model:value="formState.user.password" placeholder="Table Name" style="width: 200px;height: 32px"/>
        </a-form-item>
      </a-form>
      <a-table :columns="columns" :data-source="dataSource" :pagination="false" bordered style="margin-top: 10px">
        <template #bodyCell="{ column, text, record }">
          <template v-if="['name', 'length', 'token'].includes(column.dataIndex)">
            <div>
              <a-input
                  v-if="editableData[record.key]"
                  v-model:value="editableData[record.key][column.dataIndex]"
                  style="margin: -5px 0"/>
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>
          <template v-if="['encryption', 'fuzzy'].includes(column.dataIndex)">
            <div>
              <a-select
                  style="width: 100%"
                  v-if="editableData[record.key]"
                  v-model:value="editableData[record.key][column.dataIndex]">
                <a-select-option value="1">True</a-select-option>
                <a-select-option value="0">False</a-select-option>
              </a-select>
              <template v-else>
                {{ text == 1 ? 'True' : 'False' }}
              </template>
            </div>
          </template>
          <template v-if="['type'].includes(column.dataIndex)">
            <div>
              <a-select
                  style="width: 100%"
                  v-if="editableData[record.key]"
                  v-model:value="editableData[record.key][column.dataIndex]">
                <a-select-option value="INT">INT</a-select-option>
                <a-select-option value="VARCHAR">VARCHAR</a-select-option>
              </a-select>
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'operation'">
            <div class="editable-row-operations">
              <span v-if="editableData[record.key]">
                <a-typography-link @click="save(record.key)" style="margin-right: 10px;">Save</a-typography-link>
                <a-popconfirm title="Sure to cancel?" @confirm="cancelEdit(record.key)">
                  <a>Cancel</a>
                </a-popconfirm>
              </span>
              <span v-else>
                <a @click="edit(record.key)" style="margin-right: 10px;">Edit</a>
                <a-button type="link" danger>Delete</a-button>
              </span>
            </div>
          </template>
        </template>
        <template #footer>
          <span style="cursor: pointer" @click="handleAdd">
            <svg-icon icon-class="add" style="width: 16px;height: 16px"></svg-icon>
            Add a new row
          </span>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  computed,
  ref
} from 'vue';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Length',
    dataIndex: 'length',
  },
  {
    title: 'Encryption',
    dataIndex: 'encryption',
  },
  {
    title: 'Fuzzy',
    dataIndex: 'fuzzy',
  },
  {
    title: 'Token',
    dataIndex: 'token',
  },
  {
    title: 'Action',
    dataIndex: 'operation',
  }
];
const data = [];

for (let i = 0; i < 10; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    type: 'VARCHAR',
    length: 10,
    encryption: '0',
    fuzzy: '1',
    token: 40,
    address: `London Park no. ${i}`,
  });
}

export default defineComponent({
  components: {},

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
        username: null,
        password: '',
        connectionUrl: ''
      },
    });
    const formRef = ref();

    const dataSource = ref(data);
    const editableData = reactive({});

    const edit = key => {
      editableData[key] = JSON.parse(JSON.stringify((dataSource.value.filter(item => key === item.key)[0])));
      console.log(editableData);
    };

    const save = key => {
      Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
      delete editableData[key];
    };

    const cancelEdit = key => {
      delete editableData[key];
    };
    const count = computed(() => dataSource.value.length + 1);
    const handleAdd = () => {
      const newData = {
        key: `${count.value}`,
        name: `Edward King ${count.value}`,
        type: 'INT',
        length: 10,
        encryption: '1',
        fuzzy: '0',
        token: 40,
        address: `London, Park Lane no. ${count.value}`,
      };
      editableData[count.value] = newData
      dataSource.value.push(newData);
    };


    return {
      flag: ref(false),
      formState,
      layout,
      validateMessages,
      formRef,
      userOptions: ref([
        {value: 'user1'},
        {value: 'user2'},
        {value: 'user3'},
      ]),

      dataSource,
      columns,
      editingKey: '',
      editableData,
      edit,
      save,
      cancelEdit,
      handleAdd

    };
  },
  mounted() {


  },
  methods: {
    onFinish(values) {
      console.log(values);
      // if (this.title == 'Add') {
      //
      // } else {
      //
      // }
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
      this.formRef.resetFields()
    }
  }

});
</script>

<style lang="scss">
.tableData {
  text-align: left;

  .header {
    .ant-btn {
      width: 140px;
      height: 38px;
      background: rgba(124, 136, 177, 0.4);
      box-shadow: 0px 8px 44px 0px rgba(149, 158, 174, 0.1);
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      line-height: 22px;
      border-radius: 19px;
      font-weight: 400;
      color: #97A0C3;
      border: none;
      cursor: pointer;
    }

    .active {
      background: #E2EBFB;
      font-weight: 600;
      color: #4C92FF;
    }
  }

  .ant-input {
    width: 100%;
    height: 42px;
  }

  .ant-table-content {
    .ant-input {
      width: auto;
      height: 32px;
    }
  }

  .bgc {
    padding: 32px;
    min-height: 65vh;
  }

  .tabName {
    font-size: 22px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #242F57;
    line-height: 30px;
  }

  .btn {

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

  .ant-table-footer {
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    color: #4C92FF;
    line-height: 22px;
    padding: 12px;
    background: #FFFFFF;
  }

}
</style>
