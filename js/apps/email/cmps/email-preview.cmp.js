// import longText from '../../../cmp/long-text.cmp.js'
import {eventBus} from '../../../services/event-bus.service.js'

export default {
    props:['email'],
    template:`
    <section >
    
    <div class="email-preview" @click="">
        <!-- <router-link :to="'/email/details/' + email.id"> -->
        <div class="preview-opt">
            <input v-model="checked" @change.stop="toggleInCheckedList(email)" type="checkbox">
            <i :class="starType" @click.stop="toggleTag('isStared')"></i>
            <i :class="envelopeType" @click.stop="toggleTag('isRead')"></i>
        </div>
        <span class="from-prev" :title="email.from">{{fromName}}</span>
        <span class="subject-prev" :title="email.subject">{{subject}}</span>
        <span class="body-prev">{{body}}</span>
        <span class="date-prev" :title="fullDate">{{date}}</span>
        <!-- </router-link> -->
    </div>
        <!-- <div class="space-right inline-block" v-if="expanded" @click="toggleExpand">
            <div class="space-right inline-block">
                <input v-model="checked" @change.stop="toggleInCheckedList(email)" type="checkbox">
                <i :class="starType" @click.stop="toggleTag('isStared')"></i>
                <i :class="envelopeType" @click.stop="toggleTag('isRead')"></i>
            </div>
            <div class="space-right inline-block grow">
                <span class="from">{{email.from}}</span>
                <span class="subject">{{email.subject}}</span>
            </div>
            <span class="date" :title="fullDate">{{date}}</span>
            <span class="body block">{{email.body}}</span>
        </div> -->
    </section>
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
            return this.email.from.substring(0,this.email.from.indexOf('@'))
        },
        subject(){
            const subject = this.email.subject
            return (subject.length>15)? subject.substring(0,15)+'...': subject
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
        // toggleExpand(){
        //     this.expanded = !this.expanded
        // }
    },
    components:{
        // longText,
        
    }
}