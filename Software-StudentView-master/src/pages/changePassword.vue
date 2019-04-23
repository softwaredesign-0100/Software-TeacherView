<template>
  <div class = 'loading' style="min-height: 100%;">
    <head-top></head-top>
    <div>
      <el-dialog
              title="修改密码"
              :visible.sync="ChangePwdVisible"
              :before-close="handleClose"
              size="tiny"
              width="40%"
              :show-close="false"
              center>
        <el-form :model="ChangePwdForm" status-icon :rules="rules2" ref="ChangePwdForm" label-width="80px"
                 class="demo-ruleForm">
          <el-form-item label="原密码">
            <el-col :span=16>
              <el-input type="password" v-model="ChangePwdForm.old_password" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="新密码">
            <el-col :span=16>
              <el-input type="password" v-model="ChangePwdForm.new_password" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="再次输入">
            <el-col :span=16>
              <el-input type="password" v-model="ChangePwdForm.check_password" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
				<el-button @click="resetForm('ChangePwdForm')">取 消</el-button>
				<el-button type="primary" @click="submitChangePwdForm('ChangePwdForm')">确 定</el-button>
			</span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import headTop from '../components/Header'

  export default {
    components : {
      headTop
    },
    inject: ['reload'],
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
      };

      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ChangePwdForm.new_password) {
          callback(new Error(value));
        } else {
          callback();
        }
      };
      return {
        pinl: false,
        activeIndex: '1',
        backcolor: '#49dd84',
        ChangePwdVisible: true,

        ChangePwdForm: {
          old_password: '',
          new_password: '',
          check_password: '',
          account: '',
        },
        rules2: {
          old_password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPassword: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
      }
    },

    mounted() {

    },

    beforeRouteUpdate(to, from, next) {
      console.log(from)
      next()
    },

    methods: {
      submitChangePwdForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('post_data', {
              api: '/api/change_password',
              data: {
                'identify':this.$store.state.identify,
                'account': localStorage.getItem('account'),
                'old_password': this.ChangePwdForm.old_password,
                'new_password': this.ChangePwdForm.new_password
              }
            }).then((response) => {
              if (response.data.status == 200) {
                this.$message({
                  message: '修改密码成功',
                  type: 'success',
                  duration: 3000
                });
                this.$refs[formName].resetFields();
                this.ChangePwdVisible = false
                this.$router.push('/Main')
              } else {
                this.$store.commit({
                  type: 'show_message',
                  status: response.data.status
                })
                this.$message(this.$store.state.app.message_box)
                this.ChangePwdForm.old_password = ''
              }
            }).catch((error) => {
              alert(error)
            })
          } else {
            this.$message({
              message: '请检查格式后重新提交',
              type: 'warning',
              duration: 3000
            });
          }
        });
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.ChangePwdVisible = false;
        this.$router.push('/Main');
      },

      handleClose(done) {
        this.$confirm('不再更正？').then(_ => {
                  done();
          this.reload();
          this.ChangePwdVisible = false;
          this.$router.push('/Main');
          location.reload()
        }).catch(_ => {});
      },

      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

    }
  }
</script>


<style scoped lang="less">
  @import '../style/mixin';

  .header_container {
    height: 60px;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
  }

  .avator {
    .wh(150px, 150px);
    margin-right: 37px;
    margin-top: -40px;
  }

  body {
    background-color: #00c1ff;
    -webkit-transition: background-color 400ms ease-in-out;
    -ms-transition: background-color 400ms ease-in-out;
    -o-transition: background-color 400ms ease-in-out;
    -moz-transition: background-color 400ms ease-in-out;
    transition: background-color 400ms ease-in-out;
  }

  .container {
    position: absolute;
    height: 100%;
    width: 100%;
  }

  #output {
    opacity: 0.3;
    width: 100%;
    height: 100%;
    -webkit-transition: all 400ms ease-in-out;
    -ms-transition: all 400ms ease-in-out;
    -o-transition: all 400ms ease-in-out;
    -moz-transition: all 400ms ease-in-out;
    transition: all 400ms ease-in-out;
  }

  .color {
    width: 210px;
    height: 20px;
    margin: 0 auto;
    position: fixed;
    left: 50%;
    margin-left: -110px;
    bottom: 20px;
  }

  .color li {
    float: left;
    margin: 0 5px;
    width: 20px;
    height: 20px;
    background: #ccc;
    box-shadow: 0 0 4px #FFF;
    list-style: none;
    cursor: pointer;
  }

  .color li:nth-child(1) {
    background: #00c1ff;
  }

  .color li:nth-child(2) {
    background: #49dd84;
  }

  .color li:nth-child(3) {
    background: #ff5a3d;
  }

  .color li:nth-child(4) {
    background: #ffac3f;
  }

  .color li:nth-child(5) {
    background: #2b7cd3;
  }

  .color li:nth-child(6) {
    background: #ff8864;
  }

  .color li:nth-child(7) {
    background: #45ada8;
  }

  .logo {
    width: 140px;
    height: 70px;
    position: fixed;
    top: 10px;
    left: 50%;
    margin-left: -70px;
    border: solid 1px #BBBBBB;
    -webkit-transition: all 400ms ease-in-out;
    -ms-transition: all 400ms ease-in-out;
    -o-transition: all 400ms ease-in-out;
    -moz-transition: all 400ms ease-in-out;
    transition: all 400ms ease-in-out;
  }

  .logo:hover {
    border: solid 1px #FFF;
    background: rgba(255, 255, 255, 0.2);
  }
</style>
