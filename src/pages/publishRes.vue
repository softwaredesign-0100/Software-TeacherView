<template>
    <div class="bg_image">
        <head-top></head-top>
        <div class="app-container">
            <el-form ref="resFrom" :model="resForm" label-width="120px" style="margin-top: 10%">
                <el-row>
                    <el-col :span="18" :offset="4">
                        <el-form-item label="预约地点" label-width="120px">
                            <el-row>

                                <div style="width: 40em;">
                                    <el-input v-model="resForm.place"/>
                                </div>

                            </el-row>
                        </el-form-item>
                        <el-form-item label="预约时间">
                            <el-row>

                                <div style="width: 40em">
                                    <el-col :span="8">
                                        <el-select v-model="resForm.week_selected" multiple placeholder="请选择周次，可多选">
                                            <el-option
                                                    v-for="item in resForm.week_options"
                                                    :key="item.key"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>

                                    <el-col :span="8">
                                        <el-select v-model="resForm.weekday_selected" multiple placeholder="请选择第几天，可多选">
                                            <el-option
                                                    v-for="item in resForm.weekday_options"
                                                    :key="item.key"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>

                                    <el-col :span="8">
                                        <el-select v-model="resForm.segment_selected" multiple placeholder="请选择时间段，可多选">
                                            <el-option
                                                    v-for="item in resForm.segment_options"
                                                    :key="item.key"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>

                                </div>
                            </el-row>
                        </el-form-item>

                        <el-form-item label="注意事项">
                            <el-row>
                                <div style="width: 40em">
                                    <el-input v-model="resForm.tips" type="textarea"/>
                                </div>
                            </el-row>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">发布预约</el-button>
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

    export default {

        components: {
            headTop
        },

        data() {
            return {
                resForm: {
                    tips: '',
                    place: '',
                    week_selected: [],
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

                    weekday_selected: [],
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

                    segment_selected: [],
                    segment_options: [
                        {
                            key: '选项1',
                            label: '8:00 ~ 8:30',
                            value: 1,
                        },
                        {
                            key: '选项2',
                            label: ' 8:30 ~ 9:00',
                            value: 2
                        },
                        {
                            key: '选项3',
                            label: '9:00 ~ 9:30',
                            value: 3,
                        },
                        {
                            key: '选项4',
                            label: '9:30 ~ 10:00',
                            value: 4
                        },
                        {
                            key: '选项5',
                            label: '10:00 ~ 10:30',
                            value: 5,
                        },
                        {
                            key: '选项6',
                            label: ' 10:30 ~ 11:00',
                            value: 6
                        },
                        {
                            key: '选项7',
                            label: '14:00 ~ 14:30',
                            value: 7,
                        },
                        {
                            key: '选项8',
                            label: '14:30 ~ 15:00',
                            value: 8
                        },
                        {
                            key: '选项9',
                            label: '15:00 ~ 15:30',
                            value: 9,
                        },
                        {
                            key: '选项10',
                            label: '15:30 ~ 16:00',
                            value: 10
                        },
                        {
                            key: '选项11',
                            label: '16:00 ~ 16:30',
                            value: 11,
                        },
                        {
                            key: '选项12',
                            label: ' 16:30 ~ 17:00',
                            value: 12
                        },
                    ],

                },

                dateRangeOptions1: {
                    firstDayOfWeek: 1
                },
            }
        },
        methods: {
            onSubmit() {
                console.log(this.resForm)
                let res = []

                for (let i = 0; i < this.resForm.week_selected.length; i = i + 1) {
                    let week = this.resForm.week_selected[i]
                    for (let j = 0; j < this.resForm.weekday_selected.length; j = j + 1) {
                        let weekday = this.resForm.weekday_selected[j]
                        for (let k = 0; k < this.resForm.segment_selected.length; k = k + 1) {
                            let segment = this.resForm.segment_selected[k]
                            res.push({
                                'week': week,
                                'weekday': weekday,
                                'segment': segment,
                                'place': this.resForm.place,
                                'tips': this.resForm.tips
                            })
                        }
                    }
                }

                this.$store.dispatch('post_data', {
                    api: '/api/t_release_reservation',
                    data: {
                        'account': localStorage.getItem('account'),
                        'reservations': res
                    }
                }).then((response) => {
                    if (response.data.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '发布预约成功!'
                        })
                        location.reload()
                    } else {
                        this.$store.commit({
                            type: 'show_message',
                            status: response.data.status
                        })
                        this.$message(this.$store.state.app.message_box)
                        this.ChangePwdForm.old_password = ''
                    }
                }).catch((error) => {
                    // // alert(error)
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

    .bg_image {
        background-image: url("../assets/bg.jpg");
        height: 100%;
        background-repeat: repeat;
    }
</style>

