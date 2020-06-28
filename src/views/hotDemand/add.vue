<template>
  <el-dialog :visible.sync="visible" :show-close="false" width="550px" :modal="true" :close-on-click-modal="false" :close-on-press-escape="false">
    <h4 slot="title">新增</h4>
    <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click.stop="cancelModal"><i class="el-dialog__close el-icon el-icon-close"></i></button>
    <el-form @submit.native.prevent ref="enterForm" size="mini" :model="formData" label-position="left" label-width="auto" style="max-width: 450px;">
      <el-form-item label="标题" :rules="[{ required: true, message: '标题不能为空', trigger: 'change' }]">
        <el-input v-model="formData.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="状态"><el-input v-model="formData.status" placeholder="请输入标题" /></el-form-item>
      <el-form-item label="标签" :rules="[{ required: true, message: '标签不能为空', trigger: 'change' }]">
        <el-select v-model="formData.type" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" :rules="[{ required: true, message: '请输入描述', trigger: 'change' }]">
        <textarea class="textarea" placeholder="请输入" maxlength="200" @input="descInput" v-model="formData.describe" />
        <span class="numberV">{{ txtVal }}/200</span>
      </el-form-item>
      <el-form-item label="logo" :prop="'url'">
        <el-upload
          action="http://upload-z1.qiniup.com"
          list-type="picture-card"
          :class="{ hide: hideUpload }"
          :file-list="imagelist"
          :on-change="change"
          :on-remove="remove"
          :on-success="afterSuccessUpload"
          :data="formData"
        >
          <img v-if="formData.url" :src="formData.url" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-input style="display: none;" name="url" autocomplete="on" v-model="formData.url" clearable />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer"><el-button type="primary" :loading="modalLoading" @click="enterConfirm(formData)">确认</el-button></div>
  </el-dialog>
</template>
<script>
import { mapGetters } from 'vuex';
import { getToken, createhotDemand } from '@/api/hotDemand';
// import upload from '@/components/upload';
export default {
  name: 'addfrom',
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
        url: '',
        title: '',
        describe: '',
        type: ''
      },
      modalLoading: false,
      total: 0,
      hideUpload: false,
      limitCount: 1,
      imagelist: [],
      options: [
        {
          value: '融资',
          label: '融资'
        },
        {
          value: '人才',
          label: '人才'
        },
        {
          value: '资源合作',
          label: '资源合作'
        },
        {
          value: '技术',
          label: '技术'
        }
      ]
    };
  },

  computed: {
    ...mapGetters(['client'])
  },
  created() {
    getToken().then(res => {
      this.formData.token = res.data;
    });
  },
  methods: {
    descInput() {
      this.txtVal = this.formData.describe.length;
    },
    change(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
    },
    remove(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
      this.formData.url = ''
    },
    afterSuccessUpload(res) {
      this.formData.url = 'http://apologize.maodoulive.com/' + res.key;
    },
    init() {
      this.visible = true;
      // this.$nextTick(() => {
      //   this.$refs['enterForm'].resetFields();
      // });
    },
    enterConfirm(val) {
      this.$refs['enterForm'].validate(valid => {
        if (valid) {
          this.formData.status = '1';
          let postData = { ...this.formData };
          createhotDemand(postData).then(res => {
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
.hide .el-upload--picture-card {
  display: none;
}
.el-upload--picture-card {
  width: 263px;
  height: 148px;
}
</style>
