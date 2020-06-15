<template>
  <div :class="$style.itemWrapper">
    <div :class="$style.itemTitle"><a :href="path">{{title}}</a></div>
    <div :class="$style.itemTime">{{time}}</div>
    <div :class="$style.subTitle">{{subTitle}}</div>
  </div>
</template>
<script>
export default {
  name: 'itemWrapper',
  props: {
    title: String,
    subTitle: String,
    path: String,
    time:String
  }
}
</script>
<style lang="stylus" module>
.itemWrapper
  display block
  padding 20px
  transition .3s
  margin-top 20px
  &:nth-child(2n)
    background-color #f9f9f8
  &:hover
    background-color #e1ecfd
.itemTitle
  cursor pointer
  margin-bottom 5px
  a
    font-size 1.1em
    color #3eaf7c
    font-weight 500
.itemTime
  margin-bottom 10px
  color #838672
  font-size .8em
</style>