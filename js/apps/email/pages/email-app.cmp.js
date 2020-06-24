// import emailFilter from '../cmps/email-filter.cmp.js';
// import emailTags from '../cmps/email-tags.cmp.js';

export default {
	template: `
    <section class="">
        <h1>Email</h1>
        <!-- <email-filter/> -->
		
        <email-list v-if="emailsToShow" :emails="emailsToShow"/>
        <!-- <email-tags/> -->
    </section>
    `,
	computed: {},
	methods: {},
	components: {
		// emailFilter,
		// emailTags,
	},
};
