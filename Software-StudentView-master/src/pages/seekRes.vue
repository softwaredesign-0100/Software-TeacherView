<template>
    <div class='loading' style="min-height: 100%;">
        <head-top></head-top>
        <div>
            <el-row>
                <el-col :span="20" :offset="2" style="margin-top: 10%;">
                    <span style="font-family: Helvetica Neue; font-size: 18px">预约信息如下：</span>
                    <el-table
                            :data="resInfo.filter(data => !search || data.t_name.toLowerCase().includes(search.toLowerCase()))"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                sortable
                                prop="week"
                                label="周次"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="weekday"
                                label="天次"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="segment"
                                label="时间段">
                        </el-table-column>
                        <el-table-column
                                prop="t_name"
                                label="教师">
                        </el-table-column>

                        <el-table-column
                                prop="place"
                                label="地点">
                        </el-table-column>

                        <el-table-column
                                prop="tips"
                                label="注意事项">
                        </el-table-column>

                        <el-table-column
                                align="right">
                            <template slot="header" slot-scope="scope">
                                <el-input
                                        v-model="search"
                                        size="mini"
                                        placeholder="输入教师名搜索"/>
                            </template>
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        type="success"
                                        @click="submitRes(scope.$index, scope.row)">预约</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/Header'

    export default {
        name: "seekRes",

        components: {
            headTop
        },

        data () {
            return {
                resInfo: [
                    {
                        week: '第1周',
                        weekday: '周五',
                        segment: '10:30 ^ 11:00',
                        t_name: '***',
                        place: '宋健1号楼***',
                        tips: '',
                        serial: 1
                    }
                ],
                search: '',
            }
        },

        methods: {
            submitRes(index, row) {
                this.$prompt('请输入预约原因', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    console.log(row)
                    this.$store.dispatch('post_data', {
                        api: '/api/s_release_reservation',
                        data: {
                            'account': localStorage.getItem('account'),
                            'serial': row.serial,
                            'reason': value
                        }
                    }).then((response) => {
                        if (response.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '预约成功！'
                            })
                            location.reload()
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
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
        },

        mounted() {

            this.$store.dispatch('post_data', {
                api: '/api/seek_reservation',
                data: {}
            }).then((response) => {
                if (response.data.status == 200) {
                    this.resInfo = response.data.ress
                    for (let i = 0; i < this.resInfo.length; i = i + 1) {
                        this.resInfo[i]['segment'] = this.$store.state.map_segment[this.resInfo[i]['segment']]
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