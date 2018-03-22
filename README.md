### music-vue

> A music app project based on vue

### 效果预览

![](https://music-blog.oss-cn-beijing.aliyuncs.com/20180322181908.png)
![](https://music-blog.oss-cn-beijing.aliyuncs.com/201803221819081.png)
![](https://music-blog.oss-cn-beijing.aliyuncs.com/201803221819082.png)
![](https://music-blog.oss-cn-beijing.aliyuncs.com/201803221819083.png)
![](https://music-blog.oss-cn-beijing.aliyuncs.com/20180322190050.png)
![](https://music-blog.oss-cn-beijing.aliyuncs.com/20180322190056.png)

### 项目说明

- 本项目是参考视频教程编写的，教程地址 [Vue 2.0 高级实战-开发移动端音乐WebApp](https://coding.imooc.com/class/107.html)
- 教程讲师黄轶老师的Github地址 [HuangYi](https://github.com/ustbhuangyi)
- 项目构建的技术栈 vue axios vuex vue-router better-scroll
- 视频教程中使用的vue是2.3.3的版本，本项目使用的是2.5.2的版本，所以会有不同

### 本项目的一些不同点

```
props

# 视频教程
 props: {
    data: {
      type: Array,
      default: []
    }
 }

# 本项目
  props: {
      data: {
        type: Array,
        default: () => []
      }
  }
```
> 这是因为vue2.5版本要求props的数组/对象的默认值应当由一个工厂函数返回

### Build Setup

``` bash
# clone project
git clone https://github.com/liutaochange/music-vue.git

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
