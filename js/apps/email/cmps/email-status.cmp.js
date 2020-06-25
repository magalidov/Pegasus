export default {
    name:'email-status',
    props:['allEmails'],
    template:`
    <section class="email-status" v-if="allEmails">
        <span>You have {{unreadCount}} unread emails out of {{emailsCount}}</span>
    </section>
    `,
    computed:{
        emailsCount(){
            return this.allEmails.length
        },
        unreadCount(){
            return this.allEmails.filter(email=> email.tags.isRead===false).length
        }
    },
}