<template>
  <div id="wrapper">
    <header-mc v-on:show-course-list="showCourseList"></header-mc>
    <course-content></course-content>
    <code-editor v-on:code-area-loaded="renderCodeMirror" v-ref:editor></code-editor>
    <results-browser v-show="resultsBrowserDisplay"></results-browser>
    <middle-bg v-show="middleBgDisplay" @click="closeMiddleBg"></middle-bg>
    <course-list v-show="courseListDisplay" v-on:switch-mode="switchMode"></course-list>
    
  </div>
</template>

<script>
import HeaderMc from './components/Header'
import CourseList from './components/CourseList'
import MiddleBg from './components/MiddleBg'
import CourseContent from './components/CourseContent'
import CodeEditor from './components/CodeEditor'
import ResultsBrowser from './components/ResultsBrowser'

export default {
  name: 'App',

  data () {
    return {
      courseListDisplay: false,
      middleBgDisplay: false,
      resultsBrowserDisplay: true,
      layoutMode: 'web'
    }
  },
  methods: {
    renderCodeMirror () {
      console.log('code-editor created:' + CodeEditor)
    },
    showCourseList () {
      console.log('showCourseList in App.vue triggered')
      this.middleBgDisplay = true
      this.courseListDisplay = true
    },
    toggleCourseList () {
      console.log('toggleCourseList in App.vue triggered')
      this.middleBgDisplay = !this.middleBgDisplay
      this.courseListDisplay = !this.courseListDisplay
    },
    closeMiddleBg () {
      // since MiddleBg might display with elements other than CourseList
      // program have to make sure when the MiddleBg set hidden
      // any elements on top of MiddleBg should also set hidden
      // by adding more logic in this method
      if (this.courseListDisplay && this.middleBgDisplay) {
        this.toggleCourseList()
      }
    },
    switchMode (mode) {
      // 'mode' is passed by CourseList.vue
      // 'js' refers to 2-column layout
      // 'web' refers to 3-column layout
      // console.log(mode)
      if (mode !== this.layoutMode) {
        if (mode === 'js') {
          console.log('Switch to js mode')
          this.resultsBrowserDisplay = false
          console.log(this.$refs.editor.layout.codeSmall)
          this.$refs.editor.layout.codeSmall = false
          window.mcCodeEditor.setOption('mode', 'javascript')
          this.$http.get('http://localhost:3000/course').then((response) => {
            console.log(response.body)
          }, (response) => {
            console.error(response)
          })
        }
        if (mode === 'web') {
          console.log('Switch to web mode')
          this.resultsBrowserDisplay = true
          this.$refs.editor.layout.codeSmall = true
          window.mcCodeEditor.setOption('mode', this.$refs.editor.codeMirrorMode.mixedMode)
        }
        this.layoutMode = mode
      } else {
        console.log('Do nothing about layout since it did not change')
      }
      this.closeMiddleBg()
    }
  },
  components: {
    HeaderMc,
    CourseList,
    MiddleBg,
    CourseContent,
    CodeEditor,
    ResultsBrowser
  }
}

</script>

<style>
html, body {
  font-family:Futura;
  font-size:13px;
  height:100%;
  background-color:#4F5261;
  margin:0px; 
  overflow:hidden;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

#wrapper{
  position:relative;
  width:100%;
  min-height:600px;
  min-width: 960px;
  margin: 0, auto;
}


</style>
