import { emailService } from '../services/email-service.js';
import { eventBus } from '../../../services/event-bus.service.js';
import emailSidebar from '../cmps/email-sidebar.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';

export default {
	name: 'email-app',
	template: `
    <section class="email-app">
        <email-filter @filter="setFilter" @refreshList="refreshList"/>
        <email-sidebar :allEmails="allEmails"/>
		<router-view class="email-main" :emailsToShow="emailsToShow" :emailToEdit="emailToEdit" @refreshList="refreshList"/>
    </section>
    `,
	data() {
		return {
			filterBy: {
				txt: '',
				type: 'all',
			},
			allEmails: null,
			emailToEdit: null,
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
		eventBus.$on('sent', () => this.loadEmails());
		eventBus.$on('sentFromNote',(emailToEdit)=>{
			this.emailToEdit= emailToEdit
			debugger
			this.$router.push('/email/compose/new')
		})
	},
	computed: {
		list() {
			let params = this.$route.params.list;
			return !params || params === 'list'
				? 'inbox'
				: params === 'sent'
				? 'isSent'
				: params === 'stared'
				? 'isStared'
				: params;
		},
		emailsToShow() {
			if (this.list === 'inbox' && this.allEmails) {
				return this.filterEmails(this.allEmails);
			} else if ((this.list === 'isSent' || this.list === 'isStared') && this.allEmails) {
				return this.allEmails.filter((email) => email.tags[this.list] === true);
			} else {
				return null;
			}
		},
	},
	methods: {
		loadEmails() {
			emailService
				.getEmails()
				.then((loadedMails) => (this.allEmails = loadedMails));
		},
		refreshList() {
			this.loadEmails();
		},
		setFilter(filterBy) {
			this.filterBy = filterBy;
		},
		filterEmails(emailList) {
			const type = this.filterBy.type;
			const txt = this.filterBy.txt;
			if (type !== 'all') {
				const state = type === 'unread' ? false : true;
				emailList = emailList.filter((email) => email.tags.isRead === state);
			}
			if (txt) {
				emailList = emailList.filter(
					(email) =>
						email.from.toLowerCase().includes(txt.toLowerCase()) ||
						email.subject.toLowerCase().includes(txt.toLowerCase()) ||
						email.body.toLowerCase().includes(txt.toLowerCase())
				);
			}
			return emailList;
		},
	},
	components: {
		emailFilter,
		emailSidebar,
	},
};
