<template>
  <el-dialog :visible.sync="visible" :show-close="false" width="90%" :modal="true" :close-on-click-modal="false" :close-on-press-escape="false">
    <!-- <h4 slot="title">审核</h4> -->
    <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click.stop="cancelModal"><i class="el-dialog__close el-icon el-icon-close"></i></button>
    <div class="title">投资人基本信息</div>
    <el-table border :data="formData" style="width: 100%;margin-left:20px">
      <el-table-column label="姓名" align="center" prop="name"></el-table-column>
      <el-table-column label="职位" align="center" prop="position"></el-table-column>
      <el-table-column label="邮箱" align="center" prop="personEmail"></el-table-column>
      <el-table-column label="电话" align="center" prop="phone"></el-table-column>
      <el-table-column label="机构" align="center" prop="organization"></el-table-column>
      <el-table-column label="微信号" align="center" prop="wxchart"></el-table-column>
      <el-table-column label="头像" align="center" prop="avatarFiles"></el-table-column>
      <el-table-column label="名片" align="center" prop="cardFiles"></el-table-column>
    </el-table>
    <el-table border :data="formData" style="width: 100%;margin-left:20px;margin-top: 20px;">
      <el-table-column label="个人简介" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <textarea disabled class="textarea" placeholder="请输入" maxlength="300" v-model="scope.row.profile" />
            <!-- <span class="numberV">{{ txtVal }}/200</span> -->
            <div slot="reference" class="name-wrapper"><el-tag size="medium">个人简介</el-tag></div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="工作邮箱" align="center" prop="workEmail"></el-table-column>
      <el-table-column label="关注行业" align="center" prop="focusIndustry"></el-table-column>
      <el-table-column label="偏好轮次" align="center" prop="preferenceRounds"></el-table-column>
      <el-table-column label="关注项目所处地区" align="center" prop="focusArea"></el-table-column>
    </el-table>
    <div class="title">任职履历</div>
    <el-table key="listTable" border :data="data.resume" fit highlight-current-row style="width: 100%;margin-left:20px">
      <el-table-column label="序号" type="index" align="left" width="60"></el-table-column>
      <el-table-column align="center" prop="company" label="所在公司/机构"></el-table-column>
      <el-table-column align="center" prop="position" label="职位"></el-table-column>
      <el-table-column align="center" prop="startTime" label="开始时间"></el-table-column>
      <el-table-column align="center" prop="endTime" label="结束时间"></el-table-column>
    </el-table>
    <div class="title">教育经历</div>
    <el-table border :data="data.educations" style="width: 100%;margin-left:25px">
      <el-table-column label="学校" align="center" prop="school"></el-table-column>
      <el-table-column label="专业" align="center" prop="major"></el-table-column>
      <el-table-column label="学历" align="center" prop="educationalBg"></el-table-column>
      <el-table-column align="center" prop="startTimeEd" label="开始时间"></el-table-column>
      <el-table-column align="center" prop="startTimeEd" label="结束时间"></el-table-column>
    </el-table>
    <div class="title">获奖经历</div>
    <el-table border :data="data.win" style="width: 100%;margin-left:20px">
      <el-table-column label="获奖名称" align="center" prop="awardName"></el-table-column>
      <el-table-column label="获奖时间" align="center" prop="AwardTime"></el-table-column>
      <el-table-column label="颁奖单位" align="center" prop="awardUnit"></el-table-column>
    </el-table>
    <div v-if="show" slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="modalLoading" @click="enterConfirm('1')">通过</el-button>
      <el-button type="primary" :loading="modalLoading" @click="enterConfirm('0')">不通过</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapState } from 'vuex';
import { getListById, audit } from '@/api/investors';
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
          getListById(32).then(data => {
            this.data = data.data;
            this.formData.push(data.data);
            this.data.resume = data.data.resume.map(x => ({
              ...x,
              startTime: moment(x.startTime).format('YYYY-MM-DD'),
              endTime: moment(x.endTime).format('YYYY-MM-DD')
            }));
            this.data.educations = data.data.educations.map(x => ({
              ...x,
              startTime: moment(x.startTime).format('YYYY-MM-DD'),
              endTime: moment(x.endTime).format('YYYY-MM-DD')
            }));
            this.data.win = data.data.win.map(x => ({
              ...x,
              AwardTime: moment(x.AwardTime).format('YYYY-MM-DD'),
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
