<template>
  <div class="app-container">
    <edit-order ref="editOrder" v-if="editOrderVisible" @updata="updataTable" :visible.sync="editOrderVisible"></edit-order>
    <add-order ref="addOrder" v-if="addOrderVisible" @updata="updataTable" :visible.sync="addOrderVisible"></add-order>
    <!-- <el-button type="success" size="small" @click="addUpdateHandle()">新增</el-button> -->
    <div class="filter-container" style="display: inline-block;padding-left: 20px;">
      <el-input
        clearable
        @clear="handleFilter"
        v-model="listQuery.name"
        placeholder="机构名称"
        style="width: 130px;"
        class="filter-item"
        @change="handleFilter"
        @keyup.enter.native="handleFilter"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>

    </div>
    <el-table key="listTable" v-loading="listLoading" :data="list" fit highlight-current-row style="width: 100%;">
      <el-table-column label="序号" type="index" align="left" width="60" :index="index => index + 1 + listQuery.size * (listQuery.page-1)"></el-table-column>
      <!-- <el-table-column prop="id" align="center" style="display: none;" label="id"></el-table-column> -->
      <el-table-column prop="name" align="center" label="机构名称"></el-table-column>
      <el-table-column prop="organizationName" align="center" label="机构全称"></el-table-column>
      <el-table-column prop="organizationType" align="center" label="机构类型"></el-table-column>
      <el-table-column prop="wxcharts" align="center" label="机构微信"></el-table-column>
      <el-table-column prop="email" align="center" label="机构邮箱"></el-table-column>
      <el-table-column prop="phone" align="center" label="机构电话"></el-table-column>
      <el-table-column prop="status" align="center" :formatter="statusFormat" label="状态"></el-table-column>
      <el-table-column label="操作" align="center" width="100" class-name="small-padding fixed-width">
        <template slot-scope="{ row }">
          <div style="display: flex; justify-content: center;">
            <el-button size="small" @click="editUpdateHandle(row.id,row.status)">{{row.status == '1'?'查看':'审核'}}</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="fetchData" />
  </div>
</template>

<script type="text/babel">
import { mapGetters } from 'vuex';
import { getList } from '@/api/investmentAgency';
import Pagination from '@/components/Pagination';
import Edit from './edit';
import Add from './add';
// var momentDurationFormatSetup = require('moment-duration-format');
// momentDurationFormatSetup(moment);

export default {
  components: {
    Pagination,
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
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    statusFormat(row, column) {
      if (row.status == 0) {
        return '审核中';
      }else{
        return '已审核';
      }
    },
    fetchData() {
      this.listLoading = true;
      let params = JSON.parse(JSON.stringify(this.listQuery));
      Object.keys(params).forEach(key => {
        if (params[key] === '') delete params[key];
      });
      params.page = params.page-1
      getList(params).then(data => {
        this.list = data.data;
        this.total = data.total;
        this.listLoading = false;
      });
    },
    editUpdateHandle(Id,type) {
      if(type==0){
        var show = true
      }else{
        var show = false
      }
      console.log(type)
      this.editOrderVisible = true;
      this.$nextTick(() => {
        this.$refs.editOrder.init(Id,show);
        // this.$refs.Edit.init(courseId)
      });
    },
    // addUpdateHandle() {
    //   this.addOrderVisible = true;
    //   this.$nextTick(() => {
    //     this.$refs.addOrder.init(this.total);
    //     // this.$refs.Edit.init(courseId)
    //   });
    // },
    // deleteUpdateHandle(id) {
    //   this.$alert('确定删除该用户吗？', '删除', {
    //     confirmButtonText: '确定',
    //     callback: action => {
    //       if (action == 'confirm') {
    //         delUser(id).then(res => {
    //           this.updataTable();
    //         });
    //       }
    //     }
    //   });
    // },
    updataTable() {
      this.fetchData();
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.fetchData();
    },
  }
};
</script>
