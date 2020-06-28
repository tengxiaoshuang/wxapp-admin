<template>
  <el-dialog :visible.sync="visible" :show-close="false" width="500px" :modal="true" :close-on-click-modal="false" :close-on-press-escape="false">
    <h4 slot="title">新增</h4>
    <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click.stop="cancelModal"><i class="el-dialog__close el-icon el-icon-close"></i></button>
    <el-form @submit.native.prevent ref="enterForm" size="mini" :model="formData" label-position="left" label-width="auto" style="max-width: 450px;">
     <el-form-item label="标题" prop="title">
        <el-input type="name" name="title" autocomplete="on" v-model="formData.title" clearable />
      </el-form-item>
      <el-form-item label="内容" prop="info" :rules="[{ required: true, message: '请输入内容', trigger: 'change' }]">
        <textarea class="textarea" placeholder="请输入" maxlength="200" @input="descInput" v-model="formData.info" />
        <span class="numberV">{{ txtVal }}/200</span>
      </el-form-item>
      <el-form-item label="时间" :prop="'create_time'" :rules="[{ required: true, message: '时间不能为空', trigger: 'change' }]">
        <el-date-picker v-model="formData.create_time" type="date"></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer"><el-button type="primary" :loading="modalLoading" @click="enterConfirm(formData)">确认</el-button></div>
  </el-dialog>
</template>
<script>
import { createNews } from '@/api/news';
// import upload from '@/components/upload';
export default {
  name: 'addfrom',
  // components: { upload },
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
      formData: {
        id: '',
        title: '',
        info: '',
        create_time: '',
      },
      modalLoading: false,
      total: 0
    };
  },
  methods: {
    descInput() {
      this.txtVal = this.formData.info.length;
    },
    init(total) {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs['enterForm'].resetFields();
        this.total = total;
      });
    },
    enterConfirm(val) {
      this.$refs['enterForm'].validate(valid => {
        if (valid) {
          let postData = { ...this.formData };
          createNews(postData).then(res => {
            this.$emit('update:visible', false);
            this.$emit('updata');
          });
        }
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
  .el-dialog__header{
    padding: 5px;
  }
  .el-dialog__body{
    padding: 10px 20px;
  }
  .textarea{
    width: 300px;
    height: 60px;
  }
</style>
