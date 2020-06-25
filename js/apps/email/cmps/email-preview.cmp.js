// import longText from '../../../cmp/long-text.cmp.js'
import {eventBus} from '../../../services/event-bus.service.js'

export default {
    props:['email'],
    template:`
    <div class="email-preview">
        <div class="preview-opt">
            <input v-model="checked" @change.stop="toggleInCheckedList(email)" type="checkbox" title="Tick">
            <i :class="starType" @click.stop="toggleTag('isStared')" :title="starTitle"></i>
            <i :class="envelopeType" @click.stop="toggleTag('isRead')" :title="envelopeTitle"></i>
        </div>
            <span class="from-prev" :title="email.from" @click="showEmailDetails">{{fromName}}</span>
            <div class="subject-body-preview" @click="showEmailDetails">
                <span class="subject-prev" :title="email.subject">{{subject}}</span>
                <span class="body-prev">{{body}}</span>
            </div>
            <span class="date-prev" :title="fullDate" @click="showEmailDetails">{{date}}</span>
        </div>
    </div>
    `,
    data(){
        return{
            // expanded: false,
            checked:false,
            tags: this.email.tags
        }
    },
    created(){
        eventBus.$on('clearChecks',()=> this.checked=false)
        eventBus.$on('checkAll',(action)=>{
            if (action) this.checked =true
            else this.checked=false
            this.toggleInCheckedList(this.email)
        } )
    },
    computed:{
        fromName(){
            let from = this.email.from.substring(0,this.email.from.indexOf('@'))
            return (from.length>15)? from.substring(0,15)+'...': from
        },
        subject(){
            const subject = this.email.subject
            return (subject.length>15)? subject.substring(0,15)+'... -': subject+' -'
        },
        body(){
            const body = this.email.body
            return (body.length>70)? body.substring(0,70)+'...': body
        },
        starType(){
            return (this.email.tags.isStared)? 'fas fa-star': 'far fa-star'
        },
        envelopeType(){
            return (this.email.tags.isRead)? 'fas fa-envelope-open-text': 'fas fa-envelope'
        },
        envelopeTitle(){
            return (this.envelopeType==='fas fa-envelope')? 'Mark as Read' : 'Mark as Unred'
        },
        starTitle(){
            return (this.starType==='far fa-star')? 'Add To Stared' : 'Remove From Stared'
        },
        fullDate(){
            return new Date(this.email.sentAt).toLocaleString()
        },
        date(){
            return new Date(this.email.sentAt).toLocaleDateString()
        },

    },
    methods:{
        toggleTag(tag){
            this.tags[tag] = !this.tags[tag]
            this.updateEmail()
        },
        toggleInCheckedList(email){
            if (this.checked) this.$emit('checkBox','add',email)
            else this.$emit('checkBox','remove',email)
        },
        updateEmail(){
            eventBus.$emit('update',this.email)
        },
        showEmailDetails(){
            this.$router.push('/email/details/' + this.email.id)
        },
        
    },
    components:{
        // longText,
        
    }
}