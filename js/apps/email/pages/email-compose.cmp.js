import { emailService } from '../services/email-service.js';
import { eventBus } from '../../../services/event-bus.service.js';

export default {
	name:'email-compose',
	template: `
    <section class="email-compose flex col">
		<div class="form-informer" v-if="informer">{{informer}}</div>
		<div class="compose-opt flex space-between">
			<button class="compose-btn">Attach Img <i class="far fa-image"></i></button>
			<button @click="checkThenSend" class="compose-btn">Send <i class="far fa-paper-plane"></i></button>
		</div>
		<div class="compose-inputs"></div>
		<div class='general-details flex col'>
			<input type="text" disabled v-model="to"/>
			<input type="text" ref="elInputFrom" v-model="newEmail.from" placeholder="From:"/>
			<input type="text" v-model="newEmail.subject" placeholder="Subject:"/>
		</div>
		<textarea class="new-email-body grow" v-model="newEmail.body"/></div>
		<!-- <div class="new-email-body grow" contenteditable="true" ref="elBody" v-html="newEmail.body"></div> -->
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
			contentEditable: ''
		};
	},
	created(){
		if (this.$route.query.body){
			const body = this.$route.query.body
			const type = this.$route.query.type
			if(type==='noteText'|| type==='noteTodo')this.newEmail.body = body
			else if(type==='noteImage') this.newEmail.body = `<img src="${body}">`
			else if(type==='noteVideo') this.newEmail.body = `<iframe src="${body}"></iframe>`
			else if(type==='noteAudio'){
				this.newEmail.body = `<audio controls src="${body}">
				Your browser does not support the
				<code>audio</code> element.
			 	</audio>`
			} 
		}
	},
	mounted(){
		this.$refs.elInputFrom.focus()
		
	},
	computed:{

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
	},
};
