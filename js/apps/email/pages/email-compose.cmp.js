export default {
    prop:['emailsToShow'],
    template:`
    <section class="email-compose flex col">
        <input type="text" disabled v-model="to"/>
        <input type="text" v-model="newEmail.from" placeholder="From: Your Adress"/>
        <input type="text" v-model="newEmail.subject" placeholder="Subject"/>
        <textarea class="new-email-body grow" contenteditable="true" v-model="newEmail.body"/></div>
        <div class="compose-opt flex space-between">
            <button>Attach Img</button>
            <button>Send</button>
        </div>
    </section>
    `,
    data(){
        return {
            to: 'To: me@myself.com',
            newEmail:{
                subject: '',
                from: '',
                body:``,
                tags: { isRead: false, isStared: false },
                sentAt: '',
                id: null,
            },
        }

    },
    created(){

    },
    computed:{

    },
    methods:{

    },
    components:{
        
    }
}