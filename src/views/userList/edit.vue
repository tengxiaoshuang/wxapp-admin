<template>
  <el-dialog :visible.sync="visible" :show-close="false" width="500px" :modal="true" :close-on-click-modal="false" :close-on-press-escape="false">
    <h4 slot="title">编辑</h4>
    <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click.stop="cancelModal"><i class="el-dialog__close el-icon el-icon-close"></i></button>
    <el-form @submit.native.prevent ref="enterForm" size="mini" :model="formData" label-position="left" label-width="auto" style="max-width: 450px;">
      <el-form-item label="姓名" prop="nickname" :rules="[{ required: true, message: '请输入姓名', trigger: 'change' }]">
        <el-input type="name" name="name" autocomplete="on" v-model="formData.nickname" clearable />
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="formData.type">
          <el-option label="未认证" value="0"></el-option>
          <el-option label="已认证" value="1"></el-option>
          <el-option label="星会员" value="2"></el-option>
          <el-option label="VIP" value="3"></el-option>
          <el-option label="SVP" value="4"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="教师图片" prop="avatarUrl" :rules="[{ required: true, message: '请上传图片', trigger: 'change' }]">
        <upload :isAvatar='true' :isEdit='true' @imgUrl="imgUrl" uploadBtnWidth="91"></upload>
        <div style="color: red;">(建议图片比例为1:1)</div>
        <el-input style="display: none;" type="name" name="avatarUrl" autocomplete="on" v-model="formData.avatarUrl" clearable />
        <img :src="formData.avatarUrl" style="width: 80px; height: 80px;">
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer"><el-button type="primary" :loading="modalLoading" @click="enterConfirm(formData)">确认</el-button></div>
  </el-dialog>
</template>
<script>
import { mapState } from 'vuex';
import { getUserById,updateUser } from '@/api/userList';
export default {
  name: 'editfrom',
  // components: {upload},
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
      formData: {},
      modalLoading: false
    };
  },

  computed: {
    // ...mapState({
    //   clientId: state => state.global.clientId
    // })
  },
  methods: {
    descInput() {
      this.txtVal = this.formData.info.length;
    },
    init(Id) {
      console.log(Id)
      this.formData.id = Id || 0;
      this.visible = true;
      this.$nextTick(() => {
        if (this.formData.id) {
          getUserById(Id).then(data => {
            this.formData = data.data;
          });
        }
      });
    },
    enterConfirm(val) {
      this.$refs['enterForm'].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.formData));
          Object.keys(params).forEach(key => {
            if (params[key] === '') delete params[key];
          });
          updateUser(params).then(res => {
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
</style>
