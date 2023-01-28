## vue2-preprocess-loader

### Introduction

`vue2-preprocess-loader`支持在vue2中使用条件编译功能, 如果需要js的，请[点击此处](https://www.npmjs.com/package/js-preprocess-loader).

条件编译支持：
```
@ifdef 变量名
  code...
@endif
```
```
@ifndef 变量名
  code...
@endif
```

### Example
```
<template>
  <div class="hello">
    <!-- @ifdef web -->
    <h1>{{ msg }}</h1>
    <!-- @endif -->
    <p>hello world!</p>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
        // @ifdef h5
        msg: "h5",
        // @endif
        // @ifdef web
        msg: "web",
        // @endif
    }
  }
}
</script>
<style scoped>
h1 {
  margin: 40px 0 0;
  /* @ifdef h5 */
  color: red;
  /* @endif */
}
</style>
```

### Install

```
npm install vue2-preprocess-loader
```

### Usage

需要在项目运行的时候添加临时node的环境变量`platform`

```
vue.config.js

module.exports = { 
    chainWebpack: config => {
      config.module
        .rule("preprocess")
        .test(/\.vue$/)
        .use('preprocess')
        .loader('vue2-preprocess-loader')
        .end()
    }
  }
```
```
package.json
"scripts": {
    "serve": "cross-env platform=h5 vue-cli-service serve"
}
```
### All directives
```
@ifdef 变量 /@endif 包括定义其中的代码块
@ifndef 变量 /@endif 不包括其中定义的代码块
```

