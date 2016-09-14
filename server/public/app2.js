
// Vue.component('wysiwyg-editor', {
//   template:
//       `<div id="editor-menu">
//         <button class="mdl-button mdl-js-button mdl-button--icon" @click="bold">
//           <i class="material-icons">format_bold</i>
//         </button>
//         <button class="mdl-button mdl-js-button mdl-button--icon" @click="italic">
//           <i class="material-icons">format_italic</i>
//         </button>
//         <button class="mdl-button mdl-js-button mdl-button--icon" @click="underline">
//           <i class="material-icons">format_underlined</i>
//         </button>
//
//         <button class="mdl-button mdl-js-button mdl-button--icon" @click="unorderedList">
//           <i class="material-icons">format_list_bulleted</i>
//         </button>
//         <button class="mdl-button mdl-js-button mdl-button--icon" @click="orderedList">
//           <i class="material-icons">format_list_numbered</i>
//         </button>
//         <button class="mdl-button mdl-js-button mdl-button--icon" @click="addLink">
//           <i class="material-icons">insert_link</i>
//         </button>
//         <!-- headings  button-->
//         <button id="headings" class="mdl-button mdl-js-button">
//           <span>Headings</span>
//         </button>
//
//         <ul class="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect"
//             for="headings">
//           <li class="mdl-menu__item" @click="heading(1)">Heading 1</li>
//           <li class="mdl-menu__item" @click="heading(2)">Heading 2</li>
//           <li class="mdl-menu__item" @click="heading(3)">Heading 3</li>
//           <li class="mdl-menu__item" @click="heading(4)">Heading 4</li>
//           <li class="mdl-menu__item" @click="heading(5)">Heading 5</li>
//           <li class="mdl-menu__item" @click="heading(6)">Heading 6</li>
//         </ul>
//
//         <button class="mdl-button mdl-js-button mdl-button--icon" @click="clearFormat">
//           <i class="material-icons">format_clear</i>
//         </button>
//       </div>
//       <div >
//         <iframe id="editor"></iframe>
//         <div id="html-editor">
//           HTML Editor
//           <textarea id="textarea_id" v-model="textarea" @keyup="updateWysiwyg">Start writing ...</textarea>
//         </div>
//
//       </div>`
// });

new Vue({
  el: '#text-editor',
  data: function(){
    return{
      textarea: '...'
    }

  },
  filters: {
    marked: marked
  },

  ready: function(){

    var frame = document.getElementById('editor');
    // is it IE
    var isIE = /*@cc_on!@*/false;

    // assign frame document to variable
    this.frameDoc = isIE ? frame.contentWindow.document : frame.contentDocument;
    this.frameDoc.open();
    this.frameDoc.write('<html><head></head><body>'+ this.textarea +'</body></html>');
    this.frameDoc.close();
    this.frameDoc.designMode = 'on';

    if(this.frameDoc.addEventListener) {
        this.frameDoc.addEventListener('DOMSubtreeModified',  this.updateTextarea,false);
    } else if(this.frameDoc.attachEvent) {
        //frameDoc.attachEvent('IE Event',this.updateTextarea);
    }

  },

  methods: {

    updateTextarea: function(event){
      this.textarea = this.frameDoc.getElementsByTagName('body')[0].innerHTML;
    },

    updateWysiwyg: function(event){
      this.frameDoc.open();
      this.frameDoc.write('<html><head></head><body>'+ this.textarea +'</body></html>');
      this.frameDoc.close();
      this.frameDoc.designMode = 'on';

      if(this.frameDoc.addEventListener) {
          this.frameDoc.addEventListener('DOMSubtreeModified',  this.updateTextarea,false);
      } else if(this.frameDoc.attachEvent) {
          //this.frameDoc.attachEvent('IE Event',this.updateTextarea);
      }

    },

    bold: function (event){
      //console.log(this.frameDoc.getSelection());

            var wanderer = this.frameDoc.createTextNode("")
            if (this.frameDoc.getSelection) {  // all browsers, except IE before version 9
                var selection = this.frameDoc.getSelection ();

                if (selection.rangeCount > 0) {
                    var range = selection.getRangeAt (0);
                    range.insertNode (wanderer);
                }
            }
            else {  // Internet Explorer before version 9
                console.log("not supported");
            }

      // this.frameDoc.execCommand('bold', false, null);
    },

    italic: function(event){
      this.frameDoc.execCommand('italic', false, null);
    },
    underline: function(event){
      this.frameDoc.execCommand('underline', false, null);
    },
    unorderedList: function(event){
      this.frameDoc.execCommand('InsertUnorderedList', false, 'newUL');
    },
    orderedList: function(event){
      this.frameDoc.execCommand('InsertOrderedList', false, 'newOL');
    },
    heading: function(num, event){
      this.frameDoc.execCommand('formatBlock', false, '<h' + num + '>');
    },
    addLink: function (event) {
      var linkURL = prompt('Enter the URL for this link:', 'http://');
	    this.frameDoc.execCommand('CreateLink', false, linkURL);
    },
    clearFormat: function (event) {
      console.log('clear');
      this.frameDoc.execCommand('removeFormat', false, null);
    }
  }
});
