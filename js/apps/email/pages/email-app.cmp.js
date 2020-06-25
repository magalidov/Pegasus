import { emailService } from '../services/email-service.js';
import { eventBus } from '../../../services/event-bus.service.js';
import emailSidebar from '../cmps/email-sidebar.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';


export default {
	template: `
    <section class="email-app">
        <email-filter @filter="setFilter" @refreshList="refreshList"/>
        <email-sidebar :allEmails="allEmails"/>
		<router-view class="email-main" :emailsToShow="emailsToShow" @refreshList="refreshList"/>
    </section>
    `,
	data() {
		return {
			filterBy: {
                txt:'',
                type:'all'
			},
			allEmails: null,
		};
	},
	created() {
		this.loadEmails()
		eventBus.$on('changeTags', (tag, state, checkedEmails) =>emailService.updateEmails(tag, state, checkedEmails));
		eventBus.$on('update', (email) => emailService.updateEmail(email));
		eventBus.$on('delete', (checkedEmails) => emailService.deleteEmails(checkedEmails));
		eventBus.$on('sent', () => this.loadEmails());
	},
	computed: {
		list(){
			let params = this.$route.params.list
			return (!params)? 'inbox': (params=== 'sent')? 'isSent' : (params==='stared')? 'isStared' : params
		},
		emailsToShow(){
			if (this.list === 'inbox'){
				return this.allEmails
			} else if (this.list === 'isSent' || this.list === 'isStared') {
				return this.allEmails.filter((email) => email.tags[this.list] === true);				
			} else {
				return null
			}
		}
	},
	methods: {
		loadEmails() {
			emailService.getEmails().then((loadedMails) => (this.allEmails = loadedMails))
		},
		refreshList(){
			this.loadEmails()
		},
		setFilter(filterBy) {
			this.filterBy = filterBy;
		},
	},
	watch: {
		'$route.params.list'(newParam) {
		},
	},
	components: {
		emailFilter,
		emailSidebar,
	},
};
