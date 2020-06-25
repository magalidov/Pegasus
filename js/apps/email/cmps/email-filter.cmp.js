export default {
    template:`
    <section class="email-filter flex justify-center">
        <input type="text" placeholder="Search your emails" v-model="filterBy.txt" @input="onFilter"/>
        <select class="filter-opt" v-model="filterBy.type" @change="onFilter">
            <option value="all">All</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
        </select>   
    </section>
    `,
    data(){
        return {
            filterBy:{
                txt:'',
                type:'all'
            }
        };
    },
    methods:{
        onFilter(){
            this.$emit('filter',this.filterBy)
        }
    },
}