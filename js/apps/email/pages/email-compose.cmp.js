import { emailService } from '../services/email-service.js';
import { eventBus } from '../../../services/event-bus.service.js';

export default {
	name:'email-compose',
	prop: ['emailsToShow'],
	template: `
    <section class="email-compose flex col">
        <input type="text" disabled v-model="to"/>
        <input type="text" v-model="newEmail.from" placeholder="From: Your Adress"/>
        <input type="text" v-model="newEmail.subject" placeholder="Subject"/>
        <textarea class="new-email-body grow" contenteditable="true" v-model="newEmail.body"/></div>
        <div class="form-informer" v-if="informer">{{informer}}</div>
        <div class="compose-opt flex space-between">
            <button>Attach Img</button>
            <button @click="checkThenSend">Send</button>
        </div>
    </section>
    `,
	data() {
		return {
			to: 'To: me@myself.com',
			newEmail: {
				subject: '',
				from: '',
				body: '',
				tags: { isRead: false, isStared: false, isSent: true},
				sentAt: '',
				id: null,
			},
			informer: '',
		};
	},
	methods: {
		sendEmail() {
			emailService
				.sendEmail(this.to, this.newEmail)
				.then(eventBus.$emit('sent'))
				.then(this.$router.push('/email'));
		},
		checkThenSend() {
			let send = true;
			let email = this.newEmail;
			let informer = 'Attention: ';
			if (!email.from) {
				informer += 'Fill \'From\' Field. ';
				send = false;
			} else if (email.from.indexOf('@') === -1) email.from += '@pegasus.com';
			if (!email.subject) {
				informer += 'Fill \'Subject\' Field. ';
				send = false;
			}
			if (send) this.sendEmail();
			else this.showInformer(informer);
		},
		showInformer(msg) {
			this.informer = msg;
		},
	},
	watch: {
		newEmail: {
			deep: true,
			handler() {
				this.informer = '';
			},
		},
	},
	components: {},
};
