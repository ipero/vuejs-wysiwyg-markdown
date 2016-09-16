var textarea = {
  message: 'Start typing ...'
};
var und = new upndown();

Vue.component('wysiwyg-toolbar', {
  data: function(){
    return {
      privateState: {},
      sharedState: textarea
    }
  },
  ready: function(){
    var elem = document.getElementById('text');
    elem.addEventListener('DOMSubtreeModified', this.updatePreview, false);
  },
  methods: {
    updatePreview: function(){
      var textFromEditor="";
      var el = document.getElementById('text');

      und.convert(el.innerHTML, function(err, markdown) {
        if(err) {
          console.log(err);
        }
        else {
          vm.grabText(markdown);
        }

      });
      

    },
    bold: function (event){
      document.execCommand('bold');
    },
    italic: function(event){
      document.execCommand('italic', false, null);
    },
    underline: function(event){
      document.execCommand('underline', false, null);
    },
    unorderedList: function(event){
      document.execCommand('InsertUnorderedList', false, 'newUL');
    },
    orderedList: function(event){
      document.execCommand('InsertOrderedList', false, 'newOL');
    },
    heading: function(num, event){
      document.execCommand('formatBlock', false, '<h' + num + '>');
    },
    addLink: function (event) {
      var linkURL = prompt('Enter the URL for this link:', 'http://');
      document.execCommand('CreateLink', false, linkURL);
    },
    clearFormat: function (event) {
      console.log('clear');
      document.execCommand('removeFormat', false, null);
    }
  },

  template:
      `<div id="editor-menu">
        <button class="mdl-button mdl-js-button mdl-button--icon" @click="bold">
          <i class="material-icons">format_bold</i>
        </button>
        <button class="mdl-button mdl-js-button mdl-button--icon" @click="italic">
          <i class="material-icons">format_italic</i>
        </button>
        <button class="mdl-button mdl-js-button mdl-button--icon" @click="underline">
          <i class="material-icons">format_underlined</i>
        </button>

        <button class="mdl-button mdl-js-button mdl-button--icon" @click="unorderedList">
          <i class="material-icons">format_list_bulleted</i>
        </button>
        <button class="mdl-button mdl-js-button mdl-button--icon" @click="orderedList">
          <i class="material-icons">format_list_numbered</i>
        </button>
        <button class="mdl-button mdl-js-button mdl-button--icon" @click="addLink">
          <i class="material-icons">insert_link</i>
        </button>
        <!-- headings  button-->
        <button id="headings" class="mdl-button mdl-js-button">
          <span>Headings</span>
        </button>

        <ul class="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect"
            for="headings">
          <li class="mdl-menu__item" @click="heading(1)">Heading 1</li>
          <li class="mdl-menu__item" @click="heading(2)">Heading 2</li>
          <li class="mdl-menu__item" @click="heading(3)">Heading 3</li>
          <li class="mdl-menu__item" @click="heading(4)">Heading 4</li>
          <li class="mdl-menu__item" @click="heading(5)">Heading 5</li>
          <li class="mdl-menu__item" @click="heading(6)">Heading 6</li>
        </ul>

        <button class="mdl-button mdl-js-button mdl-button--icon" @click="clearFormat">
          <i class="material-icons">format_clear</i>
        </button>
      </div>
      <div >
        <div id="text" style="min-height: 200px; padding: 1em" contenteditable></div>
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
  template: '<div style="min-height: 200px; background: #dadada" v-html="sharedState.message"></div>'
});


var vm = new Vue({
  el: '#app',
  data: function(){
    return {
      privateState: {},
      sharedState: textarea
    }
  },
  methods:{
    grabText: function (text) {
      this.sharedState.message = text;
    }
  }

});
