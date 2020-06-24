import { noteService } from "../services/note-service.js";
import noteText from "../cmps/note-txt.cmp.js";
import noteFilter from "../cmps/note-filter.cmp.js";
import noteAdd from "../cmps/note-add.cmp.js";

export default {
  template: `
        <div class="notes-app">
            <note-filter/>
            <note-add/>
            <section class="cmp-container">
                <component v-for="(cmp, idx) in notes" :is="cmp.type" :info="cmp.info" ></component>
            </section>
        </div>

    `,
  data() {
    return {
      notes: null,
    };
  },
  created() {
    noteService.getNotes().then((notes) => (this.notes = notes));
  },
  computed: {},
  methods: {},
  components: {
    noteText,
    noteFilter,
    noteAdd,
  },
};
