var textarea = {
  message: 'Start typing ...'
};

Vue.component('wysiwyg-toolbar', {
  data: function(){
    return {
      privateState: {},
      sharedState: textarea
    }
  },

  methods: {
    getSelectionPoints: function(){
          var startPos;
          var endPos;
          var textComponent = document.getElementById('textarea');
          var selectedText;
          // IE version
          if (document.selection != undefined)
          {
            textComponent.focus();
            var sel = document.selection.createRange();
            selectedText = sel.text;
          }
          // Mozilla version
          else if (textComponent.selectionStart != undefined)
          {
            startPos = textComponent.selectionStart;
            endPos = textComponent.selectionEnd;
            selectedText = textComponent.value.substring(startPos, endPos)
          }
          return {
            start: startPos,
            end: endPos,
            text: selectedText
          }

    },

    addMarkdown: function(selectedText, leftMark, rightMark, link){
      if(leftMark == false){
        leftMark = "";
      }
      if(rightMark == false){
        rightMark = "";
      }

      var text = this.sharedState.message;
      //check if link exist
      if(link!=false){
        rightMark += rightMark + "(" + link + ") "
      }
      //check if multiple lines were selected
      if(selectedText.text.search("\n")==-1){
        text = [text.slice(0, selectedText.end), rightMark, text.slice(selectedText.end)].join('');
        text = [text.slice(0, selectedText.start), leftMark, text.slice(selectedText.start)].join('');
      }else{
        // text = [text.slice(0, selectedText.end), rightMark, text.slice(selectedText.end)].join('');
        // text = [text.slice(0, selectedText.start), leftMark, text.slice(selectedText.start)].join('');
        console.log(selectedText.text.search("\n"));
      }
      return text;

    },
    bold: function (event){
      this.sharedState.message = this.addMarkdown(this.getSelectionPoints(), '**', '**', false);
    },
    italic: function(event){
      this.sharedState.message = this.addMarkdown(this.getSelectionPoints(), '_', '_', false);
    },
    underline: function(event){

    },
    unorderedList: function(event){
      this.sharedState.message = this.addMarkdown(this.getSelectionPoints(), '* ', false, false);
    },
    orderedList: function(event){
      this.sharedState.message = this.addMarkdown(this.getSelectionPoints(), '1. ', false, false);
    },
    heading: function(num, event){
      // create #### string based on num value
      var headings = "";
      for(var i=0; i<num; i++){
        headings += "#";
      }
      headings += " ";
      this.sharedState.message = this.addMarkdown(this.getSelectionPoints(), headings, false, false);
    },
    addLink: function (event) {
      var link = prompt('Enter the URL for this link:', 'http://');
      this.sharedState.message = this.addMarkdown(this.getSelectionPoints(), "[", "]", link);;
    },
    clearFormat: function (event) {
      console.log('clear');

    }
  },
  template: `<div>
        <button class='mdl-button mdl-js-button mdl-button--icon' @click='bold'>
          <i class='material-icons'>format_bold</i>
        </button>
        <button class='mdl-button mdl-js-button mdl-button--icon' @click='italic'>
          <i class='material-icons'>format_italic</i>
        </button>
        <button class='mdl-button mdl-js-button mdl-button--icon' @click='underline'>
          <i class='material-icons'>format_underlined</i>
        </button>

        <button class='mdl-button mdl-js-button mdl-button--icon' @click='unorderedList'>
          <i class='material-icons'>format_list_bulleted</i>
        </button>
        <button class='mdl-button mdl-js-button mdl-button--icon' @click='orderedList'>
          <i class='material-icons'>format_list_numbered</i>
        </button>
        <button class='mdl-button mdl-js-button mdl-button--icon' @click='addLink'>
          <i class='material-icons'>insert_link</i>
        </button>
        <!-- headings  button-->
        <button id='headings' class='mdl-button mdl-js-button'>
          <span>Headings</span>
        </button>

        <ul class='mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect'
            for='headings'>
          <li class='mdl-menu__item' @click='heading(1)'>Heading 1</li>
          <li class='mdl-menu__item' @click='heading(2)'>Heading 2</li>
          <li class='mdl-menu__item' @click='heading(3)'>Heading 3</li>
          <li class='mdl-menu__item' @click='heading(4)'>Heading 4</li>
          <li class='mdl-menu__item' @click='heading(5)'>Heading 5</li>
          <li class='mdl-menu__item' @click='heading(6)'>Heading 6</li>
        </ul>

        <button class='mdl-button mdl-js-button mdl-button--icon' @click='clearFormat'>
          <i class='material-icons'>format_clear</i>
        </button>
        <textarea id="textarea" style="min-height: 200px; padding: 1em" contenteditable v-model="sharedState.message"></textarea>
      </div>`
});


Vue.component('wysiwyg-preview', {
  data: function(){
    return{
      privateState: {},
      sharedState: textarea
    }
  },
  filters: {
    marked: marked
  },
  template: '<div style="min-height: 200px; background: #dadada" v-html="sharedState.message | marked"></div>'
});


var vm = new Vue({
  el: '#app'

});
