import {eventBus} from '../../../services/event-bus.service.js'

export default {
    props: ['checkedEmails','emailsAmount'],
    template:`
    <section class="list-tools">
        <input v-model="checkAll" v-show="emailsAmount>0" @change.stop="toggleCheckAll" type="checkbox" title="Check All">
        <i class="fas fa-trash" v-if="showTools" @click.stop="deleteCheckedEmails" title="Delete"></i>
        <i :class="envelopeType" v-if="showTools" @click.stop="toggleAllTags('isRead')" :title="envelopeTitle"></i>
        <i class="fas fa-tag" v-if="showTools"></i>
    </section>
    `,
    data(){
        return{
            showTools:false
        }
    },
    created(){
    },
    computed:{
        envelopeType(){
            return (this.checkedEmails.every(email => email.tags.isRead))? 'fas fa-envelope':'fas fa-envelope-open-text'
        },
        envelopeTitle(){
            return (this.checkedEmails.every(email => email.tags.isRead))? 'Mark as Unred':'Mark as Read'
        },
        checkAll(){
                return (this.checkedEmails.length>0)? true: false
        }
    },
    methods:{
        deleteCheckedEmails(){
            eventBus.$emit('delete', this.checkedEmails)
            this.clearChecked()
        },
        clearChecked(){
            this.$emit('clear')
        },
        toggleAllTags(tag){
            const state = (this.checkedEmails.every(email => email.tags.isRead))? false: true
            eventBus.$emit('changeTags',tag,state,this.checkedEmails)
        },
        toggleCheckAll(){
            const set = (this.checkedEmails.length===0)? true: false
            eventBus.$emit('checkAll',set)
        }
    },
    watch:{
        checkedEmails(newChecked){
            this.showTools = (newChecked.length>0)? true : false
        }
    },
    components:{
        
    }
}