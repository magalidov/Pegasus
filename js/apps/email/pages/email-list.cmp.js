import { emailService } from '../services/email-service.js';
import emailPreview from '../cmps/email-preview.cmp.js'
import listTools from '../cmps/list-tools.cmp.js'
import { eventBus } from '../../../services/event-bus.service.js';


export default {
    template:`
    <section class="email-list" v-if="emailsToShow">
        <h1>Inbox</h1>
        <list-tools @clear="clearChecks" :checkedEmails="checkedEmails"/>
        <email-preview v-for="email in emailsToShow" :email="email" @checkBox="emailInCheckedList" :key="email.id"/>
    </section>
    `,
    data() {
        return{
            emailsToShow: null,
            checkedEmails: [],
        }
	},
	created() {
		emailService.loadEmails().then((loadedMails) => (this.emailsToShow = loadedMails));
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