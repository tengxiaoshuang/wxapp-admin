<template>
  <el-dialog :visible.sync="visible" :show-close="false" width="800px" :modal="true" :close-on-click-modal="false" :close-on-press-escape="false">
    <h4 slot="title">新增</h4>
    <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click.stop="cancelModal"><i class="el-dialog__close el-icon el-icon-close"></i></button>
    <el-form :model="formData3" :inline="true" ref="formData3" label-width="110px" size="medium">
      <el-row style="border-bottom: 1px solid #f0f0f0;padding: 10px;">
        <el-form-item label="地区" :prop="'location'" :rules="[{ required: true, message: '姓名不能为空', trigger: 'change' }]">
          <el-select clearable v-model="formData3.location" placeholder="请选择所处领域标签">
            <el-option v-for="item in locationOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="职位" :prop="'position'" :rules="[{ required: true, message: '职位不能为空', trigger: 'change' }]">
          <el-input v-model="formData3.position" placeholder="请输入职位" />
        </el-form-item>
        <el-form-item label="邮箱" :prop="'email'" :rules="[{ required: true, message: '邮箱不能为空', trigger: 'change' }]">
          <el-input v-model="formData3.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="微信" :prop="'wechart'" :rules="[{ required: true, message: '微信不能为空', trigger: 'change' }]">
          <el-input v-model="formData3.wechart" placeholder="请输入微信" />
        </el-form-item> -->

        <el-form-item label="企业全称" :prop="'conpanyName'" :rules="[{ required: true, message: '企业全称', trigger: 'change' }]">
          <el-input v-model="formData3.conpanyName" placeholder="请输入企业全称" />
        </el-form-item>
        <el-form-item label="企业名称" :prop="'enterprise'" :rules="[{ required: true, message: '企业名称', trigger: 'change' }]">
          <el-input v-model="formData3.enterprise" placeholder="请输入企业名称" />
        </el-form-item>
        <el-form-item label="拟融资金额" :prop="'amount'" :rules="[{ required: true, message: '拟融资金额不能为空', trigger: 'change' }]">
          <el-input v-model="formData3.amount" placeholder="请输入拟融资金额" />
        </el-form-item>

        <el-form-item label="项目名" :prop="'itemName'" :rules="[{ required: true, message: '项目名不能为空', trigger: 'change' }]">
          <el-input v-model="formData3.itemName" placeholder="请输入项目名" />
        </el-form-item>
        <el-form-item label="项目阶段" :prop="'project'" :rules="[{ required: true, message: '项目阶段不能为空', trigger: 'change' }]">
          <el-select clearable v-model="formData3.project" placeholder="请选择所处项目阶段">
            <el-option v-for="item in projectOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="bp" :prop="'bpFiles'">
          <el-upload
            action="http://upload-z1.qiniup.com"
            list-type="picture-card"
            :class="{ hide: hideUploadBp }"
            :file-list="imagelistBp"
            :on-change="changeBp"
            :on-remove="removeBp"
            :on-success="afterSuccessUploadBp"
            :data="formData3"
          >
            <img v-if="formData3.bpFiles" :src="formData3.bpFiles" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-input style="display: none;" name="bpFiles" autocomplete="on" v-model="formData3.bpFiles" clearable />
        </el-form-item>
        <el-form-item label="logo" :prop="'logoFiles'">
          <el-upload
            action="http://upload-z1.qiniup.com"
            list-type="picture-card"
            :class="{ hide: hideUploadLogo }"
            :file-list="imagelistLogo"
            :on-change="changeLogo"
            :on-remove="removeLogo"
            :on-success="afterSuccessUploadLogo"
            :data="formData3"
          >
            <img v-if="formData3.logoFiles" :src="formData3.logoFiles" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-input style="display: none;" name="logoFiles" autocomplete="on" v-model="formData3.logoFiles" clearable />
        </el-form-item>
        <el-form-item label="一句话简介" :prop="'info'"><el-input v-model="formData3.info" placeholder="请输入一句话简介" /></el-form-item>

        <el-form-item label="法人代表" :prop="'legalName'"><el-input v-model="formData3.legalName" placeholder="请输入社会统法人代表" /></el-form-item>
        <el-form-item label="官网" :prop="'web'"><el-input v-model="formData3.web" placeholder="请输入官网" /></el-form-item>
        <!-- <el-form-item label="投资人推荐" :prop="'recommend'" >
          <textarea class="textarea" placeholder="请输入" maxlength="500" @input="descInputr" v-model="formData3.recommend" />
          <span class="numberV">{{ txtValr }}/500</span>
        </el-form-item> -->
        <el-form-item label="产品及服务" :prop="'productsAndServices'">
          <textarea class="textarea" placeholder="请输入" maxlength="200" v-model="formData3.productsAndServices" />
          <!-- <span class="numberV">{{ producttxtVal }}/200</span> -->
        </el-form-item>
        <el-form-item label="项目介绍" :prop="'introduction'">
          <textarea class="textarea" placeholder="请输入" maxlength="200" v-model="formData3.introduction" />
          <!-- <span class="numberV">{{ introductiontxtVal }}/200</span> -->
        </el-form-item>
        <el-form-item label="目标客户" :prop="'customer'" :rules="[{ required: true, message: '目标客户不能为空', trigger: 'change' }]">
          <el-input v-model="formData3.customer" placeholder="请输入目标客户" />
        </el-form-item>
        <el-form-item label="商业模式" :prop="'pattern'" :rules="[{ required: true, message: '商业模式不能为空', trigger: 'change' }]">
          <el-input v-model="formData3.pattern" placeholder="请输入商业模式" />
        </el-form-item>
        <el-form-item label="运营数据" :prop="'data'" :rules="[{ required: true, message: '运营数据不能为空', trigger: 'change' }]">
          <el-input v-model="formData3.data" placeholder="请输入运营数据" />
        </el-form-item>
        <el-form-item label="新闻链接" :prop="'newUrl'"><el-input v-model="formData3.newUrl" placeholder="新闻链接" /></el-form-item>

        <el-form-item label="成立日期" :prop="'currentDate'" :rules="[{ required: true, message: '时间不能为空', trigger: 'change' }]">
          <el-date-picker v-model="formData3.currentDate" type="date"></el-date-picker>
        </el-form-item>

        <!-- <el-form-item label="所处领域标签" :prop="'tag'" :rules="[{ required: true, message: '所处领域标签不能为空', trigger: 'change' }]">
          <el-select clearable v-model="formData3.tag" placeholder="请选择所处领域标签">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="核心资源" :prop="'resources'" :rules="[{ required: true, message: '核心资源不能为空', trigger: 'change' }]">
          <el-input v-model="formData3.resources" placeholder="请输入核心资源" />
        </el-form-item>
        <el-form-item label="注册资本" :prop="'registeredCapital'" :rules="[{ required: true, message: '注册资本不能为空', trigger: 'change' }]">
          <el-input v-model="formData3.registeredCapital" placeholder="请输入注册资本" />
        </el-form-item>
        <el-form-item label="注册时间" :prop="'registrationDate'" :rules="[{ required: true, message: '时间不能为空', trigger: 'change' }]">
          <el-date-picker v-model="formData3.registrationDate" type="date" value-format="timestamp"></el-date-picker>
        </el-form-item>
        <el-form-item label="相关竞品" :prop="'relatedCompetitive'" :rules="[{ required: true, message: '相关竞品不能为空', trigger: 'change' }]">
          <el-input v-model="formData3.relatedCompetitive" placeholder="请输入相关竞品" />
        </el-form-item>
        <el-form-item label="当前融资需求" :prop="'financingNeeds'" :rules="[{ required: true, message: '当前融资需求不能为空', trigger: 'change' }]">
          <el-input v-model="formData3.financingNeeds" placeholder="请输入当前融资需求" />
        </el-form-item>
        <el-button type="danger" v-if="formData3.length > 1" size="medium" @click="removeRow(index)">删除</el-button>
      </el-row>
      <div>核心团队</div>
      <el-row v-for="(item, index) in formData3.listParams" :key="index + '-'" style="border-bottom: 1px solid #f0f0f0;padding: 10px;">
        <el-form-item label="姓名" :prop="'listParams.' + index + '.name'" :rules="[{ required: true, message: '姓名不能为空', trigger: 'change' }]">
          <el-input v-model="item.name" placeholder="请输入姓名" />
        </el-form-item>

        <el-form-item label="公司名称" :prop="'listParams.' + index + '.company'" :rules="[{ required: true, message: '公司名称不能为空', trigger: 'change' }]">
          <el-input v-model="item.company" placeholder="请输入公司名称" />
        </el-form-item>
        <el-form-item label="职位" :prop="'listParams.' + index + '.position'" :rules="[{ required: true, message: '职位不能为空', trigger: 'change' }]">
          <el-input v-model="item.position" placeholder="请输入职位" />
        </el-form-item>
        <el-form-item label="教育经历" :prop="'listParams.' + index + '.educational'" :rules="[{ required: true, message: '教育经历不能为空', trigger: 'change' }]">
          <textarea class="textarea" placeholder="请输入" maxlength="200" v-model="item.educational" />
          <!-- <span class="numberV">{{ educationaltxtVal }}/200</span> -->
        </el-form-item>
        <el-form-item label="学历" :prop="'listParams.' + index + '.educationalBg'" :rules="[{ required: true, message: '学历不能为空', trigger: 'change' }]">
          <el-input v-model="item.educationalBg" placeholder="请输入学历" />
        </el-form-item>
        <el-form-item label="所在公司职位" :prop="'listParams.' + index + '.post'" :rules="[{ required: true, message: '所在公司职位不能为空', trigger: 'change' }]">
          <el-input v-model="item.post" placeholder="请输入所在公司职位" />
        </el-form-item>
        <el-form-item label="学校" :prop="'listParams.' + index + '.school'" :rules="[{ required: true, message: '学校不能为空', trigger: 'change' }]">
          <el-input v-model="item.school" placeholder="请输入学校" />
        </el-form-item>
        <el-form-item label="专业" :prop="'listParams.' + index + '.major'" :rules="[{ required: true, message: '专业不能为空', trigger: 'change' }]">
          <el-input v-model="item.major" placeholder="请输入专业" />
        </el-form-item>

        <el-form-item label="个人履历" :prop="'listParams.' + index + '.personResume'" :rules="[{ required: true, message: '个人履历不能为空', trigger: 'change' }]">
          <textarea class="textarea" placeholder="请输入" maxlength="300" v-model="item.personResume" />
          <!-- <span class="numberV">{{ persontxtVal }}/300</span> -->
        </el-form-item>
        <el-form-item label="任职履历" :prop="'listParams.' + index + '.positionResume'" :rules="[{ required: true, message: '任职履历不能为空', trigger: 'change' }]">
          <textarea class="textarea" placeholder="请输入" maxlength="300" v-model="item.positionResume" />
          <!-- <span class="numberV">{{ positiontxtVal }}/300</span> -->
        </el-form-item>
        <el-form-item label="开始时间" :prop="'listParams.' + index + '.startTime'" :rules="[{ required: true, message: '时间不能为空', trigger: 'change' }]">
          <el-date-picker v-model="item.startTime" type="date" value-format="timestamp"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" :prop="'listParams.' + index + '.endTime'" :rules="[{ required: true, message: '时间不能为空', trigger: 'change' }]">
          <el-date-picker v-model="item.endTime" type="date" value-format="timestamp"></el-date-picker>
        </el-form-item>
        <el-form-item label="教育开始时间" :prop="'listParams.' + index + '.startTimeEd'" :rules="[{ required: true, message: '时间不能为空', trigger: 'change' }]">
          <el-date-picker v-model="item.startTimeEd" type="date" value-format="timestamp"></el-date-picker>
        </el-form-item>
        <el-form-item label="教育结束时间" :prop="'listParams.' + index + '.startTimeEd'" :rules="[{ required: true, message: '时间不能为空', trigger: 'change' }]">
          <el-date-picker v-model="item.endTimeEd" type="date" value-format="timestamp"></el-date-picker>
        </el-form-item>
        <el-button type="danger" v-if="formData3.listParams.length > 1" size="medium" @click="removeRow(index, 'listParams')">删除</el-button>
      </el-row>
      <el-row><el-button class="btn" type="primary" size="medium" @click="addListParams">添加下一个团队成员</el-button></el-row>
      <!-- <div>股权结构</div>
      <el-row v-for="(item, index) in formData3.ownershipList" :key="index + '_'" style="border-bottom: 1px solid #f0f0f0;padding: 10px;">
        <el-form-item label="股东名称" :prop="'ownershipList.' + index + '.shareholders'" :rules="[{ required: true, message: '股东名称不能为空', trigger: 'change' }]">
          <el-input v-model="item.shareholders" placeholder="请输入股东名称" />
        </el-form-item>
        <el-form-item label="股权比例" :prop="'ownershipList.' + index + '.ownershipRatio'" :rules="[{ required: true, message: '股权比例不能为空', trigger: 'change' }]">
          <el-input v-model="item.ownershipRatio" placeholder="股权比例" />
        </el-form-item>
        <el-button type="danger" v-if="formData3.ownershipList.length > 1" size="medium" @click="removeRow(index, 'ownershipList')">删除</el-button>
      </el-row>
      <el-row><el-button type="primary" size="medium" @click="addOwnershipList">添加下一个股权结构</el-button></el-row> -->
      <div>融资经历</div>
      <el-row v-for="(item, index) in formData3.financeList" :key="index + '#'" style="border-bottom: 1px solid #f0f0f0;padding: 10px;">
        <el-form-item label="投资机构名称" :prop="'financeList.' + index + '.organName'" :rules="[{ required: true, message: '投资机构名称不能为空', trigger: 'change' }]">
          <el-input v-model="item.organName" placeholder="请输入投资机构名称" />
        </el-form-item>
        <el-form-item label="估值" :prop="'financeList.' + index + '.appraisement'" :rules="[{ required: true, message: '估值不能为空', trigger: 'change' }]">
          <el-input v-model="item.appraisement" placeholder="请输入估值" />
        </el-form-item>
        <el-form-item label="融资金额" :prop="'financeList.' + index + '.financingAmount'" :rules="[{ required: true, message: '融资金额不能为空', trigger: 'change' }]">
          <el-input v-model="item.financingAmount" placeholder="请输入融资金额" />
        </el-form-item>
        <el-form-item label="轮次" :prop="'financeList.' + index + '.rounds'" :rules="[{ required: true, message: '轮次不能为空', trigger: 'change' }]">
          <el-select clearable v-model="item.rounds" placeholder="请选择轮次">
            <el-option v-for="item in roundsOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="融资时间" :prop="'financeList.' + index + '.financeTime'" :rules="[{ required: true, message: '时间不能为空', trigger: 'change' }]">
          <el-date-picker v-model="item.financeTime" type="date" value-format="timestamp"></el-date-picker>
        </el-form-item>
        <el-button type="danger" v-if="formData3.financeList.length > 1" size="medium" @click="removeRow(index, 'financeList')">删除</el-button>
      </el-row>
      <el-row><el-button class="btn" type="primary" size="medium" @click="addFinanceList">添加下一个融资经历</el-button></el-row>
    <div>获奖信息</div>
    <el-row v-for="(item, index) in formData3.win" :key="index + '?'" style="border-bottom: 1px solid #f0f0f0;padding: 10px;">
      <el-form-item label="获奖名称" :prop="'win.' + index + '.awardName'">
        <el-input v-model="item.awardName" placeholder="请输入获奖名称" />
      </el-form-item>
      <el-form-item label="颁奖单位" :prop="'win.' + index + '.awardUnit'">
        <el-input v-model="item.awardUnit" placeholder="请输入颁奖单位" />
      </el-form-item>
      <el-form-item label="获奖时间" :prop="'win.' + index + '.awardTime'">
        <el-date-picker v-model="item.awardTime" type="date" value-format="timestamp"></el-date-picker>
      </el-form-item>
      <el-button type="danger" v-if="formData3.win.length > 1" size="medium" @click="removeRow(index, 'win')">删除</el-button>
    </el-row>
    <el-row><el-button class="btn" type="primary" size="medium" @click="addWin">添加下一个获奖信息</el-button></el-row>
    </el-form>
    <div slot="footer" class="dialog-footer"><el-button type="primary" :loading="modalLoading" @click="submit('formData3')">确认</el-button></div>
  </el-dialog>
</template>
<script>
import { mapGetters } from 'vuex';
import { enterprisesCreate } from '@/api/entrepreneur';
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
      hideUploadLogo: false,
      limitCountLogo: 1,
      imagelistLogo: [],
      hideUploadBp: false,
      limitCountBp: 1,
      imagelistBp: [],
      locationOptions: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: '北京',
          label: '北京'
        },
        {
          value: '上海',
          label: '上海'
        },
        {
          value: '深圳',
          label: '深圳'
        },
        {
          value: '成都',
          label: '成都'
        },
        {
          value: '天津',
          label: '天津'
        }
      ],
      roundsOptions: [
        {
          value: '种子轮',
          label: '种子轮'
        },
        {
          value: '天使轮',
          label: '天使轮'
        },
        {
          value: 'RPE-A轮',
          label: 'RPE-A轮'
        },
        {
          value: 'A轮',
          label: 'A轮'
        },
        {
          value: 'A+轮',
          label: 'A+轮'
        },
        {
          value: 'RPE-B轮',
          label: 'RPE-B轮'
        },
        {
          value: 'B轮',
          label: 'B轮'
        },
        {
          value: 'B+轮',
          label: 'B+轮'
        },
        {
          value: 'RPE-C轮',
          label: 'RPE-C轮'
        },
        {
          value: 'C轮',
          label: 'C轮'
        },
        {
          value: 'C+轮',
          label: 'C+轮'
        }
      ],
      projectOptions: [
        {
          value: '种子轮',
          label: '种子轮'
        },
        {
          value: '天使轮',
          label: '天使轮'
        },
        {
          value: 'RPE-A轮',
          label: 'RPE-A轮'
        },
        {
          value: 'A轮',
          label: 'A轮'
        },
        {
          value: 'A+轮',
          label: 'A+轮'
        },
        {
          value: 'RPE-B轮',
          label: 'RPE-B轮'
        },
        {
          value: 'B轮',
          label: 'B轮'
        },
        {
          value: 'B+轮',
          label: 'B+轮'
        },
        {
          value: 'RPE-C轮',
          label: 'RPE-C轮'
        },
        {
          value: 'C轮',
          label: 'C轮'
        },
        {
          value: 'C+轮',
          label: 'C+轮'
        }
      ],
      formData3: {
        id: '',
        // name: '',
        // position: '',
        // email: '',
        // wechart: '',
        enterprise: '',
        amount: '',
        project: '',
        introduction: '',
        status: '',
        logoFiles: '',
        itemName: '',
        unifiedCode: '',
        bPFiles: '',
        legalName: '',
        currentDate: '',
        info: '',
        tag: '',
        web: '',
        recommend: '',
        progectInfo: '',
        newUrl: '',
        location: '',
        conpanyName: '',
        productsAndServices: '',
        customer: '',
        pattern: '',
        data: '',
        resources: '',
        registeredCapital: '',
        registrationDate: '',
        relatedCompetitive: '',
        financingNeeds: '',
        industry: '',

        listParams: [
          {
            name: '',
            position: '',
            personResume: '',
            positionResume: '',
            company: '',
            post: '',
            startTime: '',
            endTime: '',
            school: '',
            educational: '',
            major: '',
            educationalBg: '',
            startTimeEd: '',
            endTimeEd: ''
          }
        ],
        // ownershipList: [
        //   {
        //     shareholders: '',
        //     ownershipRatio: ''
        //   }
        // ],
        financeList: [
          {
            financeTime: '',
            rounds: '',
            financingAmount: '',
            appraisement: '',
            organName: ''
          }
        ],
        win: [
          {
            awardName: '',
            awardTime: '',
            awardUnit: '',
          }
        ]
      },
      // positiontxtVal: 0,
      // producttxtVal: 0,
      // introductiontxtVal: 0,
      // educationaltxtVal: 0,
      // persontxtVal: 0,
      modalLoading: false,
      total: 0,
      moreRules: {
        fieldSort: [
          { required: true, message: '请输入排序', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              if (value < 0) {
                callback(new Error('必须大于0'));
              } else if (value.length > 5) {
                callback(new Error('不超过5位数字'));
              } else if (!value) {
                callback(new Error('排序不能为空'));
              } else {
                callback();
              }
            },
            trigger: 'change'
          }
        ]
      }
    };
  },

  computed: {
    ...mapGetters(['client'])
  },
  methods: {
    changeLogo(file, fileList) {
      this.hideUploadLogo = fileList.length >= this.limitCountLogo;
    },
    removeLogo(file, fileList) {
      this.hideUploadLogo = fileList.length >= this.limitCountLogo
      this.formData3.logoFiles = ''
    },
    afterSuccessUploadLogo(res) {
      this.formData3.logoFiles = 'http://apologize.maodoulive.com/' + res.key;
    },
    changeBp(file, fileList) {
      this.hideUploadBp = fileList.length >= this.limitCountBp;
    },
    removeBp(file, fileList) {
      this.hideUploadBp = fileList.length >= this.limitCountBp
      this.formData3.bPFiles = ''
    },
    afterSuccessUploadBp(res) {
      this.formData3.bPFiles = 'http://apologize.maodoulive.com/' + res.key;
    },
    // Input(val) {
    //   console.log(val)
    //   if(val==1){
    //     this.txtVal = this.formData3.producttxtVal.length;
    //     positiontxtVal: 0,
    //     producttxtVal: 0,
    //     introductiontxtVal: 0,
    //     educationaltxtVal: 0,
    //     persontxtVal: 0,
    //   }
    //   this.txtVal = this.formData3.personResume.length;
    // },

    addListParams() {
      this.formData3.listParams.push({
        name: '',
        position: '',
        personResume: '',
        positionResume: '',
        company: '',
        post: '',
        startTime: '',
        endTime: '',
        school: '',
        educational: '',
        major: '',
        educationalBg: '',
        startTimeEd: '',
        endTimeEd: ''
      });
    },
    // addOwnershipList() {
    //   this.formData3.ownershipList.push({
    //     shareholders: '',
    //     ownershipRatio: ''
    //   });
    // },
    addFinanceList() {
      this.formData3.financeList.push({
        financeTime: '',
        rounds: '',
        financeTime: '',
        financingAmount: '',
        appraisement: '',
        organName: ''
      });
    },
    addWin() {
      this.formData3.win.push({
        awardName: '',
        awardTime: '',
        awardUnit: '',
      });
    },
    // 删除属性列
    removeRow(index, name) {
      if (name == 'listParams') {
        this.formData3.listParams.splice(index, 1);
      } else if (name == 'ownershipList') {
        this.formData3.ownershipList.splice(index, 1);
      } else if (name == 'win') {
        this.formData3.win.splice(index, 1);
      }else {
        this.formData3.financeList.splice(index, 1);
      }
    },
    // 提交
    submit(formName) {
      this.$refs[formName].validate(valid => {
        console.log(this.formData3);
        if (valid) {
          enterprisesCreate(this.formData3).then(res => {
            this.$emit('update:visible', false);
            this.$emit('updata');
          });
        } else {
          return false;
        }
      });
    },
    // imgUrl(url) {
    //   this.formData.avatarUrl = url;
    // },
    init(total) {
      this.visible = true;
      this.$nextTick(() => {
        this.total = total;
      });
    },
    // enterConfirm(val) {
    //   this.$refs['enterForm'].validate(valid => {
    //     if (valid) {
    //       console.log(this.total);
    //       let postData = { ...this.formData };
    //       postData.clientId = this.client.clientId;
    //       postData.tag = 'star';
    //       enterprisesCreate(postData).then(res => {
    //         this.$emit('update:visible', false);
    //         this.$emit('updata');
    //       });
    //     }
    //   });
    // },
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
  width: 220px;
  height: 100px;
}
.el-input--medium .el-input__inner{
  width: 220px;
}
.el-form--inline .el-form-item {
  width: 48%;
}
.btn{
  margin-bottom: 10px;
}
</style>
