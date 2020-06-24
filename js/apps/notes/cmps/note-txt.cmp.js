import { noteService } from "../services/note-service.js";

export default {
  props: ["note"],
  template: `
        <section class="note-txt-item" :note="note" :style="getStyle"> 
            <i class="fas fa-thumbtack"></i>
             <textarea v-model="note.info.txt" :style="getStyle"></textarea>
             <section class="createdAt">{{getNoteChangedTime}}</section>
             <section class="edit-bar flex space-between">
                <i class="fas fa-font"></i>
                <label for="colorInput">
                <i class="fas fa-palette">
                    <input v-model="noteColor" id="colorInput" type="color" @change="onSaveNote">
                </i>
                </label>
                <i class="fas fa-image"></i>
                <i class="save-icon fas fa-save" @click="onSaveNote"></i>
             </section>

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
    getStyle(){
      return this.note.style
    }
  },
  methods: {
    onSaveNote() {
      noteService.updateNote(this.note.id, { ...this.note });
    },
  },
  components: {},
};
