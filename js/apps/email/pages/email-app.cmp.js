// import emailFilter from '../cmps/email-filter.cmp.js';
// import emailTags from '../cmps/email-tags.cmp.js';
import { emailService } from '../services/email-service.js';
import { eventBus } from '../../../services/event-bus.service.js';


export default {
	template: `
    <section class="">
        <h1>Email</h1>
        <!-- <email-filter/> -->
		<router-view :emailsToShow="emailsToShow"/>
        <!-- <email-tags/> -->
    </section>
    `,
    data() {
        return{
            emailsToShow: null,
        }
	},
    created() {
        emailService.loadEmails().then((loadedMails) => (this.emailsToShow = loadedMails));
        eventBus.$on('changeTags',(tag,state,checkedEmails)=> emailService.updateEmails(tag,state,checkedEmails))
        eventBus.$on('update',(email)=> emailService.updateEmail(email))
        eventBus.$on('delete',(checkedEmails)=> emailService.deleteEmails(checkedEmails))
	},
	computed: {},
	methods: {},
	components: {
		// emailFilter,
		// emailTags,
	},
};
