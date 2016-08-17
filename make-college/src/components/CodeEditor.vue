<template>
	<div id="code-editor" :class="{ 'code-editor-small': layout.codeSmall, 'code-editor-medium': !layout.codeSmall }">
    <div id="textarea-wrapper" @click="focusEditor">
      <textarea id="code-area" v-el:code-area></textarea>
    </div>
    <div class="button-set">
      <div class="reset" @click="resetCode">Reset</div><!-- 
       --><div class="run" @click="runCode">Run</div>
    </div>
	</div>
</template>

<script>
export default {
  name: 'CodeEditor',
  events: {
    'hook:created': function () {
      this.$dispatch('code-area-loaded')
    }
  },
  data () {
    return {
      defaultCode: 'var a = 5\n',
      testFunc: {
        first: {
          TEST_TITLE: "Variable a should be 5",
          TEST_FUNC: "if(a === 5){TEST_RESULT = {state:true}}else{TEST_RESULT = {state:false ,error:'Variable a should be 5'}} ",
          TEST_RESULT: null
        }
      },
      layout: {
        codeSmall: true  // 'true' for 3-coulum layout, 'false' for 2-column layout
      },
      codeMirrorMode: {
        mixedMode : {
          name: "htmlmixed",
          scriptTypes: [{matches: /\/x-handlebars-template|\/x-mustache/i,
                       mode: null},
                      {matches: /(text|application)\/(x-)?vb(a|script)/i,
                       mode: "vbscript"}]
        }
      }
    }
  },
  methods: {
    runCode () {
      // console.log('Run-button clicked')
      console.log(window.mcCodeEditor.getValue())
      var mcCode = window.mcCodeEditor.getValue()
      var mcTestFunc = this.testFunc.first.TEST_FUNC
      var TEST_RESULT = null
      function evalResult (code, test) {
        console.log("1")
        eval(code + '\n' + test)
        console.log("2")
      }
      try {
        evalResult(mcCode, mcTestFunc)
      } catch (err) {
        console.log('Error in eval:' + err) //here we can get error in cosole
      }
      console.log('Test result: ' + TEST_RESULT)
    },
    resetCode () {
      console.log('Reset-button clicked')
      window.mcCodeEditor.setValue(this.defaultCode)
    },
    focusEditor () {
      window.mcCodeEditor.focus()
    }
  },
  ready () {
    console.log('ready!!!!!!' + this.$els.codeArea)
    var initialMode = this.codeMirrorMode.mixedMode
    window.mcCodeEditor = window.CodeMirror.fromTextArea(this.$els.codeArea, {
      mode: initialMode,
      selectionPointer: true,
      viewportMargin: Infinity,
      lineWrapping: true,
      lineNumbers: true
    })
    console.log('initialMode: ' + initialMode.name)
    window.mcCodeEditor.setValue(this.defaultCode)
  }
}
</script>

<style type="text/css">
	#code-editor {
		display: inline-block;
		position: relative;
		top: 0px;
		left: 20px;
		/*width: calc(35% - 16px);*/
		height: calc(100vh - 76px);
		min-height: 524px;
		border-radius: 3px;
		overflow: scroll;
		/*padding: 15px 35px;*/
	}
  .code-editor-small {
    width: calc(35% - 16px);
  }
  .code-editor-medium {
    width: calc(65% - 20px);
  }
  #textarea-wrapper {
    display: inline-block;
    position: absolute;
    width: calc(100%);
    height: calc(100vh - 130px);
    top: 0;
    left: 0;
    background: #fff;
    border-radius: 3px;
    overflow: scroll;
  }
	#code-area {
		display: inline-block;
		position: absolute;
		top: 0;
		left: 0;
	}
  .button-set {
    display: inline-block;
    position: absolute;
    width: calc(100%);
    top: calc(100vh - 124px);
    left: 0;
  }
  .button-set div {
    display: inline-block;
    width: calc(50% - 3px);
    height: 48px;
    border: none;
    border-radius: 3px;
    padding: 0px;
    line-height: 48px;
    color: #fff;
    font-size: 20px;
    font-family: Ubuntu;
    font-weight: lighter;
    text-align: center;
  }
  div.run {
    margin-left: 6px;
    background: #66CCAF;
  }
  div.reset {
    background: #A3A7B8;
  }
  div.run:hover {
    background: #46AC8F;
    cursor: pointer;
  }
  div.reset:hover {
    background: #838798;
    cursor: pointer;
  }
</style>