<template>
  <el-dialog :visible.sync="visible" :show-close="false" width="550px" :modal="true" :close-on-click-modal="false" :close-on-press-escape="false">
    <h4 slot="title">新增</h4>
    <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click.stop="cancelModal"><i class="el-dialog__close el-icon el-icon-close"></i></button>
    <el-form @submit.native.prevent ref="enterForm" size="mini" :model="formData" label-position="left" label-width="auto" style="max-width: 450px;">
      <el-form-item label="标题" :prop="'title'" :rules="[{ required: true, message: '标题不能为空', trigger: 'change' }]">
        <el-input v-model="formData.title" placeholder="请输入标题" />
      </el-form-item>
      <!-- <el-form-item label="标签" :prop="'type'" :rules="[{ required: true, message: '标签不能为空', trigger: 'change' }]">
        <el-select clearable v-model="formData.type" placeholder="请选择标签">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="描述" :prop="'describe'" :rules="[{ required: true, message: '请输入描述', trigger: 'change' }]">
        <textarea class="textarea" placeholder="请输入" maxlength="200" @input="descInput" v-model="formData.describe" />
        <span class="numberV">{{ txtVal }}/200</span>
      </el-form-item>
      <!-- <el-form-item label="logo" :prop="'url'">
        <el-upload
          action="http://upload-z1.qiniup.com"
          list-type="picture-card"
          :class="{ hide: hideUpload }"
          :file-list="imagelist"
          :on-change="change"
          :on-remove="remove"
          :on-success="afterSuccessUpload"
          :data="formData">
          <img v-if="formData.url" :src="formData.url" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-input style="display: none;" name="url" autocomplete="on" v-model="formData.url" clearable />
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer"><el-button type="primary" :loading="modalLoading" @click="enterConfirm(formData)">确认</el-button></div>
  </el-dialog>
</template>
<script>
import { mapGetters } from 'vuex';
import { getToken, getListById, updateById } from '@/api/dynamic';
// import upload from '@/components/upload';
export default {
  name: 'addfrom',
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
        url: '',
        title: '',
        describe: '',
        // type: ''
      },
      modalLoading: false,
      total: 0,
      hideUpload: false,
      limitCount: 1,
      imagelist: [],
      // options: [
      //   {
      //     value: '找投资',
      //     label: '找投资'
      //   },
      //   {
      //     value: '找贷款',
      //     label: '找贷款'
      //   },
      //   {
      //     value: '找咨询',
      //     label: '找咨询'
      //   },
      //   {
      //     value: '找培训',
      //     label: '找培训'
      //   },
      //   {
      //     value: '找活动',
      //     label: '找活动'
      //   },
      //   {
      //     value: '找客户',
      //     label: '找客户'
      //   },
      //   {
      //     value: '找技术',
      //     label: '找技术'
      //   },
      //   {
      //     value: '找人才',
      //     label: '找人才'
      //   },
      //   {
      //     value: '找宣传',
      //     label: '找宣传'
      //   },
      //   {
      //     value: '找供应链',
      //     label: '找供应链'
      //   },
      //   {
      //     value: '其他',
      //     label: '其他'
      //   }
      // ]
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
    },
    afterSuccessUpload(res) {
      this.formData.url = 'http://apologize.maodoulive.com/' + res.key;
    },
    init(id) {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs['enterForm'].resetFields();
        getListById(id).then(data => {
          console.log(data);
          // this.data = data.data;
          this.txtVal = data.data.describe.length;
          this.formData = data.data;
        });
      });
    },
    enterConfirm(val) {
      this.$refs['enterForm'].validate(valid => {
        if (valid) {
          let postData = { ...this.formData };
          updateById(postData).then(res => {
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
