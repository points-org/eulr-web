<template>
	<div class="shareReport">
    <div class="header">
      <div class="title">Share Report</div>
    </div>
    <div class="bgc" style="padding: 32px">
      <a-table :columns="columns" :data-source="dataSource" :pagination="false" bordered>
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
      </a-table>
    </div>
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
		components: {
	
		},
	
		setup() {
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
			return {
        dataSource,
        columns,
        editableData,
        edit,
        save,
        cancelEdit,
			};
		},
		mounted() {
			
	
		},
		methods: {
			
		}
	
	});
</script>

<style lang="scss">
	.shareReport {
    text-align: left;
    .header {
      margin-bottom: 32px;
    }
    .ant-table-wrapper {
      margin-top: 0px;
    }
		
	}
</style>
