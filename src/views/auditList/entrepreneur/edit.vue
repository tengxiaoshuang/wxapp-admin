<template>
  <el-dialog :visible.sync="visible" :show-close="false" width="90%" :modal="true" :close-on-click-modal="false" :close-on-press-escape="false">
    <!-- <h4 slot="title">审核</h4> -->
    <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click.stop="cancelModal"><i class="el-dialog__close el-icon el-icon-close"></i></button>
    <div class="title">创业者基本信息</div>
    <el-table border :data="formData" style="width: 100%;margin-left:20px">
      <el-table-column label="姓名" align="center" prop="name"></el-table-column>
      <el-table-column label="职业" align="center" prop="position"></el-table-column>
      <el-table-column label="邮箱" align="center" prop="email"></el-table-column>
      <el-table-column label="公司名称" align="center" prop="enterprise"></el-table-column>
      <el-table-column label="微信号" align="center" prop="wechart"></el-table-column>
    </el-table>
    <div class="title">项目信息</div>
    <el-table key="listTable" border :data="data.progect" fit highlight-current-row style="width: 100%;margin-left:20px">
      <el-table-column label="序号" type="index" align="left" width="60"></el-table-column>
      <el-table-column prop="logoFiles" align="center" label="企业Logo"></el-table-column>
      <el-table-column prop="itemName" align="center" label="项目名"></el-table-column>
      <el-table-column prop="unifiedCode" align="center" label="统一社会信用代码"></el-table-column>
      <el-table-column prop="bPFiles" align="center" label="BP"></el-table-column>
      <el-table-column prop="currentDate" align="center" label="成立时间"></el-table-column>
      <el-table-column prop="legalName" align="center" label="法人代表"></el-table-column>
    </el-table>
    <div class="title">核心团队</div>
    <el-table border :data="data.team" style="width: 100%;margin-left:20px">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table border :data="props.row.education" style="width: 100%;margin-left:25px">
            <el-table-column label="学校" align="center" prop="school"></el-table-column>
            <el-table-column label="专业" align="center" prop="major"></el-table-column>
            <el-table-column label="学历" align="center" prop="educationalBg"></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center" prop="categoryName"></el-table-column>
      <el-table-column label="职位" align="center" prop="categoryPosition"></el-table-column>
      <el-table-column label="个人履历" align="center" prop="personResume"></el-table-column>
      <el-table-column label="任职履历" align="center" prop="positionResume"></el-table-column>
      <el-table-column label="所在公司" align="center" prop="company"></el-table-column>
      <el-table-column label="若在公司职位" align="center" prop="post"></el-table-column>
      <el-table-column label="开始时间" align="center" prop="startTime"></el-table-column>
      <el-table-column label="结束时间" align="center" prop="endTime"></el-table-column>
    </el-table>
    <div class="title">股权结构</div>
    <el-table border :data="data.equitytwo" style="width: 100%;margin-left:20px">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table border :data="data.equityone" style="width: 100%;margin-left:20px">
            <el-table-column label="股东名称" align="center" prop="shareholders"></el-table-column>
            <el-table-column label="股权比例" align="center" prop="ownershipRatio"></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="拟融资金额" align="center" prop="amount"></el-table-column>
      <el-table-column label="项目阶段" align="center" prop="project"></el-table-column>
      <el-table-column label="项目介绍" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <textarea disabled class="textarea" placeholder="请输入" maxlength="200" v-model="scope.row.introduction" />
            <!-- <span class="numberV">{{ txtVal }}/200</span> -->
            <div slot="reference" class="name-wrapper"><el-tag size="medium">项目介绍</el-tag></div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <div class="title">融资经历</div>
    <el-table border :data="data.financing" style="width: 100%;margin-left:20px">
      <el-table-column label="投资机构" align="center" prop="organName"></el-table-column>
      <el-table-column label="融资金额" align="center" prop="financingAmount"></el-table-column>
      <el-table-column label="融资轮次" align="center" prop="rounds"></el-table-column>
      <el-table-column label="估值" align="center" prop="appraisement"></el-table-column>
    </el-table>
    <div v-if="show" slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="modalLoading" @click="enterConfirm('1')">通过</el-button>
      <el-button type="primary" :loading="modalLoading" @click="enterConfirm('0')">不通过</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapState } from 'vuex';
import { getListById, audit } from '@/api/entrepreneur';
import moment from 'moment';
export default {
  name: 'editfrom',
  // components: {upload},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: ''
  },
  data() {
    return {
      txtVal: 0,
      formData: [],
      modalLoading: false,
      enid: 0,
      data: {},
      show: true
    };
  },

  computed: {
    // ...mapState({
    //   clientId: state => state.global.clientId
    // })
  },
  methods: {
    // descInput() {
    //   this.txtVal = this.formData.info.length;
    // },
    init(Id, show) {
      this.visible = true;
      this.enid = Id;
      this.show = show;
      this.$nextTick(() => {
        if (Id) {
          getListById(Id).then(data => {
            this.data = data.data;
            this.formData.push(data.data);
            this.data.progect = data.data.progect.map(x => ({
              ...x,
              currentDate: moment(x.currentDate).format('YYYY-MM-DD')
            }));
            this.data.team = data.data.team.map(x => ({
              ...x,
              startTime: moment(x.startTime).format('YYYY-MM-DD'),
              endTime: moment(x.endTime).format('YYYY-MM-DD')
            }));
          });
        }
      });
    },
    enterConfirm(int) {
      if (int == '1') {
        audit(this.enid).then(data => {
          this.$emit('updata');
          this.$emit('update:visible', false);
        });
      } else {
        this.$emit('update:visible', false);
      }
    },
    cancelModal() {
      // 关闭弹窗，触发父组件修改visible值
      this.$emit('update:visible', false);
    }
  }
};
</script>
<style>
.el-dialog__header {
  padding: 5px;
}
.el-dialog__body {
  padding: 10px 20px;
}
.textarea {
  width: 300px;
  height: 60px;
}
.title {
  display: block;
  margin: 20px;
  font-size: 18px;
  font-weight: 600;
  color: #409eff;
}
</style>
