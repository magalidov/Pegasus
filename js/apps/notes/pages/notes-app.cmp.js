import { noteService } from "../services/note-service.js";
import noteItem from "../cmps/note-item.cmp.js";
import noteFilter from "../cmps/note-filter.cmp.js";
import noteAdd from "../cmps/note-add.cmp.js";

export default {
  template: `
        <div class="notes-app">
            <note-filter/>
            <note-add/>
            <section class="cmp-container">
                <note-item v-for="(note, idx) in notes"  :note="note" ></note-item>
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
    noteItem,
    noteFilter,
    noteAdd,
  },
};
