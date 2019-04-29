<template>
    <div class='loading' style="min-height: 100%;">
        <head-top></head-top>
        <div>
            <el-row>
                <el-col :span="20" :offset="2" style="margin-top: 5%;">
                    <span style="font-family: Helvetica Neue; font-size: 14px">历史发布考试信息如下：</span>
                    <div class="block">
                        <div class="radio">
                            <span style="font-family: Helvetica Neue; font-size: 14px">排序：</span>
                            <el-radio-group v-model="reverse">
                            <el-radio :label="true">倒序</el-radio>
                            <el-radio :label="false">正序</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="block">
            <el-row>
            <el-col :span="20" :offset="2" style="margin-top: 5%;">
            <el-timeline :reverse="reverse">
                <el-timeline-item
                v-for="(res, index) in resInfo"
                :key="index"
                :timestamp="res.week">
                    <el-col :span="12">
                        <h4>{{res.t_name}}老师</h4>
                        <p>地点：{{res.place}} 时间：{{res.weekday}}&nbsp;{{res.segment}}</p>
                        <p>tips：{{res.tips}}</p>
                    </el-col>
                </el-timeline-item>
            </el-timeline>
            </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/Header'

    export default {
        name: "hisExam",

        components: {
            headTop
        },

        data () {
            return {
                reverse: true,
                activities: [{
                    name:'概率论',
                    start:'8:00',
                    end:'10:00',
                    place:'M302',
                    timestamp: '2018-11-15'
                    }, {
                    name:'数理逻辑',
                    start:'8:00',
                    end:'10:00',
                    place:'M202',
                    timestamp: '2018-05-13'
                    }, {
                    name:'计算机网络',
                    start:'8:00',
                    end:'10:00',
                    place:'M102',
                    timestamp: '2018-04-11'
                }],
                search: '',
                resInfo: []
            }
        },

        methods: {
            
        },

        mounted() {

            this.$store.dispatch('post_data', {
                api: '/api/view_his_res',
                data: {

                }
            }).then((response) => {
                if (response.data.status == 200) {
                    this.resInfo = response.data.ress
                    for (let i = 0; i < this.resInfo.length; i = i + 1) {
                        this.resInfo[i]['week'] = this.$store.state.map_week[this.resInfo[i]['week']]
                        this.resInfo[i]['weekday'] = this.$store.state.map_weekday[this.resInfo[i]['weekday']]
                    }
                } else {
                    this.$store.commit({
                        type: 'show_message',
                        status: response.data.status
                    })
                    console.log(response.data.status)
                    this.$message(this.$store.state.app.message_box)
                }
            }).catch((error) => {
                alert(error)
            })
        }
    }
</script>

<style scoped>

</style>