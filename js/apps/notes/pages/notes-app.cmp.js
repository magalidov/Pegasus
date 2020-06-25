import { noteService } from "../services/note-service.js";
import { eventBus } from "../services/event-bus.service.js";
import noteItem from "../cmps/note-item.cmp.js";
import noteFilter from "../cmps/note-filter.cmp.js";
import noteAdd from "../cmps/note-add.cmp.js";

export default {
  template: `
        <div class="notes-app">
          <main>
              <note-filter @filter="setFilter"/>
              <note-add/>
              <section class="cmp-container">
                  <note-item v-for="(note, idx) in notesToShow" :note="note" ></note-item>
              </section>
          </main>
        </div>

    `,
  data() {
    return {
      notes: null,
      filterBy: null,
    };
  },
  created() {
    noteService.getNotes().then((notes) => (this.notes = notes));
    eventBus.$on("delete", (noteId) => noteService.deleteNote(noteId));
    eventBus.$on("add", (type, info) => noteService.addNewNote(type, info));
    eventBus.$on("update", (note) => noteService.updateNote(note));
  },
  computed: {
    notesToShow() {
      const filterBy = this.filterBy;
      if (!filterBy) return this.notes;
      let filteredNotes = this.notes.filter((note) => {
        if (filterBy.type === "all") return true;
        else return note.type === filterBy.type;
      });
      filteredNotes = filteredNotes.filter((note) => {
        if (filterBy.txt === "") return true;
        if (note.type !== "noteText") return false;
        return note.info.txt.toLowerCase().includes(filterBy.txt.toLowerCase());
      });
      return filteredNotes;
    },
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
  },
  components: {
    noteItem,
    noteFilter,
    noteAdd,
  },
};
