// import longText from '../../../cmp/long-text.cmp.js'
import {eventBus} from '../../../services/event-bus.service'

export default {
    props:['email'],
    template:`
    <div class="email-preview">
        <input v-model="checked" @change.stop="toggleInCheckedList(email.id)" type="checkbox">
        <i :class="starType" @click.stop="toggle('isStared')"></i>
        <i :class="envelopeType" @click.stop="toggle('isRead')"></i>
        <span class="from" :title="email.from">{{fromName}}</span>
        <span class="subject" :title="email.subject">{{subject}}</span>
        <span class="body">{{body}}</span>
        <span class="date" :title="fullDate">{{date}}</span>
    </div>
    `,
    data(){
        return{
            checked:false,
            tags: this.email.tags
        }
    },
    computed:{
        fromName(){
            return this.email.from.substring(0,this.email.from.indexOf('@'))
        },
        subject(){
            const subject = this.email.subject
            return (subject.length>3)? subject.substring(0,10)+'...': subject
        },
        body(){
            const body = this.email.body
            return (body.length>10)? body.substring(0,50)+'...': body
        },
        starType(){
            return (this.email.tags.isStared)? 'fas fa-star': 'far fa-star'
        },
        envelopeType(){
            return (this.email.tags.isRead)? 'fas fa-envelope-open-text': 'fas fa-envelope'
        },
        fullDate(){
            return new Date(this.email.sentAt).toLocaleString()
        },
        date(){
            return new Date(this.email.sentAt).toLocaleDateString()
        },

    },
    methods:{
        toggle(tag){
            this.tags[tag] = !this.tags[tag]
        },
        toggleInCheckedList(emailId){
            if (this.checked) this.$emit('checkBox','add',emailId)
            else this.$emit('checkBox','remove',emailId)
        },
        updateTags(){

        }
    },
    components:{
        // longText,
        
    }
}