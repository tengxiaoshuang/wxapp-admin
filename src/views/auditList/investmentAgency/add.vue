<template>
  <el-dialog :visible.sync="visible" :show-close="false" width="500px" :modal="true" :close-on-click-modal="false" :close-on-press-escape="false">
    <h4 slot="title">新增</h4>
    <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click.stop="cancelModal"><i class="el-dialog__close el-icon el-icon-close"></i></button>
    <el-form @submit.native.prevent ref="enterForm" size="mini" :model="formData" label-position="left" label-width="auto" style="max-width: 450px;">
      <el-form-item label="姓名" prop="name" :rules="[{ required: true, message: '请输入姓名', trigger: 'change' }]">
        <el-input type="name" name="name" autocomplete="on" v-model="formData.name" clearable />
      </el-form-item>
      <el-form-item label="教师介绍" prop="info" :rules="[{ required: true, message: '请输入课程介绍', trigger: 'change' }]">
        <textarea class="textarea" placeholder="请输入" maxlength="110" @input="descInput" v-model="formData.info" />
        <span class="numberV">{{ txtVal }}/110</span>
      </el-form-item>
      <el-form-item label="课程数" prop="coursesCount" :rules="[{ required: true, message: '请输入课程数', trigger: 'change' }]">
        <el-input type="name" name="coursesCount" autocomplete="on" v-model="formData.coursesCount" clearable />
      </el-form-item>
      <el-form-item label="学生数" prop="studentsCount" :rules="[{ required: true, message: '请输入学生数', trigger: 'change' }]">
        <el-input type="name" name="studentsCount" autocomplete="on" v-model="formData.studentsCount" clearable />
      </el-form-item>
      <el-form-item label="教师头像" prop="avatarUrl" :rules="[{ required: true, message: '请上传图片', trigger: 'change' }]">
        <upload :isAvatar='true' :isEdit='false' @imgUrl="imgUrl" uploadBtnWidth="91"></upload>
        <div style="color: red;">(建议图片比例为1:1)</div>
        <el-input style="display: none;" type="name" name="avatarUrl" autocomplete="on" v-model="formData.avatarUrl" clearable />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer"><el-button type="primary" :loading="modalLoading" @click="enterConfirm(formData)">确认</el-button></div>
  </el-dialog>
</template>
<script>
import { mapGetters } from 'vuex';
// import { teachersCreate } from '@/api/seller'; 
// import upload from '@/components/upload';
export default {
  name: 'addfrom',
  // components: { upload },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    courseId: ''
  },
  data() {
    return {
      txtVal: 0,
      formData: {
        id: '',
        name: '',
        info: '',
        coursesCount: 0,
        studentsCount: 0,
        avatarUrl: '',

      },
      modalLoading: false,
      total: 0
    };
  },

  computed: {
    ...mapGetters(['client'])
  },
  methods: {
    imgUrl(url) {
      this.formData.avatarUrl = url;
    },
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
          console.log(this.total);
          let postData = { ...this.formData };
          postData.clientId = this.client.clientId;
          postData.tag = 'star';
          teachersCreate(postData).then(res => {
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
