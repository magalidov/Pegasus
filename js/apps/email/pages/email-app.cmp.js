import emailFilter from '../cmps/email-filter.cmp.js';
import emailSidebar from '../cmps/email-sidebar.cmp.js';
import { emailService } from '../services/email-service.js';
import { eventBus } from '../../../services/event-bus.service.js';

export default {
	template: `
    <section class="email-app">
        <email-filter @filter="setFilter"/>
        <email-sidebar class="email-sidebar" :emailsToShow="emailsToShow" @changeList="changeList"/>
		<router-view class="email-main" :emailsToShow="emailsToShow" @changeList="changeList"/>
    </section>
    `,
	data() {
		return {
			emailsToShow: null,
		};
	},
	created() {
		this.loadEmails();
		eventBus.$on('changeTags', (tag, state, checkedEmails) =>
			emailService.updateEmails(tag, state, checkedEmails)
		);
		eventBus.$on('update', (email) => emailService.updateEmail(email));
		eventBus.$on('delete', (checkedEmails) =>
			emailService.deleteEmails(checkedEmails)
		);
		eventBus.$on('sent', () =>
			emailService
				.getEmails()
				.then((loadedMails) => (this.emailsToShow = loadedMails))
		);
	},
	computed: {},
	methods: {
		changeList(listType) {
			if (listType === 'inbox') {
				this.loadEmails();
				return;
			} else if (listType === 'isSent' || listType === 'isStared') {
				emailService.getEmails().then((loadedMails) => {
					let emails = loadedMails;
					emails = emails.filter((email) => email.tags[listType] === true);
					this.emailsToShow = emails;
				});
			} else {
				return;
			}
		},
		loadEmails() {
			emailService
				.getEmails()
				.then((loadedMails) => (this.emailsToShow = loadedMails));
		},
		setFilter(filterBy) {
			// this.filterBy = filterBy;
		},
	},
	watch: {
		// '$route.params'(newParam){
		// }
	},
	components: {
		emailFilter,
		emailSidebar,
	},
};
