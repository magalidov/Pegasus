import emailPreview from '../cmps/email-preview.cmp.js'

export default {
    props: ['emails'],
    template:`
    <section class="email-list">
        <h1>list</h1>
        <email-preview v-for="email in emails" :email="email" :key="email.id"/>
    </section>
    `,
    computed:{

    },
    methods:{

    },
    components:{
        emailPreview,
    }
}