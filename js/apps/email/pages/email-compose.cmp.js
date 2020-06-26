import { emailService } from '../services/email-service.js';
import { eventBus } from '../../../services/event-bus.service.js';

export default {
	name:'email-compose',
	props: ['emailsToShow','emailToEdit'],
	template: `
    <section class="email-compose flex col">
        <input type="text" class='general-details' disabled v-model="to"/>
        <input type="text" class='general-details' ref="elInputFrom" v-model="newEmail.from" placeholder="From:"/>
        <input type="text" class='general-details' v-model="newEmail.subject" placeholder="Subject:"/>
		<textarea class="new-email-body grow" v-model="newEmail.body"/></div>
		<!-- <div class="new-email-body grow" contenteditable="true" ref="elBody" v-html="newEmail.body"></div> -->
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
			informer: '',
			newEmail: {
				subject: '',
				from: '',
				body: '',
				tags: { isRead: false, isStared: false, isSent: true},
				sentAt: '',
				id: null,
			},
		};
	},
	created(){
		if (emailToEdit){
			this.newEmail= emailToEdit
		}
	},
	mounted(){
		this.$refs.elInputFrom.focus()
		// console.log('this.$refs.elBody.innerHTML:', this.$refs.elBody.innerHTML)
	},
	computed:{
		// body(){
		// 	return this.$refs{elBody.innerHTML
		// }
	},
	methods: {
		sendEmail() {
			emailService
				.sendEmail(this.to, this.newEmail)
				.then(eventBus.$emit('sent'))
				.then(this.$router.push('/email'))
				.then(eventBus.$emit('message','Your Email Has Been Sent!','good-msg'))
		},
		checkThenSend() {
			let send = true;
			let email = this.newEmail;
			let informer = 'Missing Fields: ';
			if (!email.from) {
				informer += '\'From\'. ';
				send = false;
			} else if (email.from.indexOf('@') === -1) email.from += '@pegasus.com';
			if (!email.subject) {
				informer += '\'Subject\'. ';
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
		// body(change){
		// console.log('change:', change)

		// }
	},
};
