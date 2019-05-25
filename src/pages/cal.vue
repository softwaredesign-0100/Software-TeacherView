<template>
  <div class="bg_image">
  	<p>
  	</p>
    <full-calendar class="test-fc" :events="fcEvents" 
      first-day='1' locale="zh"
      @changeMonth="changeMonth"
      @eventClick="eventClick"
      @dayClick="dayClick"
      @moreClick="moreClick">
      <template slot="fc-event-card" scope="p">
            <p><i class="fa"></i> {{ '预约人 :' + p.event.student + ','}}</p>
            <p style="margin-top: -17px">{{' 预约理由 : ' + p.event.reason  }}</p>
            <p style="margin-top: -17px">{{' 预约地点 : ' + p.event.place  }}</p>
        </template>
    </full-calendar>
  </div>
</template>
<script>
let demoEvents = [
  {'score': '5', 
  'segment': '2', 
  's_name': 'zhijie zhang', 
  'tips': '带书', 
  'serial': '3',
  'place': '宋健', 
  'weekday': '4', 
  't_name': '张志捷', 
  'reason': '看书', 
  'week': '4',
  'cssClass' : 'family'}]
;

export default {
	data () {
		return {
            name:'Sunny!',
            fcEvents : demoEvents
        }
    },
    components : {
	'full-calendar': require('vue-fullcalendar')	
  },
  mounted(){
    console.log(localStorage.getItem('account'))

            this.$store.dispatch('post_data', {
                api: '/api/t_view_reservation',
                data: {
                    account: localStorage.getItem('account')
                }
            }).then((response) => {
                if (response.data.status == 200) {
                    this.myRes = response.data.ress
                    let events = []
                    for (let i = 0; i < this.myRes.length; i = i + 1) {
                      if (this.myRes[i]['is_selected'] == 1 && this.myRes[i]['is_finished'] != 1 && this.myRes[i]['is_canceled'] != 3) {
                          events.push(this.myRes[i])
                      }
                    }
                    console.log(events)
                    this.fcEvents = events
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
  },
  methods : {
    'changeMonth' (current) {

      console.log('changeMonth')
    },
    'eventClick' (event,) {
       console.log('eventClick')
    },
    'dayClick' (jsEvent) {
      console.log('dayClickdsdsds', jsEvent)
    },
    'moreClick' (day, events, jsEvent) {
      console.log('moreCLick', day, events, jsEvent)
    }
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