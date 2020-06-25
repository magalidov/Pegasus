// import emailFilter from '../cmps/email-filter.cmp.js';
import emailSidebar from '../cmps/email-sidebar.cmp.js';
import { emailService } from '../services/email-service.js';
import { eventBus } from '../../../services/event-bus.service.js';


export default {
	template: `
    <section class="email-app">
        <!-- <email-filter/> -->
        <h1 class="email-filter">filter</h1>
        <email-sidebar class="email-sidebar"/>
		<router-view class="email-main" :emailsToShow="emailsToShow"/>
    </section>
    `,
    data() {
        return{
            emails: null,
            emailsToShow: null,
        }
    },
    created() {
        emailService.getEmails().then((loadedMails) => (this.emailsToShow = loadedMails));
        eventBus.$on('changeTags',(tag,state,checkedEmails)=> emailService.updateEmails(tag,state,checkedEmails))
        eventBus.$on('update',(email)=> emailService.updateEmail(email))
        eventBus.$on('delete',(checkedEmails)=> emailService.deleteEmails(checkedEmails))
        eventBus.$on('sent',()=>emailService.getEmails().then((loadedMails) => (this.emailsToShow = loadedMails)))
	},
	computed: {},
	methods: {},
	components: {
		// emailFilter,
		emailSidebar,
	},
};
