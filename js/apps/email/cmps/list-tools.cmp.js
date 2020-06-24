import {eventBus} from '../../../services/event-bus.service.js'
import { emailService } from '../services/email-service.js';

export default {
    props: ['checkedEmails'],
    template:`
    <section class="list-tools">
    <input v-model="checkAll" @change.stop="toggleInCheckedList(email.id)" type="checkbox">
        <i class="fas fa-trash" v-if="showTools" @click="deleteCheckedEmails"></i>
        <i class="fas fa-tag" v-if="showTools"></i>
        <i :class="envelopeType" v-if="showTools" @click.stop="toggleAllTags('isRead')"></i>
    </section>
    `,
    data(){
        return{
            checkAll:false,
            showTools:false
        }
    },
    created(){
        
    },
    computed:{
        envelopeType(){
            return (this.checkedEmails.every(email => email.tags.isRead))? 'fas fa-envelope':'fas fa-envelope-open-text'
        }
    },
    methods:{
        deleteCheckedEmails(){
            emailService.deleteEmails(this.checkedEmails)
            this.clearChecked()
        },
        clearChecked(){
            this.$emit('clear')
        },
        // toggleAllTags(tag){
        //     const state = (this.checkedEmails.every(email => email.tags.isRead))? false: true
        //     emailService.updateEmails(tag,state,this.checkedEmails)
        // },
    },
    watch:{
        checkedEmails(newChecked){
            this.showTools = (newChecked.length>0)? true : false
        }
    },
    components:{
        
    }
}