import { eventBus } from "../services/event-bus.service.js";
import editBar from "./note-editbar.cmp.js";
import noteText from "./note-txt.cmp.js";
import noteImage from "./note-img.cmp.js";
import noteVideo from "./note-video.cmp.js";
import noteTodo from "./note-todos.cmp.js";
import noteAudio from "./note-audio.cmp.js";

export default {
  props: ["note"],
  template: `
        <section class="note-item flex col space-around" :note="note" :style="getStyle"> 
            <i class="pinned fas fa-thumbtack align-self-end" ></i>
             <component :is="note.type" :note="note" @edit="saveChanges"/></component>
             <section class="edited">
                 {{getNoteChangedTime}}
             </section>
              <edit-bar :note="note"/>
        </section>
    `,
  data() {
    return {
      noteColor: this.note.style.backgroundColor,
    };
  },
  computed: {
    getNoteChangedTime() {
      if (!this.note.editedAt) return "Created: " + this.note.createdAt;
      else return "Edited: " + this.note.editedAt;
    },
    getStyle() {
      return this.note.style;
    },
  },
  methods: {
    saveChanges() {
      this.note.isOnEdit = false;
      eventBus.$emit("update", this.note);
    },
  },
  components: {
    editBar,
    noteText,
    noteImage,
    noteVideo,
    noteTodo,
    noteAudio,
  },
};
