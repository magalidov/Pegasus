import { noteService } from "../services/note-service.js";
import NoteText from "../cmps/note-txt.cmp.js";

export default {
  template: `
        <div class="notes-app">
            <component v-for="(cmp, idx) in notes" :is="cmp.type" :info="cmp.info" ></component>
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
    NoteText,
  },
};
