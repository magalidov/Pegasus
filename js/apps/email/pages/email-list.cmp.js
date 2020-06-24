import { emailService } from '../services/email-service.js';
import emailPreview from '../cmps/email-preview.cmp.js'


export default {
    template:`
    <section class="email-list" v-if="emailsToShow">
        <h1>list</h1>
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
        emailInCheckedList(act,emailId){
            console.log('emailId:', emailId)
            console.log('act:', act)
            const checkedEmails = this.checkedEmails
            if (act==='add') checkedEmails.push(emailId)
            else if (act==='remove'){
                const id = checkedEmails.findIndex(idInList=> idInList === emailId)
                checkedEmails.splice(id,1) 
            } 
            console.log('this.checkedEmails:', checkedEmails)
        }

    },
    components:{
        emailPreview,
    }
}