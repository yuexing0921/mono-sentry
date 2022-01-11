# 关于Nx部署sentry的demo示例

这个项目模拟了Nx项目是如何部署sentry的，为了简化复杂度，专注于核心的流程，就都选用了React项目，如果有其他项目其实也是一样的，就是需要做一些额外的修改而已。

``` bash
# client代码
  libs/common/src/lib/sentry.ts

# source map上传代码
  script/uploadSourceMap.js

# 用于不同project项目，生成对应的release信息
  script/genBuildRelease.js

# sentry 配置（这块后面的key会删除，请自行替换成需要的key）
  script/sentry.properties
```

## 更详细的中文说明文档
https://www.yuque.com/yuexing0921/blog/hargup