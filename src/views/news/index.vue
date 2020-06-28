<template>
  <div class="app-container">
    <edit-order ref="editOrder" v-if="editOrderVisible" @updata="updataTable" :visible.sync="editOrderVisible"></edit-order>
    <add-order ref="addOrder" v-if="addOrderVisible" @updata="updataTable" :visible.sync="addOrderVisible"></add-order>
    <el-button type="success" size="small" @click="addUpdateHandle()">新增</el-button>
    <el-table key="listTable" v-loading="listLoading" :data="list" fit highlight-current-row style="width: 100%;">
      <el-table-column label="序号" type="index" align="left" width="60" :index="index => index + 1 + listQuery.size * (listQuery.page - 1)"></el-table-column>
      <el-table-column align="center" label="内容">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div>{{ scope.row.info }}</div>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">内容</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="title" align="center" label="标题"></el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{ row }">
          <div style="display: flex; justify-content: center;">
            <el-button type="warning" size="small" @click="editUpdateHandle(row.id)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteUpdateHandle(row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="fetchData" /> -->
  </div>
</template>

<script type="text/babel">
import { mapGetters } from 'vuex';
import { getList, delById } from '@/api/news';
// import Pagination from '@/components/Pagination'
import Edit from './edit';
import Add from './add';
// var momentDurationFormatSetup = require('moment-duration-format');
// momentDurationFormatSetup(moment);

export default {
  components: {
    // Pagination,
    'edit-order': Edit,
    'add-order': Add
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      editOrderVisible: false,
      addOrderVisible: false,
      listQuery: {
        page: 1,
        size: 10
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      let params = JSON.parse(JSON.stringify(this.listQuery));
      Object.keys(params).forEach(key => {
        if (params[key] === '') delete params[key];
      });
      params.page = params.page - 1;
      getList(params).then(data => {
        this.list = data.data;
        this.total = data.total;
        this.listLoading = false;
      });
    },
    editUpdateHandle(Id) {
      this.editOrderVisible = true;
      this.$nextTick(() => {
        this.$refs.editOrder.init(Id);
        // this.$refs.Edit.init(courseId)
      });
    },
    addUpdateHandle() {
      this.addOrderVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrder.init(this.total);
        // this.$refs.Edit.init(courseId)
      });
    },
    deleteUpdateHandle(id) {
      this.$alert('确定删除该图片吗？', '删除', {
        confirmButtonText: '确定',
        callback: action => {
          if (action == 'confirm') {
            delById(id).then(res => {
              this.updataTable();
            });
          }
        }
      });
    },
    updataTable() {
      this.fetchData();
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.fetchData();
    }
  }
};
</script>
