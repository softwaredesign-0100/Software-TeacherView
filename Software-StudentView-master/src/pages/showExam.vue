<template>
    <div class='loading' style="min-height: 100%;">
        <head-top></head-top>
        <div>
            <el-row>
                <el-col :span="20" :offset="2" style="margin-top: 10%;">
                    <span style="font-family: Helvetica Neue; font-size: 18px">您的考试信息如下：</span>
                    <el-table
                            :data="myExam"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                prop="e_name"
                                label="课程名"
                                width="100">
                        </el-table-column>
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
                                prop="start"
                                label="开始时间">
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="end"
                                label="结束时间">
                        </el-table-column>
                        <el-table-column
                                prop="t_name"
                                label="教师"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="place"
                                label="地点"
                                width="100">
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
                myExam : [
                    {
                        e_name:'',
                        t_name: '***',
                        place: '宋健一号院北***',
                        week: '第1周',
                        weekday: '周五',
                        start:'',
                        end:'',
                        serial:''
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
                console.log(row.t_name)
            }
        },
        mounted() {
            this.$store.dispatch('post_data', {
                api: '/api/view_own_exams',
                data: {
                    account: localStorage.getItem('account')
                }
            }).then((response) => {
                if (response.data.status == 200) {
                    this.myExam = response.data.exams
                    for (let i = 0; i < this.myExam.length; i = i + 1) {
                        this.myExam[i]['week'] = this.$store.state.map_week[this.myExam[i]['week']]
                        this.myExam[i]['weekday'] = this.$store.state.map_weekday[this.myExam[i]['weekday']]
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