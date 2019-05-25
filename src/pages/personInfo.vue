<template>
    <div class="bg_image">
        <head-top></head-top>
        <div>
            <el-row>

                <el-col :span="10" :offset="6" style="margin-top: 10%">
                    <br/>
                    <span>修改 &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <el-switch v-model="disabled"
                                                                                 @change="changedis"></el-switch></span>
                    <el-form style="margin-top: 2%" :label-position="labelPosition" label-width="80px"
                             :model="personInfo" :rules="rules">
                        <el-form-item label="姓名" prop="name">
                            <el-input :disabled="disabled2" v-model="personInfo.name"></el-input>
                        </el-form-item>
                        <el-form-item label="email">
                            <el-input :disabled="disabled2" v-model="personInfo.email"></el-input>
                        </el-form-item>
                        <el-form-item label="电话号码">
                            <el-input :disabled="disabled2" v-model="personInfo.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="办公地点">
                            <el-input :disabled="disabled2" v-model="personInfo.workplace"></el-input>
                        </el-form-item>
                        <el-form-item label="研究方向">
                            <el-input :disabled="disabled2" v-model="personInfo.direction"></el-input>
                        </el-form-item>
                        <el-form-item label="个人简介">
                            <el-input :disabled="disabled2" type="text" v-model="personInfo.introduction"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" plain :disabled="disabled2" @click="submitPerInfo">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/Header'

    export default {
        name: "personInfo",
        components: {
            headTop
        },

        data() {
            let validatePass = (rule, value, callback) => {
                if (value == '') {
                    callback(new Error('请输入姓名'));
                } else {
                    if (this.SignUpForm.name !== '') {
                        this.$refs.SignUpForm.validateField('name');
                    }
                    callback();
                }
            };
            return {

                labelPosition: 'left',


                disabled: false,
                disabled2: true,
                personInfo: {
                    name: '',
                    email: '',
                    phone: '',
                    direction: '',
                    workplace: '',
                    introduction: '',
                },

                rules: {
                    name: [
                        {validator: validatePass, trigger: 'blur', required: true}
                    ]
                }
            }
        },
        methods: {
            changedis() {
                console.log(this.disabled2)
                this.disabled2 = !this.disabled2
            },

            submitPerInfo() {
                this.$store.dispatch('post_data', {
                    api: '/api/t_submit_own_info',
                    data: {
                        name: this.personInfo.name,
                        email: this.personInfo.email,
                        direction: this.personInfo.direction,
                        introduction: this.personInfo.introduction,
                        workplace: this.personInfo.workplace,
                        phone: this.personInfo.phone,
                        account: localStorage.getItem('account')
                    }
                }).then((response) => {
                    if (response.data.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '发布成功'
                        })
                        this.disabled2 = true
                        localStorage.setItem('personInfo', 'false')
                    } else {
                        this.$store.commit({
                            type: 'show_message',
                            status: response.data.status
                        })
                        this.$message(this.$store.state.app.message_box)
                    }
                }).catch((error) => {
                    // alert(error)
                })
            }

        },

        mounted() {
            console.log(localStorage.getItem('account'))

            this.$store.dispatch('post_data', {
                api: '/api/t_view_own_info',
                data: {
                    'account': localStorage.getItem('account')
                }
            }).then((response) => {
                if (response.data.status == 200) {
                    this.personInfo = response.data.info
                } else {
                    this.$store.commit({
                        type: 'show_message',
                        status: response.data.status
                    })
                    this.$message(this.$store.state.app.message_box)
                }
            }).catch((error) => {
                // alert(error)
            })
        }
    }
</script>

<style scoped>
    .bg_image {
        background-image: url("../assets/bg.jpg");
        /*height: 100%;*/
        background-repeat: repeat;
    }
</style>