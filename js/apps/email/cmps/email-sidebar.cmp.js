export default {
    template:`
    <section class="side-bar flex col">
        <router-link to="">Compose</router-link>
        <router-link to="/email">Inbox</router-link>
        <router-link to="/email/stared">Stared</router-link>
        <router-link to="/email/sent">Sent</router-link>
        <router-link to="/email/drafts">Drafts</router-link>
        <router-link to="/email/deleted">Deleted</router-link>
        <button>indicator</button>
        
    </section>
    `,
    computed:{

    },
    methods:{

    },
    components:{
        
    }
}