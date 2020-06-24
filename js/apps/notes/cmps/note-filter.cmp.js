export default {
    template:`
    <section class="note-filter">
        <input type="text" placeholder="Search your notes"/>
        <select class="filter-opt">
            <option value="all">All</option>
            <option value="date">Date</option>
            <option value="text">Text</option>
            <option value="imgae">Image</option>
            <option value="todo">Todo</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
        </select>   
    </section>
    `,
    computed:{

    },
    methods:{

    },
    components:{
        
    }
}