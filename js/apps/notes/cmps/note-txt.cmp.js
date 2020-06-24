import { noteService } from "../services/note-service.js";
import editBar from "./note-editbar.cmp.js";

export default {
  props: ["note"],
  template: `
        <section class="note-txt-item flex col space-around" :note="note" :style="getStyle"> 
            <i class="fas fa-thumbtack align-self-end"></i>
             <textarea v-model="note.info.txt" @blur="onSaveNote"></textarea>
             <section class="edited">{{getNoteChangedTime}}</section>
              <edit-bar :note="note"/>
        </section>
    `,
  data() {
    return {
      noteColor: this.note.style.backgroundColor,
    };
  },
  created() {
    console.log("YAY New Text note !!");
  },
  computed: {
    getNoteChangedTime() {
      let info = this.note.info;
      if (!info.editedAt) return "Created:" + info.createdAt;
      else return "Edited:" + info.editedAt;
    },
    getStyle() {
      return this.note.style;
    },
  },
  methods: {
    onSaveNote() {
      noteService.updateNote(this.note);
    },
  },
  components: {
    editBar,
  },
};
