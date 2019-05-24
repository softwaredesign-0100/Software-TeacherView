<template>
    <div class='loading' style="min-height: 100%;">
        <head-top></head-top>
        <div>
            <el-row>
                <el-col :span="20" :offset="2" style="margin-top: 5%;">
                    <span style="font-family: Helvetica Neue; font-size: 14px">历史预约信息如下：</span>
                    <div class="block">
                        <div class="radio">
                            <span style="font-family: Helvetica Neue; font-size: 14px">排序：</span>
                            <el-radio-group v-model="reverse">
                            <el-radio :label="false">正序</el-radio>
                            <el-radio :label="true">倒序</el-radio>
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
                color="#409EFF"
                :timestamp="res.week">
                <el-card>
                    <el-col :span="8">
                        <h4>学生:{{res.s_name}}</h4>
                        <el-divider></el-divider>
                        <span>
                            地点：{{res.place}}
                        </span>
                        <el-divider direction="vertical"></el-divider>
                        <span>
                            时间：{{res.week}} {{res.weekday}} {{res.segment}}
                        </span>
                        <el-divider></el-divider>
                        <p>预约原因：{{res.reason}}</p>
                        <br>
                    </el-col>

                    <el-col :span="16">
                        <p>对预约的评价：</p>
                        <el-divider></el-divider>
                        <template>
                            <el-rate
                                    v-model="res.score"
                                    show-text
                                    disabled
                                    @change="changeStatus(index, $event)">
                            </el-rate>
                        </template>
                        <el-divider></el-divider>


                    </el-col>

                </el-card>
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
        name: "hisRes",

        components: {
            headTop
        },

        data () {
            return {
                reverse: false,
                activities: [{
                    s_name:'马东',
                    segment:'17:30-18:00',
                    place:'M302',
                    timestamp: '2018-09-12',
                    reason:'答疑'
                    }, {
                    s_name:'徐林',
                    segment:'14:30-15:00',
                    place:'M202',
                    timestamp: '2018-03-13',
                    reason:'工数课后作业'
                    }, {
                    s_name:'张峰',
                    segment:'8:30-9:00',
                    place:'M102',
                    timestamp: '2018-01-11',
                    reason:'学业繁重，感觉迷茫'
                }],
                search: '',
                resInfo: [],
            }
        },

        methods: {
            
        },

        mounted() {

            this.$store.dispatch('post_data', {
                api: '/api/view_his_res',
                data: {
                    account: localStorage.getItem('account'),
                    identify: this.$store.state.identify
                }
            }).then((response) => {
                if (response.data.status == 200) {
                    this.resInfo = response.data.results
                    for (let i = 0; i < this.resInfo.length; i = i + 1) {
                        this.resInfo[i]['week'] = this.$store.state.map_week[this.resInfo[i]['week']]
                        this.resInfo[i]['weekday'] = this.$store.state.map_weekday[this.resInfo[i]['weekday']]
                        this.resInfo[i]['segment'] = this.$store.state.map_segment[this.resInfo[i]['segment']]
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