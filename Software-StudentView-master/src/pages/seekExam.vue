<template>
    <div class='loading' style="min-height: 100%;">
        <head-top></head-top>
        <div>
            <el-row>
                <el-col :span="20" :offset="2" style="margin-top: 10%;">
                    <span style="font-family: Helvetica Neue; font-size: 18px">考试安排如下：</span>
                    <el-table
                            :data="examInfo.filter(data => !search || data.e_name.toLowerCase().includes(search.toLowerCase()))"
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
                                prop="start"
                                label="开始时间">
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="end"
                                label="结束时间">
                        </el-table-column>
                        <el-table-column
                                prop="e_name"
                                label="课程">
                        </el-table-column>
                        <el-table-column
                                prop="t_name"
                                label="授课教师">
                        </el-table-column>

                        <el-table-column
                                prop="place"
                                label="地点">
                        </el-table-column>

                        <el-table-column
                                align="right">
                            <template slot="header" slot-scope="scope">
                                <el-input
                                        v-model="search"
                                        size="mini"
                                        placeholder="输入课程名搜索"/>
                            </template>
                            <template slot-scope="scope">
                                <el-button
                                        type="success"
                                        size="mini"
                                        @click="submitExam(scope.$index,scope.row)">添加考试</el-button>
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
        name: "seekExam",

        components: {
            headTop
        },

        data () {
            return {
                examInfo: [
                    {
                        week: '第1周',
                        weekday: '周五',
                        start:'1',
                        end:'1',
                        e_name: 'math',
                        t_name: '***',
                        place: '宋健1号楼***',
                        serial: 1
                    }
                ],
                search: '',
            }
        },

        methods: {
            submitExam(index, row) {
                this.$confirm('确认添加该考试?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    console.log(row)
                    this.$store.dispatch('post_data', {
                        api: '/api/add_exam',
                        data: {
                            'account': localStorage.getItem('account'),
                            'serial': row.serial
                        }
                    }).then((response) => {
                        if (response.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '添加成功！'
                            })
                            location.reload()
                        } else if(response.data.status == 400){
                            this.$message({
                                type: 'warning',
                                message: '已添加！'
                            })
                        }
                        else {
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
                api: '/api/seek_exams',
                data: {
                }
            }).then((response) => {
                if (response.data.status == 200) {
                    this.examInfo = response.data.exams
                    for (let i = 0; i < this.examInfo.length; i = i + 1) {
                        this.examInfo[i]['week'] = this.$store.state.map_week[this.examInfo[i]['week']]
                        this.examInfo[i]['weekday'] = this.$store.state.map_weekday[this.examInfo[i]['weekday']]
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