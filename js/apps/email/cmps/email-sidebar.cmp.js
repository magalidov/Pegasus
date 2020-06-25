export default {
    template:`
    <section class="side-bar flex col space-between">
        <div class="sidebar-links">
            <router-link class="side-link" to="/email/compose/new"><i class="fas fa-file"></i>Compose</router-link>
            <router-link class="side-link" to="/email"><i class="fas fa-inbox-in"></i>Inbox</router-link>
            <router-link class="side-link" to="/email/sent"><i class="fas fa-inbox-out"></i>Sent</router-link>
            <router-link class="side-link" to="/email/stared"><i class="fas fa-star"></i>Stared</router-link>
            <router-link class="side-link" to="/email/drafts"><i class="fab fa-firstdraft"></i>Drafts</router-link>
            <router-link class="side-link" to="/email/deleted"><i class="fas fa-trash"></i>Deleted</router-link>
        </div>
        <p>indicator</p>
        
    </section>
    `,
    computed:{

    },
    methods:{

    },
    components:{
        
    }
}