import emailPreview from '../cmps/email-preview.cmp.js';
import listTools from '../cmps/list-tools.cmp.js';
import { eventBus } from '../../../services/event-bus.service.js';

export default {
	name:'email-list',
	props: ['emailsToShow'],
	template: `
    <section class="email-list" v-if="emailsToShow">
        <list-tools @clear="clearChecks" :checkedEmails="checkedEmails" :emailsAmount="emailsToShow.length"/>
        <email-preview v-for="email in emailsToShow" :email="email" @checkBox="emailInCheckedList" :key="email.id"/>
        <h1 v-if="emailsToShow.length===0">No Emails</h1>
    </section>
    `,
	data() {
		return {
			checkedEmails: [],
		};
	},
	methods: {
		emailInCheckedList(action, email) {
			const checkedEmails = this.checkedEmails;
			if (action === 'add') checkedEmails.push(email);
			else if (action === 'remove') {
				const id = checkedEmails.findIndex((emailIn) => emailIn.id === email.id);
				checkedEmails.splice(id, 1);
			}
		},
		clearChecks() {
			this.checkedEmails = [];
			eventBus.$emit('clearChecks');
		},
	},
	components: {
		emailPreview,
		listTools,
	},
};
