<template>
  <div class="mb-5">
    <div>
      <v-btn @click="addTag">Add title</v-btn>

      <v-btn @click="logContent">log</v-btn>
      <v-btn @click="saveContent">save</v-btn>
    </div>
    <div>
      <v-btn @click="toggleTag">{{ tagStage.toUpperCase() }}</v-btn>
      <v-btn @click="toggleStrong">{{ boldStage }}</v-btn>
    </div>
    <div>
      <v-btn @click="alignLeft">left</v-btn>
      <v-btn @click="alignCenter">center</v-btn>
      <v-btn @click="alignRight">right</v-btn>
    </div>
  </div>
  <v-card class="ma-5" elevation="5">
    <div
      class="pa-5"
      contenteditable="true"
      v-html="htmlContent"
      ref="editableDiv"
      @input="updateToggleState"
      @click="updateToggleState"
      @keyup="updateToggleState"
    ></div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      htmlContent: "<p>This is some <strong>HTML</strong> content.</p>",
      tagStage: "p",
      boldStage: "bold",
      isH1: false,
    };
  },
  watch: {
    htmlContent(val) {
      this.htmlContent = val;
    },
  },

  methods: {
    addTag() {
      this.saveContent();
      this.htmlContent += "<h1>Add text here</h1>";
    },
    logContent() {
      console.log(this.htmlContent);
    },
    saveContent() {
      this.htmlContent = this.$refs.editableDiv.innerHTML;
    },

    alignLeft() {
      document.execCommand("justifyLeft", false, null); // Align selected text to the left
      this.saveContent();
    },
    alignCenter() {
      document.execCommand("justifyCenter", false, null); // Align selected text to the center
      this.saveContent();
    },
    alignRight() {
      document.execCommand("justifyRight", false, null); // Align selected text to the right
      this.saveContent();
    },

    toggleTag() {
      const commandValue = document.queryCommandValue("formatBlock");
      if (commandValue === "h1") {
        this.isH1 = true;
      } else {
        this.isH1 = false;
      }
      this.isH1 = !this.isH1; // Toggle the flag
      if (this.isH1) {
        this.changeToH1();
      } else {
        this.changeToP();
      }
      this.saveContent();
    },
    changeToH1() {
      document.execCommand("formatBlock", false, "<h1>"); // Change selected text to H1
    },
    changeToP() {
      document.execCommand("formatBlock", false, "<p>"); // Change selected text to P
    },

    toggleStrong() {
      document.execCommand("bold", false, null); // Toggle bold for selected text

      this.isBold = !this.isBold;
      if (this.isBold) {
        this.boldStage = "bold";
      } else {
        this.boldStage = "not bold";
      }
      this.saveContent();
    },

    updateToggleState() {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const parentElement = range.startContainer.parentElement;

      this.checkH1Element(parentElement);
      this.checkBoldElement(parentElement);
      // Check if the selected text is bold
    },
    checkH1Element(parentElement) {
      if (
        parentElement &&
        (parentElement.tagName === "H1" || parentElement.tagName === "P")
      ) {
        this.tagStage = parentElement.tagName.toLowerCase();
        this.isH1 = parentElement.tagName === "H1";
      } else {
        // If the cursor is not inside an H1 or P tag, default to P
        this.tagStage = "p";
        this.isH1 = false;
      }
    },
    checkBoldElement(parentElement) {
      if (
        parentElement &&
        (parentElement.tagName === "H1" || document.queryCommandState("bold"))
      ) {
        this.boldStage = "bold";
        this.isBold = document.queryCommandState("bold");
      } else {
        this.boldStage = "not bold";
        this.isBold = false;
      }
    },
  },
};
</script>
