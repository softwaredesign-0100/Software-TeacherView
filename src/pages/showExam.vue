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
                                prop="name"
                                label="课程"
                                width="150">
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
                                        @click="handleFinish(scope.$index, scope.row)">修改</el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

                ]
            }
        },

        methods: {
            handleFinish(index, row) {
                /* this.$confirm('确认修改否？',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value})=>{
                    console.log(row)
                    this.$store.dispatch('post_data', {
                        api: '/api/edit_exam',
                        data: {
                            'account': localStorage.getItem('account'),
                            'serial': row.serial,
                            'place': value
                        }
                }) */
                console.log(index, row);
            },
            handleDelete(index, row) {
                this.$confirm('确认删除？',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value})=>{
                    console.log(row)
                    this.$store.dispatch('post_data', {
                        api: '/api/delete_exam',
                        data: {
                            'account': localStorage.getItem('account'),
                            'serial': row.serial,
                            'identify': this.$store.state.identify
                        }
                        }).then((response) => {
                        if (response.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功！'
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
                })
                /* console.log(index, row);
                console.log(row.teacher) */
            }
        },

        mounted() {
            console.log(localStorage.getItem('account'))

            this.$store.dispatch('post_data', {
                api: '/api/view_own_release_exams',
                data: {
                    account: localStorage.getItem('account')
                }
            }).then((response) => {
                if (response.data.status == 200) {
                    this.myRes = response.data.exams
                    console.log(this.myRes)
                    for (let i = 0; i < this.myRes.length; i = i + 1) {
                        this.myRes[i]['week'] = this.$store.state.map_week[this.myRes[i]['week']]
                        this.myRes[i]['weekday'] = this.$store.state.map_weekday[this.myRes[i]['weekday']]
                    }
                    console.log(this.myRes)
                }else if (response.data.status == 400) {
                    this.$message({
                        type: 'warning',
                        message: '课程已发布'
                    })
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