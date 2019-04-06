<template>
    <div class='loading' style="min-height: 100%;">
        <head-top></head-top>
        <div>
            <el-row>
                <el-col :span="20" :offset="2" style="margin-top: 10%;">
                    <span style="font-family: Helvetica Neue; font-size: 18px">您的考试发布如下：</span>
                    <el-table
                            :data="myRes"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                sortable
                                prop="e_name"
                                label="课程"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="week"
                                label="周次"
                                width="140">
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="weekday"
                                label="天次"
                                width="140">
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="start"
                                label="开始时间"
                                width="130">
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="end"
                                label="结束时间"
                                width="130">
                        </el-table-column>
                        <el-table-column
                                prop="place"
                                label="地点"
                                width="130">
                        </el-table-column>
                        <el-table-column
                                prop="tips"
                                label="注意事项"
                                width="140">
                        </el-table-column>

                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        @click="handleFinish(scope.$index, scope.row)">完成</el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">取消</el-button>
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
        name: "showExam",
        components: {
            headTop
        },

        data() {
            return {
                myRes : [
                    {
                        week: '第1周',
                        weekday: '周五',
                        start:'08:30',
                        end:'10:30',
                        e_name:'数据库',
                        place: 'M301',
                        tips: '',
                    }
                ]
            }
        },

        methods: {
            handleFinish(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
                console.log(row.teacher)
            }
        },

        mounted() {
            console.log(localStorage.getItem('account'))

            this.$store.dispatch('post_data', {
                api: '/api/t_view_reservation',
                data: {
                    account: localStorage.getItem('account')
                }
            }).then((response) => {
                if (response.data.status == 200) {
                    this.myRes = response.data.ress
                    console.log(this.myRes)
                    for (let i = 0; i < this.myRes.length; i = i + 1) {
                        this.myRes[i]['start'] = this.$store.state.map_start[this.myRes[i]['start']]
                        this.myRes[i]['end'] = this.$store.state.map_end[this.myRes[i]['end']]
                        this.myRes[i]['week'] = this.$store.state.map_week[this.myRes[i]['week']]
                        this.myRes[i]['weekday'] = this.$store.state.map_weekday[this.myRes[i]['weekday']]
                    }
                    console.log(this.myRes)
                } else {
                    this.$store.commit({
                        type: 'show_message',
                        status: response.data.status
                    })
                    this.$message(this.$store.state.app.message_box)
                }
            }).catch((error) => {
                alert(error)
            })

            // this.$request.post('/api/t_view_reservation', {
            //     account: localStorage.getItem('account')
            // }).then((response) => {
            //     console.log('response')
            //     console.log(response.data)
            //     if (response.data.status == 200) {
            //         this.myRes = response.data.ress
            //         console.log(this.myRes)
            //         for (let i = 0; i < this.myRes.length; i = i + 1) {
            //             this.myRes[i]['segment'] = this.$store.state.map_segment[this.myRes[i]['segment']]
            //             this.myRes[i]['week'] = this.$store.state.map_week[this.myRes[i]['week']]
            //             this.myRes[i]['weekday'] = this.$store.state.map_weekday[this.myRes[i]['weekday']]
            //         }
            //         console.log(this.myRes)
            //     } else if (response.data.status == 201) {
            //
            //     } else if (response.data.status == 401) {
            //
            //     }
            // }).catch((error) => {
            //     this.$message({
            //         type: 'error',
            //         message: '网络异常，请稍后再试'
            //     })
            // })
        }
    }
</script>

<style scoped>

</style>