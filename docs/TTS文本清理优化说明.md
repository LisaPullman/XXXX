# TTS文本清理优化说明

## 🎯 问题描述

在语音TTS播报中，原始文本包含大量转义符、markdown格式、HTML实体等特殊字符，导致语音播报时会读出这些不应该被读出的内容，影响用户体验。

### 问题示例
```
原始文本: "**欢迎**来到易经智慧殿堂，我是通晓古今的*智者*。\\n请告诉我，您心中有什么`困惑`需要解答？"
问题播报: "星星欢迎星星来到易经智慧殿堂，我是通晓古今的星智者星。反斜杠n请告诉我..."
```

## ✅ 解决方案

### 1. 全面的文本清理流程

重写了 `enhanceTextForSpeech` 方法，实现10步文本清理流程：

#### 第一步：移除Markdown格式
```typescript
cleanText = cleanText.replace(/\*\*(.*?)\*\*/g, '$1'); // **粗体**
cleanText = cleanText.replace(/\*(.*?)\*/g, '$1'); // *斜体*
cleanText = cleanText.replace(/`(.*?)`/g, '$1'); // `代码`
cleanText = cleanText.replace(/```[\s\S]*?```/g, ''); // 代码块
```

#### 第二步：移除各种括号内容
```typescript
cleanText = cleanText.replace(/[【】〖〗〔〕［］]/g, ''); // 中文方括号
cleanText = cleanText.replace(/\[.*?\]/g, ''); // [注释内容]
cleanText = cleanText.replace(/\{.*?\}/g, ''); // {配置内容}
cleanText = cleanText.replace(/（.*?）/g, ''); // （注释）
```

#### 第三步：处理转义符和HTML实体
```typescript
cleanText = cleanText.replace(/\\n/g, ' '); // 换行符
cleanText = cleanText.replace(/\\t/g, ' '); // 制表符
cleanText = cleanText.replace(/&nbsp;/g, ' '); // HTML空格
cleanText = cleanText.replace(/&amp;/g, '和'); // &符号
```

#### 第四步：移除链接和邮箱
```typescript
cleanText = cleanText.replace(/https?:\/\/[^\s]+/g, ''); // HTTP链接
cleanText = cleanText.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, ''); // 邮箱
```

#### 第五步：处理列表格式
```typescript
cleanText = cleanText.replace(/^\d+\.\s*/gm, ''); // 1. 2. 3.
cleanText = cleanText.replace(/^[-*+]\s*/gm, ''); // - * +
```

### 2. 智能长度控制

```typescript
if (cleanText.length > 150) {
  // 找到最后一个完整句子的结束位置
  const lastPunctuation = Math.max(
    cleanText.lastIndexOf('。', 150),
    cleanText.lastIndexOf('？', 150),
    cleanText.lastIndexOf('！', 150)
  );
  
  if (lastPunctuation > 50) {
    cleanText = cleanText.substring(0, lastPunctuation + 1);
  } else {
    cleanText = cleanText.substring(0, 150) + '。';
  }
}
```

### 3. 开发调试功能

在开发环境中自动显示文本清理对比：

```typescript
if (process.env.NODE_ENV === 'development') {
  console.group('🔊 TTS文本清理');
  console.log('原始文本:', text);
  console.log('清理后文本:', cleanText);
  console.log('字符数:', `${text.length} → ${cleanText.length}`);
  console.groupEnd();
}
```

## 🧪 测试验证

### 测试工具
创建了 `textCleaningTest.ts` 文件，包含7个测试用例：

1. **Markdown格式测试**
2. **转义符测试**
3. **HTML实体测试**
4. **括号注释测试**
5. **链接邮箱测试**
6. **列表格式测试**
7. **超长文本截断测试**

### 运行测试
```typescript
// 在浏览器控制台运行
runTextCleaningTests();
```

## 📊 优化效果对比

### 优化前
```
输入: "**欢迎**来到易经智慧殿堂，我是通晓古今的*智者*。\\n请告诉我，您心中有什么`困惑`需要解答？"
播报: "星星欢迎星星来到易经智慧殿堂，我是通晓古今的星智者星。反斜杠n请告诉我，您心中有什么反引号困惑反引号需要解答？"
```

### 优化后
```
输入: "**欢迎**来到易经智慧殿堂，我是通晓古今的*智者*。\\n请告诉我，您心中有什么`困惑`需要解答？"
播报: "欢迎来到易经智慧殿堂，我是通晓古今的智者。请告诉我，您心中有什么困惑需要解答？"
```

## 🔧 技术实现细节

### 1. 正则表达式优化
- 使用非贪婪匹配 `(.*?)` 避免过度匹配
- 多行模式 `gm` 处理换行符
- Unicode范围 `\u4e00-\u9fa5` 识别中文字符

### 2. 错误处理
```typescript
// 如果清理后文本为空，使用默认文本
if (!cleanText || cleanText.trim().length < 2) {
  console.warn('文本清理后为空，使用默认文本');
  const defaultText = '智者正在为您思考。';
  // ... 使用默认文本进行TTS
}
```

### 3. 性能优化
- 链式替换减少字符串创建
- 提前返回避免不必要的处理
- 缓存正则表达式（如需要）

## 🎯 支持的清理类型

### Markdown格式
- ✅ **粗体** `**text**`
- ✅ *斜体* `*text*`
- ✅ __下划线粗体__ `__text__`
- ✅ `行内代码` `` `code` ``
- ✅ 代码块 ``` ```
- ✅ ~~删除线~~ `~~text~~`

### 特殊符号
- ✅ 中文括号 `【】〖〗〔〕［］`
- ✅ 英文括号内容 `[content]`
- ✅ 花括号内容 `{content}`
- ✅ HTML标签 `<tag>`
- ✅ 注释括号 `（注释）(comment)`

### 转义字符
- ✅ 换行符 `\n`
- ✅ 制表符 `\t`
- ✅ 回车符 `\r`
- ✅ 反斜杠 `\`

### HTML实体
- ✅ 空格 `&nbsp;`
- ✅ 和号 `&amp;` → `和`
- ✅ 小于 `&lt;` → `小于`
- ✅ 大于 `&gt;` → `大于`
- ✅ 引号 `&quot;` → `"`

### 链接和联系方式
- ✅ HTTP链接 `https://example.com`
- ✅ WWW链接 `www.example.com`
- ✅ 邮箱地址 `user@example.com`

### 列表格式
- ✅ 数字列表 `1. 2. 3.`
- ✅ 无序列表 `- * +`
- ✅ 引用符号 `>`

### 标点符号优化
- ✅ 省略号 `...` → `，停顿，`
- ✅ 破折号 `—` → `，`
- ✅ 智能引号 `""''` → 移除

## 🚀 使用方法

### 1. 自动清理
语音播报时自动应用文本清理，无需额外操作。

### 2. 开发调试
在开发环境中，控制台会自动显示清理前后的文本对比。

### 3. 手动测试
```typescript
import { runTextCleaningTests } from '@/utils/textCleaningTest';
runTextCleaningTests();
```

## 📈 预期效果

### 用户体验提升
- ✅ 语音播报更加自然流畅
- ✅ 消除转义符和格式符号的干扰
- ✅ 保持文本的核心含义不变
- ✅ 适当的长度控制避免过长播报

### 技术价值
- ✅ 可复用的文本清理工具
- ✅ 完善的测试覆盖
- ✅ 开发友好的调试功能
- ✅ 高性能的处理算法

---

**🎊 现在TTS语音播报将只播报纯净的文字内容，为用户提供更好的听觉体验！**
