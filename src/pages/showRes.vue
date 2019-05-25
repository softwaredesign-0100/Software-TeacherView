<template>
    <div class='bg_image' style="min-height: 100%;">
        <head-top></head-top>
        <div>
            <el-row>
                <el-col :span="20" :offset="2" style="margin-top: 10%;">
                    <span style="font-family: Helvetica Neue; font-size: 18px">您的预约信息如下：</span>

                    <el-button type="text" @click="changeShowModus">{{show_modus}}&nbsp;共有{{count}}人预约</el-button>
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
                                v-for="(res, index) in myRes"
                                :key="index"
                                :icon="res.icon"
                                :color="res.color"
                                :timestamp="res.week">
                            <el-card>
                                <el-col :span="8">
                                    <h4>学生：{{res.student}}</h4>
                                    <el-divider></el-divider>

                                    <div style="height: 2em;">
                                        <span>地点：{{res.place}} </span>
                                        <el-divider direction="vertical"></el-divider>
                                        <span>时间：{{res.week}}&nbsp;{{res.weekday}}&nbsp;{{res.segment}}</span>

                                    </div>
                                    <el-divider></el-divider>
                                    <p>Tips：{{res.tips}}</p>
                                    <br>
                                </el-col>

                                <el-col :span="8">
                                    <p>您的评价：</p>
                                    <el-divider></el-divider>
                                    <div style="height: 2em;">
                                        <template>
                                            <el-rate
                                                    v-model="res.score"
                                                    show-text
                                                    @change="changeStatus(index, $event)">
                                            </el-rate>
                                        </template>
                                    </div>
                                    <el-divider></el-divider>
                                </el-col>

                                <el-col :span="8">
                                    <p>您可以进行的操作</p>
                                    <el-divider></el-divider>


                                    <div style="height: 2em;">

                                        <el-button
                                                size="mini"
                                                v-if="res.is_selected == '1'"
                                                @click="handleFinish(index, res)">完成
                                        </el-button>
                                        <el-button
                                                size="mini"
                                                v-else
                                                disabled
                                                @click="handleFinish(index, res)">空闲
                                        </el-button>
                                        <el-button
                                                v-if="res.is_canceled == '0'"
                                                size="mini"
                                                type="danger"
                                                @click="handleCancel(index, res)">{{btn_cancel_res}}
                                        </el-button>
                                        <el-button
                                                v-if="res.is_canceled == '1'"
                                                size="mini"
                                                type="danger"
                                                @click="handleCancel(index, res)">{{btn_wait_ensure}}

                                        </el-button>
                                        <el-button
                                                v-if="res.is_canceled == '2'"
                                                size="mini"
                                                type="danger"
                                                @click="handleEnsure(index, res)">{{btn_ensure_cancel_res}}
                                        </el-button>
                                        <el-button
                                                v-if="res.is_canceled == '3'"
                                                size="mini"
                                                type="danger"
                                                :disabled="true"
                                                @click="handleCancel(index, res)">已取消
                                        </el-button>
                                        <el-divider></el-divider>
                                    </div>


                                </el-col>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>

                    <el-table
                            v-else
                            :data="myRes"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                sortable
                                prop="is_finished"
                                label="状态"
                                width="80">
                            <template slot-scope="scope">
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.is_finished }}</el-tag>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="week"
                                label="周次"
                                width="80">
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="weekday"
                                label="天次"
                                width="80">
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="segment"
                                label="时间段">
                        </el-table-column>
                        <el-table-column
                                prop="student"
                                label="学生"
                                width="80"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="place"
                                label="地点"
                                width="80">
                        </el-table-column>
                        <el-table-column
                                prop="tips"

                                label="理由"
                                width="80">
                        </el-table-column>
                        <el-table-column
                                label="评分">
                            <template slot-scope="scope">
                                <el-rate
                                        v-model="scope.row.score"
                                        show-text
                                        @change="changeStatus(scope.$index, $event)">
                                </el-rate>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">

                                <el-button
                                        v-if="scope.row.is_selected == '1'"
                                        size="mini"
                                        @click="handleFinish(scope.$index, scope.row)">完成
                                </el-button>
                                <el-button
                                        v-else
                                        disabled
                                        size="mini"
                                        @click="handleFinish(scope.$index, scope.row)">空闲
                                </el-button>
                                <el-button
                                        v-if="scope.row.is_canceled == '0'"
                                        size="mini"
                                        type="danger"
                                        @click="handleCancel(scope.$index, scope.row)">{{btn_cancel_res}}
                                </el-button>
                                <el-button
                                        v-if="scope.row.is_canceled == '1'"
                                        size="mini"
                                        type="danger"
                                        :disabled="true"
                                        @click="handleCancel(scope.$index, scope.row)">{{btn_wait_ensure}}
                                </el-button>
                                <el-button
                                        v-if="scope.row.is_canceled == '2'"
                                        size="mini"
                                        type="danger"
                                        @click="handleEnsure(scope.$index, scope.row)">{{btn_ensure_cancel_res}}
                                </el-button>
                                <el-button
                                        v-if="scope.row.is_canceled == '3'"
                                        size="mini"
                                        type="danger"
                                        :disabled="true"
                                        @click="handleCancel(scope.$index, scope.row)">已取消
                                </el-button>
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
        name: "showRes",
        components: {
            headTop

        },

        data() {
            return {
                btn_cancel_res: '取消',
                btn_ensure_cancel_res: '同意取消',
                btn_wait_ensure: '等待同意',
                show_time_line: true,
                reverse: false,
                show_modus: '以列表形式显示',
                // score: 5,

                count: 0,

                myRes: [
                    {
                        t_name: "张志捷",
                        week: '第1周',
                        weekday: '周五',
                        segment: '10:30 ~ 11:00',
                        student: '***',
                        place: '宋健一号院北***',
                        reason: '答疑',
                        score: 5,
                        tips: '',
                    }
                ]
            }
        },

        methods: {
            handleFinish(index, row) {
                this.$confirm('预约已完成？', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                }).then(({value}) => {
                    console.log(row)
                    this.$store.dispatch('post_data', {
                        api: '/api/finish_res',
                        data: {
                            'account': localStorage.getItem('account'),
                            'serial': row.serial,
                            'score': this.myRes[index]['score']
                        }
                    }).then((response) => {
                        if (response.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '预约已完成！'
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
                        // alert(error)
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: ' '
                    });
                })
                //console.log(index, row);
            },

            changeStatus(index, $event) {
                this.myRes[index]['score'] = $event

            },

            handleDelete(index, row) {
                console.log(index, row);
                console.log(row.teacher)
            },

            handleCancel(index, row) {
                this.$prompt('请输入取消预约原因', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value}) => {
                    console.log(row);
                    if (row.student == '') {
                        this.$message({
                            message: '取消预约成功!',
                            type: 'success'
                        });
                        location.reload();
                    }
                    this.$store.dispatch('post_data', {
                        api: '/api/initiate_cancel',
                        data: {
                            'account': localStorage.getItem('account'),
                            'serial': row.serial,
                            'reason': value,
                            'identify': this.$store.state.identify
                        }
                    }).then((response) => {
                        if (response.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '等待对方答复……'
                            });
                            location.reload();
                        } else {
                            this.$store.commit({
                                type: 'show_message',
                                status: response.data.status
                            });
                            console.log(response.data.status);
                            this.$message(this.$store.state.app.message_box)
                        }
                    }).catch((error) => {
                        // alert(error)
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },

            handleEnsure(index, row) {
                console.log('handle ensure row: ', row)
                this.$store.dispatch('post_data', {
                    api: '/api/ensure_cancel',
                    data: {
                        'account': localStorage.getItem('account'),
                        'serial': row.serial,
                        'identify': this.$store.state.identify
                    }
                }).then((response) => {
                    if (response.data.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '已取消'
                        });
                        location.reload()
                    } else {
                        this.$store.commit({
                            type: 'show_message',
                            status: response.data.status
                        });
                        console.log(response.data.status);
                        this.$message(this.$store.state.app.message_box)
                    }
                }).catch((error) => {
                    // alert(error)
                });
            },
            changeShowModus() {
                if (this.show_time_line) {
                    this.show_time_line = false;
                    this.show_modus = '以时间线形式显示';
                } else {
                    this.show_time_line = true;
                    this.show_modus = '以列表形式显示';
                }
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
                        this.myRes[i]['segment'] = this.$store.state.map_segment[this.myRes[i]['segment']]
                        this.myRes[i]['week'] = this.$store.state.map_week[this.myRes[i]['week']]
                        this.myRes[i]['weekday'] = this.$store.state.map_weekday[this.myRes[i]['weekday']]
                        this.myRes[i]['score'] = parseInt(this.myRes[i]['score']);
                        this.myRes[i]['is_finished'] = 'el-icon-loading';
                        this.myRes[i]['color'] = 'red';
                        if (this.myRes[i]['is_selected'] == 1) {
                            this.myRes[i]['is_finished'] = "已预约";
                            this.myRes[i]['icon'] = 'el-icon-check';
                            this.myRes[i]['color'] = '#67C23A';
                            this.count += 1;
                        } else if (this.myRes[i]['is_finished'] == 1) {
                            this.myRes[i]['is_finished'] = "已完成"
                        } else if (this.myRes[i]['is_canceled'] == 3) {
                            this.myRes[i]['is_finished'] = "已取消"
                        } else {
                            this.myRes[i]['is_finished'] = "未预约"
                        }
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
                // alert(error)
            })
        }
    }
</script>

<style scoped>
    .bg_image {
        background-image: url("../assets/bg.jpg");
        /*height: 100%;*/
        background-repeat: repeat;
    }
</style>

