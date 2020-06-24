export default {
  props: ["info"],
  template: `
        <section class="note-txt-item" :info="info"> 
             {{info.txt}}
        </section>
    `,
  //   data() {},
  //   created() {},
  computed: {},
  methods: {},
  components: {},
};
