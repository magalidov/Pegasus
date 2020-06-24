import { emailService } from '../services/email-service.js';
import emailList from '../cmps/email-list.cmp.js';
// import emailFilter from '../cmps/email-filter.cmp.js';
// import emailTags from '../cmps/email-tags.cmp.js';

export default {
	template: `
    <section class="">
        <h1>Email</h1>
        <!-- <email-filter/> -->
		
        <email-list v-if="emailsToShow" :emails="emailsToShow"/>
        <!-- <email-tags/> -->
    </section>
    `,
	data() {
        return{
            emailsToShow: null
        }
	},
	created() {
		emailService.loadEmails().then((loadedMails) => (this.emailsToShow = loadedMails));
	},
	computed: {},
	methods: {},
	components: {
		emailList,
		// emailFilter,
		// emailTags,
	},
};
