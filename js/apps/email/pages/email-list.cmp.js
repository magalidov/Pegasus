import emailPreview from '../cmps/email-preview.cmp.js'
import listTools from '../cmps/list-tools.cmp.js'
import { eventBus } from '../../../services/event-bus.service.js';


export default {
    props: ['emailsToShow'],
    template:`
    <section class="email-list" v-if="emailsToShow">
        <list-tools @clear="clearChecks" :checkedEmails="checkedEmails" :emails="emailsToShow.length"/>
        <email-preview v-for="email in emailsToShow" :email="email" @checkBox="emailInCheckedList" :key="email.id"/>
        <h1 v-if="emailsToShow.length===0">No Emails</h1>
    </section>
    `,
    data() {
        return{
            list: 'inbox',
            checkedEmails: [],
        }
	},
    computed:{
    },
    methods:{
        emailInCheckedList(act,email){
            const checkedEmails = this.checkedEmails
            if (act==='add') checkedEmails.push(email)
            else if (act==='remove'){
                const id = checkedEmails.findIndex(emailIn=> emailIn.id === email.id)
                checkedEmails.splice(id,1) 
            } 
        },
        clearChecks(){
            this.checkedEmails= []
            eventBus.$emit('clearChecks')
        }

    },
    components:{
        emailPreview,
        listTools,
    }
}