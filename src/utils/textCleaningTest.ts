/**
 * TTS文本清理测试工具
 * 用于验证文本清理功能的效果
 */

// 模拟SiliconFlowService的文本清理逻辑
function cleanTextForTTS(text: string): string {
  let cleanText = text;

  // 第一步：移除所有markdown格式标记
  cleanText = cleanText.replace(/\*\*(.*?)\*\*/g, '$1'); // 粗体 **text**
  cleanText = cleanText.replace(/\*(.*?)\*/g, '$1'); // 斜体 *text*
  cleanText = cleanText.replace(/__(.*?)__/g, '$1'); // 下划线粗体 __text__
  cleanText = cleanText.replace(/_(.*?)_/g, '$1'); // 下划线斜体 _text_
  cleanText = cleanText.replace(/`(.*?)`/g, '$1'); // 行内代码 `code`
  cleanText = cleanText.replace(/```[\s\S]*?```/g, ''); // 代码块
  cleanText = cleanText.replace(/~~(.*?)~~/g, '$1'); // 删除线 ~~text~~

  // 第二步：移除各种括号和特殊符号
  cleanText = cleanText.replace(/[【】〖〗〔〕［］]/g, ''); // 中文方括号
  cleanText = cleanText.replace(/\[.*?\]/g, ''); // 英文方括号及内容
  cleanText = cleanText.replace(/\{.*?\}/g, ''); // 花括号及内容
  cleanText = cleanText.replace(/\<.*?\>/g, ''); // 尖括号及内容（如HTML标签）
  cleanText = cleanText.replace(/（.*?）/g, ''); // 中文圆括号内容（通常是注释）
  cleanText = cleanText.replace(/\(.*?\)/g, ''); // 英文圆括号内容

  // 第三步：移除特殊转义符和控制字符
  cleanText = cleanText.replace(/\\n/g, ' '); // 换行符
  cleanText = cleanText.replace(/\\t/g, ' '); // 制表符
  cleanText = cleanText.replace(/\\r/g, ' '); // 回车符
  cleanText = cleanText.replace(/\\/g, ''); // 反斜杠
  cleanText = cleanText.replace(/&nbsp;/g, ' '); // HTML空格
  cleanText = cleanText.replace(/&amp;/g, '和'); // HTML &符号
  cleanText = cleanText.replace(/&lt;/g, '小于'); // HTML <
  cleanText = cleanText.replace(/&gt;/g, '大于'); // HTML >
  cleanText = cleanText.replace(/&quot;/g, '"'); // HTML 引号

  // 第四步：移除链接和邮箱
  cleanText = cleanText.replace(/https?:\/\/[^\s]+/g, ''); // HTTP链接
  cleanText = cleanText.replace(/www\.[^\s]+/g, ''); // www链接
  cleanText = cleanText.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, ''); // 邮箱

  // 第五步：移除数字编号和列表符号
  cleanText = cleanText.replace(/^\d+\.\s*/gm, ''); // 数字列表 1. 2. 3.
  cleanText = cleanText.replace(/^[-*+]\s*/gm, ''); // 无序列表 - * +
  cleanText = cleanText.replace(/^>\s*/gm, ''); // 引用符号 >

  // 第六步：清理多余的空白字符
  cleanText = cleanText.replace(/\s+/g, ' '); // 多个空格合并为一个
  cleanText = cleanText.replace(/^\s+|\s+$/g, ''); // 去除首尾空格
  cleanText = cleanText.replace(/\n\s*\n/g, '\n'); // 多个换行合并

  // 第七步：移除纯符号行
  cleanText = cleanText.replace(/^[^\u4e00-\u9fa5a-zA-Z0-9]+$/gm, ''); // 移除只包含符号的行

  // 第八步：确保文本适合语音播报
  cleanText = cleanText.replace(/\.\.\./g, '，停顿，'); // 省略号
  cleanText = cleanText.replace(/—/g, '，'); // 破折号
  cleanText = cleanText.replace(/–/g, '，'); // 短破折号
  cleanText = cleanText.replace(/"/g, ''); // 左双引号
  cleanText = cleanText.replace(/"/g, ''); // 右双引号
  cleanText = cleanText.replace(/'/g, ''); // 左单引号
  cleanText = cleanText.replace(/'/g, ''); // 右单引号

  // 第九步：最终清理
  cleanText = cleanText.replace(/\s+/g, ' ').trim(); // 再次清理空格

  // 第十步：长度限制（保持完整句子）
  if (cleanText.length > 150) {
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

  // 确保文本不为空
  if (!cleanText || cleanText.trim().length === 0) {
    cleanText = '智者正在思考中。';
  }

  return cleanText;
}

// 测试用例
const testCases = [
  {
    name: '包含markdown格式的文本',
    input: '**欢迎**来到易经智慧殿堂，我是通晓古今的*智者*。请告诉我，您心中有什么`困惑`需要解答？',
    expected: '欢迎来到易经智慧殿堂，我是通晓古今的智者。请告诉我，您心中有什么困惑需要解答？'
  },
  {
    name: '包含转义符的文本',
    input: '根据您的问题\\n我建议您\\t保持冷静\\r思考问题的本质。',
    expected: '根据您的问题 我建议您 保持冷静 思考问题的本质。'
  },
  {
    name: '包含HTML实体的文本',
    input: '您需要在工作&amp;生活之间找到平衡，这&lt;很重要&gt;。',
    expected: '您需要在工作和生活之间找到平衡，这很重要。'
  },
  {
    name: '包含括号注释的文本',
    input: '乾卦【天】象征刚健不息（这是最重要的卦象），代表着积极向上的力量。',
    expected: '乾卦象征刚健不息，代表着积极向上的力量。'
  },
  {
    name: '包含链接的文本',
    input: '您可以访问https://example.com了解更多信息，或发邮件到help@example.com咨询。',
    expected: '您可以访问了解更多信息，或发邮件到咨询。'
  },
  {
    name: '包含列表格式的文本',
    input: '建议您：\n1. 保持冷静\n2. 深入思考\n- 多读书\n* 多实践',
    expected: '建议您： 保持冷静 深入思考 多读书 多实践'
  },
  {
    name: '超长文本截断测试',
    input: '这是一段很长的文本，用来测试文本截断功能是否正常工作。' + '内容重复'.repeat(50) + '。最后一句话。',
    expected: '应该被截断到合适长度'
  }
];

// 运行测试
export function runTextCleaningTests() {
  console.group('🧪 TTS文本清理测试');
  
  testCases.forEach((testCase, index) => {
    console.group(`测试 ${index + 1}: ${testCase.name}`);
    
    const result = cleanTextForTTS(testCase.input);
    
    console.log('输入文本:', testCase.input);
    console.log('输出文本:', result);
    console.log('字符数变化:', `${testCase.input.length} → ${result.length}`);
    
    if (testCase.expected && testCase.expected !== '应该被截断到合适长度') {
      const passed = result === testCase.expected;
      console.log('测试结果:', passed ? '✅ 通过' : '❌ 失败');
      if (!passed) {
        console.log('期望结果:', testCase.expected);
      }
    } else {
      console.log('测试结果:', result.length <= 150 ? '✅ 长度控制正常' : '❌ 长度控制失败');
    }
    
    console.groupEnd();
  });
  
  console.groupEnd();
}

// 在浏览器控制台中运行测试
if (typeof window !== 'undefined') {
  (window as any).runTextCleaningTests = runTextCleaningTests;
  console.log('💡 在控制台运行 runTextCleaningTests() 来测试文本清理功能');
}
