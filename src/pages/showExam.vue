<template>
    <div class='loading' style="min-height: 100%;">
        <head-top></head-top>
        <div>
            <el-row>
                <el-col :span="20" :offset="2" style="margin-top: 10%;">
                    <span style="font-family: Helvetica Neue; font-size: 14px">您等待完成的考试如下：</span>
                    <el-button type="text" @click="changeShowModus">{{show_modus}}</el-button>
                    <div class="block" style="margin-bottom: 5%;">
                        <div class="radio">
                            <span style="font-family: Helvetica Neue; font-size: 14px">排序：</span>
                            <el-radio-group v-model="reverse">
                                <el-radio :label="true">倒序</el-radio>
                                <el-radio :label="false">正序</el-radio>
                            </el-radio-group>
                        </div>
                    </div>

                    <el-timeline
                            v-if="show_time_line"
                            :reverse="reverse">
                        <el-timeline-item
                                v-for="(exam, index) in myExam"
                                :key="index"
                                :timestamp="exam.week">
                            <el-card>
                                <el-col :span="12">
                                    <h4>{{exam.e_name}}&nbsp;&nbsp;&nbsp;任课教师：{{exam.t_name}}</h4>
                                    <p>地点：{{exam.place}} 时间：{{exam.weekday}}&nbsp;{{exam.segment}}</p>
                                    <p>tips：{{exam.tips}}</p>
                                </el-col>
                                <el-col :span="12">
                                    <el-button
                                            size="mini"
                                            @click="handleFinish(index, exam)">完成</el-button>
                                    <el-button
                                            size="mini"
                                            type="danger"
                                            @click="handleDelete(index, exam)">删除</el-button>
                                </el-col>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>

                    <el-table
                            v-else
                            :data="myExam"
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
                                        @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>


                    <el-dialog title="考试信息" :visible.sync="showChange" width="56%" :show-close="false">
                        <el-form :model="examForm" label-position="left">
                            <el-form-item label="考试名称" :label-width="label_width">
                                <el-input v-model="examForm.e_name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="考试地点" :label-width="label_width">
                                <el-input v-model="examForm.place"></el-input>
                            </el-form-item>
                            <el-form-item label="时间安排" :label-width="label_width">
                                <el-row>
                                    <el-col :span="6">
                                        <el-select v-model="week_selected" placeholder="请选择">
                                            <el-option
                                                    v-for="item in week_options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-select v-model="weekday_selected" placeholder="请选择">
                                            <el-option
                                                    v-for="item in weekday_options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-time-picker
                                                is-range
                                                v-model="examForm.e_time"
                                                value-format="HH:mm"
                                                format="HH:mm"
                                                range-separator="至"
                                                start-placeholder="开始时间"
                                                end-placeholder="结束时间"
                                                placeholder="选择时间范围">
                                        </el-time-picker>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item label="考试小提示" :label-width="label_width">
                                <el-input v-model="examForm.tips" autocomplete="off"></el-input>
                            </el-form-item>

                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="handleCancel">取 消</el-button>
                            <el-button type="primary" @click="handleEnsure">确 定</el-button>
                        </div>
                    </el-dialog>
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

                ],
                showChange: false,
                show_time_line: true,
                reverse: false,
                show_modus: '以列表形式显示',
                time_picker_options : {
                    start: '',
                    end: '',
                    step: '00:05'
                },

                label_width: '120px',
                examForm: {
                    e_name: '',
                    place: '',
                    start: '',
                    end: '',
                    week: '',
                    weekday: '',
                    tips: '',
                    e_time: '',
                    serial: ''
                },

                e_time: '',

                week_selected: '',
                week_options: [
                    {
                        key: '选项1',
                        label: '第1周',
                        value: 1
                    },
                    {
                        key: '选项2',
                        label: '第2周',
                        value: 2
                    },
                    {
                        key: '选项3',
                        label: '第3周',
                        value: 3
                    },
                    {
                        key: '选项4',
                        label: '第4周',
                        value: 4
                    },
                    {
                        key: '选项5',
                        label: '第5周',
                        value: 5
                    },
                    {
                        key: '选项6',
                        label: '第6周',
                        value: 6
                    },
                    {
                        key: '选项7',
                        label: '第7周',
                        value: 7
                    }, {
                        key: '选项8',
                        label: '第8周',
                        value: 8
                    },
                    {
                        key: '选项9',
                        label: '第9周',
                        value: 9
                    },
                    {
                        key: '选项10',
                        label: '第10周',
                        value: 10
                    },
                    {
                        key: '选项11',
                        label: '第11周',
                        value: 11
                    },
                    {
                        key: '选项12',
                        label: '第12周',
                        value: 12
                    },
                    {
                        key: '选项13',
                        label: '第13周',
                        value: 13
                    },
                    {
                        key: '选项14',
                        label: '第14周',
                        value: 14
                    },
                    {
                        key: '选项15',
                        label: '第15周',
                        value: 15
                    },
                    {
                        key: '选项16',
                        label: '第16周',
                        value: 16
                    }, {
                        key: '选项17',
                        label: '第17周',
                        value: 17
                    },
                    {
                        key: '选项18',
                        label: '第18周',
                        value: 18
                    },

                ],

                weekday_selected:'',
                weekday_options: [
                    {
                        key: '选项1',
                        label: '星期一',
                        value: 1,
                    },
                    {
                        key: '选项2',
                        label: '星期二',
                        value: 2,
                    },
                    {
                        key: '选项3',
                        label: '星期三',
                        value: 3,
                    },
                    {
                        key: '选项4',
                        label: '星期四',
                        value: 4,
                    },
                    {
                        key: '选项5',
                        label: '星期五',
                        value: 5,
                    },
                    {
                        key: '选项6',
                        label: '星期六',
                        value: 6,
                    },
                    {
                        key: '选项7',
                        label: '星期日',
                        value: 7,
                    }
                ],

            }
        },

        methods: {
            handleEdit(index, row) {
                this.showChange = true;
                this.examForm = {
                    e_name: row.name,
                    week: row.week,
                    weekday: row.weekday,
                    place: row.place,
                    start: row.start,
                    end: row.end,
                    tips: row.tips,
                    e_time: '',
                    serial: row.serial,
                };

            },

            handleCancel() {
                this.showChange = false;
            },

            handleEnsure() {
                this.examForm.week = this.week_selected;
                this.examForm.weekday = this.weekday_selected;
                this.examForm.start = this.examForm.e_time[0];
                this.examForm.end = this.examForm.e_time[1];
                this.examForm.account = localStorage.getItem('account');
                console.log(this.examForm);
                    this.$store.dispatch('post_data', {
                        api: '/api/edit_exam',
                        data: this.examForm
                    }).then((response) => {
                        if (response.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '修改成功！'
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
                        message: ' '
                    });
                })
            },
            changeShowModus () {
                if (this.show_time_line) {
                    this.show_time_line = false;
                    this.show_modus = '以时间线形式显示';
                }
                else {
                    this.show_time_line = true;
                    this.show_modus = '以列表形式显示';
                }
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
                    this.myExam = response.data.exams
                    console.log(this.myExam)
                    for (let i = 0; i < this.myExam.length; i = i + 1) {
                        this.myExam[i]['week'] = this.$store.state.map_week[this.myExam[i]['week']]
                        this.myExam[i]['weekday'] = this.$store.state.map_weekday[this.myExam[i]['weekday']]
                        this.myExam[i]['segment'] = this.$store.state.map_weekday[this.myExam[i]['segment']]

                    }
                    console.log(this.myExam)
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


        }
    }
</script>

<style scoped>

</style>