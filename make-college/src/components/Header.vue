<template>
	<div id="header">
		<span id="logo">MakeCollege</span>
		<div id="menu-list">
			<span>name</span>
			<span>Aboutus</span>
			<span @click="showCourseList">Courses</span>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Header',

  methods: {
    showCourseList () {
      // this.$parent.toggleCourseList()
      // console.log(this.$parent)
      this.$dispatch('show-course-list')
    }
  }
}
</script>

<style type="text/css">
	#header{
		height: 64px;
		width: 100%;
		/*background: red;*/
		
	}
	#logo{
		line-height: 64px;
		position: relative;
		left: 49px;
		font-size: 24px;
		color: #fff;
		opacity: 0.3;
	}
	#logo:hover{
		opacity: 1;
		cursor: default;
	}
	#menu-list{
		display: inline-block;
		height: 64px;
		width: auto;
		position: absolute;
		right: 49px;
		/*background: red;*/
	}
	#menu-list span{
		display: inline-block;
		height: 64px;
		line-height: 64px;
		/*background: red;*/
		float: right;
		margin-left: 30px;
		font-size: 20px;
		color: #fff;
		opacity: 0.3;
		font-weight: lighter;
	}
	#menu-list span:hover{
		opacity: 1;
		cursor: pointer;
	}
</style>