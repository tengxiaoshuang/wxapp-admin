<template>
  <el-dialog :visible.sync="visible" :show-close="false" width="550px" :modal="true" :close-on-click-modal="false" :close-on-press-escape="false">
    <h4 slot="title">新增</h4>
    <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click.stop="cancelModal"><i class="el-dialog__close el-icon el-icon-close"></i></button>
    <el-form ref="enterForm" :model="formData" label-position="left" label-width="auto" style="max-width: 600px;">
          <el-form-item label="链接" prop="title"><el-input v-model="formData.url" clearable /></el-form-item>
          <el-form-item label="内容" prop="info">
            <textarea class="textarea" placeholder="请输入" maxlength="200" @input="descInput" v-model="formData.info" />
            <span class="numberV">{{ txtVal }}/200</span>
          </el-form-item>
        </el-form>
    <div slot="footer" class="dialog-footer"><el-button type="primary" :loading="modalLoading" @click="enterConfirm(formData)">确认</el-button></div>
  </el-dialog>
</template>
<script>
import { getToken,updateById, getListById } from '@/api/news';
// import upload from '@/components/upload';
export default {
  name: 'editfrom',
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
      formData: {},
      modalLoading: false,
      total: 0,
    };
  },

  methods: {
    descInput() {
      this.txtVal = this.data.info.length;
    },
    init(id) {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs['enterForm'].resetFields();
        getListById(id).then(data => {
          console.log(data)
          // this.data = data.data;
          this.txtVal = data.data.info.length;
          this.formData=data.data;
        });
      });
    },
    enterConfirm(val) {
          let postData = { ...this.formData };
          updateById(postData).then(res => {
            this.$emit('update:visible', false);
            this.$emit('updata');
          });
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
.hide .el-upload--picture-card {
    display: none;
}
</style>
