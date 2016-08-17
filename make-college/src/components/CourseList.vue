<template>
	<div id="course-list">
		<button @click="switchModeNotify('js')">Enable JS Mode</button>
		<button @click="switchModeNotify('web')">Enable Web Mode</button>
	</div>
</template>
<script>
export default {
  name: 'CourseList',

  methods: {
    switchModeNotify (mode) {
      this.$dispatch('switch-mode', mode)
    }
  }
}
</script>

<style type="text/css">
	#course-list{
		position: absolute;
		top: 0;
		right: 0;
		min-width: 400px;
		width: 40%;
		height: 100vh;
		background: white;
		z-index: 5;
	}
</style>