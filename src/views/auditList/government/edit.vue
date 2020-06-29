<template>
  <el-dialog :visible.sync="visible" :show-close="false" width="500" :modal="true" :close-on-click-modal="false" :close-on-press-escape="false">
    <!-- <h4 slot="title">审核</h4> -->
    <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click.stop="cancelModal"><i class="el-dialog__close el-icon el-icon-close"></i></button>
    <div class="title">投资协会审核</div>
    <el-form ref="enterForm" :model="data" label-position="left" label-width="auto" style="max-width: 500px;">
      <el-form-item label="协会全称" prop="title"><el-input disabled v-model="data.name" clearable /></el-form-item>
      <el-form-item label="协会相关职能介绍" prop="title">
        <textarea disabled class="textarea" placeholder="请输入" maxlength="300" @input="descInput" v-model="data.intro" />
        <span class="numberV">{{ txtVal }}/300</span>
      </el-form-item>
      <el-form-item label="协会LOGO" prop="title">
        <img :src="data.logoFiles"></img>
      </el-form-item>
      <el-form-item label="代理人证人职位" prop="title"><el-input disabled v-model="data.post" clearable /></el-form-item>
      <el-form-item label="代理人证人电话" prop="title"><el-input disabled v-model="data.phone" clearable /></el-form-item>
      <el-form-item label="协会官网" prop="title"><el-input disabled v-model="data.website" clearable /></el-form-item>
      <el-form-item label="协会地址" prop="title"><el-input disabled v-model="data.address" clearable /></el-form-item>
      <el-form-item label="名片上传" prop="title"><el-input disabled v-model="data.cardFiles" clearable /></el-form-item>
      <el-form-item label="单位电话" prop="title"><el-input disabled v-model="data.unitPhone" clearable /></el-form-item>
      <el-form-item label="工作邮箱" prop="title"><el-input disabled v-model="data.email" clearable /></el-form-item>
      <el-form-item label="相关证件" prop="title"><el-input disabled v-model="data.papersFiles" clearable /></el-form-item>
    </el-form>
    <div v-if="show" slot="footer" style="text-align: center;" class="dialog-footer">
      <el-button type="primary" :loading="modalLoading" @click="enterConfirm('1')">通过</el-button>
      <el-button type="primary" :loading="modalLoading" @click="enterConfirm('0')">不通过</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapState } from 'vuex';
import { getListById, audit } from '@/api/government';
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
      this.txtVal = this.data.intro.length;
    },
    init(Id, show) {
      this.visible = true;
      this.enid = Id;
      this.show = show;
      this.$nextTick(() => {
        if (Id) {
          getListById(Id).then(data => {
            this.data = data.data;
            this.txtVal = data.data.intro.length;
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
