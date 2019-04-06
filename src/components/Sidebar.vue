<template>
    <div class="manage_page fillcontain">
        <el-row style="height: 100%;">
            <el-col :span="4" style="min-height: 100%; background-color: #545c64">
                <el-menu :default-active="defaultActive" style="min-height: 100%;" class="el-menu-vertical-demo"
                         background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
                    <template>
                        <img src="../assets/1.jpg" class="avator">
                    </template>
                    <el-menu-item index="/Main"><i class="zhao-icon-third-icon_work_fill"></i>
                        &nbsp; 主页
                    </el-menu-item>
                    <el-menu-item  index="/Main"><i class="zhao-icon-third-icon_search"></i> &nbsp;
                        我的预约
                    </el-menu-item>
                    <el-menu-item  index="/showExam"><i class="zhao-icon-third-icon_search"></i>
                        &nbsp; 我的考试发布
                    </el-menu-item>
                    <el-menu-item  index="/publishRes"><i class="zhao-icon-third-icon_calendar"></i>
                        &nbsp; 发布预约
                    </el-menu-item>
                    <el-menu-item  index="/publishExam"><i class="zhao-icon-third-icon_calendar"></i>
                        &nbsp; 发布考试安排
                    </el-menu-item>
                    <el-menu-item index="/personInfo"><i class="zhao-icon-third-icon_boss"></i>
                        &nbsp; 个人信息
                    </el-menu-item>
                    <el-menu-item index="/changePassword"><i class="zhao-icon-third-icon_boss"></i>
                        &nbsp; 修改密码
                    </el-menu-item>

                </el-menu>
            </el-col>
            <el-col :span="20" style="height: 100%;overflow: auto;">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                sidebar_enable: false
            }
        },
        computed: {
            defaultActive: function () {
                return this.$route.path.replace('/', '');
            },

        },
        methods: {}
    }
</script>


<style lang="less" scoped>
    @import '../style/mixin';

    .avator {
        .wh(36px, 36px);
        border-radius: 50%;
        margin-left: 58px;
        margin-top: 15px;
        margin-bottom: 10px
    }
</style>
