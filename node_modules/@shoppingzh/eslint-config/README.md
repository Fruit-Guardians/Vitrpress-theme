# eslint-config
我的eslint配置

## 安装

```
# pnpm
pnpm i -D @shoppingzh/eslint-config

# yarn
yarn add -D @shoppingzh/eslint-config

# npm
npm i -D @shoppingzh/eslint-config
```

## 使用

`eslint.config.js`

```js
import { javascript, stylistic, typescript, vue, } from '@shoppingzh/eslint-config'

export default [
  ...javascript(),
  ...stylistic(),
  ...typescript(),
  ...vue({
    typescript: true,
  }),
]
```