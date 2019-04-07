<template>
    <div>
        <head-top></head-top>
        <div class="app-container">
            <el-form ref="examFrom" :model="examForm" label-width="120px" style="margin-top: 10%">
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="课程" label-width="120px">
                            <el-row>
                                <el-col :span="16">
                                    <el-input v-model="examForm.e_name"/>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="考试地点" label-width="120px">
                            <el-row>
                                <el-col :span="16">
                                    <el-input v-model="examForm.place"/>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="考试时间">
                            <el-row>

                                <el-col :span="6">
                                    <el-select v-model="examForm.week_selected" placeholder="请选择周次">
                                        <el-option
                                                v-for="item in examForm.week_options"
                                                :key="item.key"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>

                                <el-col :span="6">
                                    <el-select v-model="examForm.weekday_selected" placeholder="请选择第几天">
                                        <el-option
                                                v-for="item in examForm.weekday_options"
                                                :key="item.key"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>

                                <el-col :span="6">
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

                        <el-form-item label="注意事项">
                            <el-row>
                                <el-col :span="16">
                                    <el-input v-model="examForm.tips" type="textarea"/>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">发布考试安排</el-button>
                            <el-button @click="onCancel">取消</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>

</template>

<script>

    import headTop from '../components/Header'
    import { stat } from 'fs';

    export default {

        components: {
            headTop
        },

        data() {
            return {
                examForm: {
                    e_name:'',
                    tips: '',
                    place: '',
                    e_time: '',
                    week_selected:'',
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

                },
            }
        },
        methods: {
            onSubmit() {
                console.log(this.examForm)
                let e_name=this.examForm.e_name
                let week = this.examForm.week_selected
                let weekday = this.examForm.weekday_selected
                let start = this.examForm.e_time[0]
                let end = this.examForm.e_time[1]
                let place=this.examForm.place
                let tips = this.examForm.tips
                start=start.toLocaleString()
                end=end.toLocaleString()
                this.$store.dispatch('post_data', {
                    api: '/api/release_exam',
                    data: {
                        'account': localStorage.getItem('account'),
                        'e_name': e_name,
                        'week': week,
                        'weekday': weekday,
                        'start': start,
                        'end': end,
                        'place': place,
                        'tips': tips
                    }
                }).then((response) => {
                    if (response.data.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '发布考试安排成功!'
                        })
                    } else {
                        this.$store.commit({
                            type: 'show_message',
                            status: response.data.status
                        })
                        this.$message(this.$store.state.app.message_box)
                        this.ChangePwdForm.old_password = ''
                    }
                }).catch((error) => {
                    alert(error)
                })
            },
            onCancel() {
                this.$message({
                    message: '取消!',
                    type: 'warning'
                })
            }
        }
    }
</script>

<style scoped>
    .line {
        text-align: center;
    }
</style>

