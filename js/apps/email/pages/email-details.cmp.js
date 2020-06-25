import { emailService } from '../services/email-service.js';
import {eventBus} from '../../../services/event-bus.service.js'

export default {
    name:'email-details',
    props: ['emailsToShow'],
    template:`
    <section v-if="emailToShow" class="email-details">
        <div class="details-tools">
            <i class="fas fa-arrow-left" @click="backTolist"></i>
            <i class="fas fa-trash" @click="deleteEmail" title="Delete"></i>
            <i class="fas fa-tag"></i>
            <i :class="starType" @click="toggleTag('isStared')" :title="starTitle"></i>
            <i :class="envelopeIcon" @click="toggleTag('isRead')" @mouseover="closedEnvelope" @mouseout="openEnvelope" title="Mark as Unred"></i>
        </div>
        <hr>
        <div class="email-subject">{{emailToShow.subject}}</div>
        <div class="sent-from-details flex space-between">
            <div>
                <span class="from-name">{{fromName}} -</span><span class="from-adress">{{emailToShow.from}}</span>
            </div>
            <span>{{fullDate}}</span>
        </div>
        <hr>
        <div class="email-body" v-html="emailToShow.body">
        </div>
    </section>
    `,
    data(){
        return{
            emailToShow: null,
            envelopeIcon: 'fas fa-envelope-open-text'
        }
    },
    created(){
        emailService.getById(this.$route.params.id).then(book=>{
            this.emailToShow = book
            this.emailToShow.tags.isRead=true
            this.updateEmail()})
    },
    computed:{
        starType(){
            return (this.emailToShow.tags.isStared)? 'fas fa-star': 'far fa-star'
        },
        starTitle(){
            return (this.starType==='far fa-star')? 'Add To Stared' : 'Remove From Stared'
        },   
        fullDate(){
            return new Date(this.emailToShow.sentAt).toLocaleString()
        }, 
        fromName(){
            return this.emailToShow.from.substring(0,this.emailToShow.from.indexOf('@'))
        },    
        
    },
    methods:{
        toggleTag(tag){
            this.emailToShow.tags[tag] = !this.emailToShow.tags[tag]
            this.updateEmail()
            if (tag === 'isRead') this.backTolist() //this.$router.push('/email/')
        },
        closedEnvelope(){
            this.envelopeIcon = 'fas fa-envelope'
        },
        openEnvelope(){
            this.envelopeIcon = 'fas fa-envelope-open-text'
        },
        updateEmail(){
            eventBus.$emit('update',this.emailToShow)
        },
        backTolist(){
            this.$router.go(-1)
        },
        deleteEmail(){
            eventBus.$emit('delete', [this.emailToShow])
            this.$router.go(-1)
        }

    },
}