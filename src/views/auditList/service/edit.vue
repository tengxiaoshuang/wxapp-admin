<template>
  <el-dialog :visible.sync="visible" :show-close="false" width="500" :modal="true" :close-on-click-modal="false" :close-on-press-escape="false">
    <!-- <h4 slot="title">审核</h4> -->
    <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click.stop="cancelModal"><i class="el-dialog__close el-icon el-icon-close"></i></button>
    <div class="title">服务机构审核</div>
    <el-form ref="enterForm" :model="data" label-position="left" label-width="auto" style="max-width: 500px;">
      <el-form-item label="机构名称" prop="title"><el-input disabled v-model="data.name" clearable /></el-form-item>
      <el-form-item label="机构全称" prop="title"><el-input disabled v-model="data.organizationName" clearable /></el-form-item>
      <el-form-item label="机构介绍" prop="title">
        <textarea disabled class="textarea" placeholder="请输入" maxlength="300" @input="descInput" v-model="data.organizationIntro" />
        <span class="numberV">{{ txtVal }}/300</span>
      </el-form-item>
      <el-form-item label="机构LOGO" prop="title">
        <img :src="data.logoFiles"></img>
      </el-form-item>
      
      <el-form-item label="机构官网" prop="title"><el-input disabled v-model="data.officialWebsite" clearable /></el-form-item>
      <el-form-item label="机构地址" prop="title"><el-input disabled v-model="data.address" clearable /></el-form-item>
      <el-form-item label="机构类型" prop="title"><el-input disabled v-model="data.organizationType" clearable /></el-form-item>
      <el-form-item label="机构电话" prop="title"><el-input disabled v-model="data.phone" clearable /></el-form-item>
      <el-form-item label="机构微信" prop="title"><el-input disabled v-model="data.wxcharts" clearable /></el-form-item>
      <el-form-item label="机构邮箱" prop="title"><el-input disabled v-model="data.email" clearable /></el-form-item>
      <el-form-item label="成立时间">
        <el-col :span="11"><el-date-picker disabled type="date" placeholder="选择日期" v-model="data.currentDate" style="width: 100%;"></el-date-picker></el-col>
      </el-form-item>
    </el-form>
    <div v-if="show" slot="footer" style="text-align: center;" class="dialog-footer">
      <el-button type="primary" :loading="modalLoading" @click="enterConfirm('1')">通过</el-button>
      <el-button type="primary" :loading="modalLoading" @click="enterConfirm('0')">不通过</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapState } from 'vuex';
import { getListById, audit } from '@/api/service';
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
    descInput() {
      this.txtVal = this.data.organizationIntro.length;
    },
    init(Id, show) {
      this.visible = true;
      this.enid = Id;
      this.show = show;
      this.$nextTick(() => {
        if (Id) {
          getListById(Id).then(data => {
            this.data = data.data;
            this.txtVal = data.data.organizationIntro.length;
            this.formData.push(data.data);
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
