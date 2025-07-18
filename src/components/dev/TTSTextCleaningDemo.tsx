import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';

/**
 * TTS文本清理演示组件
 * 仅在开发环境中使用，用于测试和演示文本清理效果
 */

// 复制SiliconFlowService的文本清理逻辑
function cleanTextForTTS(text: string): string {
  let cleanText = text;

  // 移除markdown格式
  cleanText = cleanText.replace(/\*\*(.*?)\*\*/g, '$1');
  cleanText = cleanText.replace(/\*(.*?)\*/g, '$1');
  cleanText = cleanText.replace(/__(.*?)__/g, '$1');
  cleanText = cleanText.replace(/_(.*?)_/g, '$1');
  cleanText = cleanText.replace(/`(.*?)`/g, '$1');
  cleanText = cleanText.replace(/```[\s\S]*?```/g, '');
  cleanText = cleanText.replace(/~~(.*?)~~/g, '$1');

  // 移除括号和特殊符号
  cleanText = cleanText.replace(/[【】〖〗〔〕［］]/g, '');
  cleanText = cleanText.replace(/\[.*?\]/g, '');
  cleanText = cleanText.replace(/\{.*?\}/g, '');
  cleanText = cleanText.replace(/\<.*?\>/g, '');
  cleanText = cleanText.replace(/（.*?）/g, '');
  cleanText = cleanText.replace(/\(.*?\)/g, '');

  // 移除转义符和HTML实体
  cleanText = cleanText.replace(/\\n/g, ' ');
  cleanText = cleanText.replace(/\\t/g, ' ');
  cleanText = cleanText.replace(/\\r/g, ' ');
  cleanText = cleanText.replace(/\\/g, '');
  cleanText = cleanText.replace(/&nbsp;/g, ' ');
  cleanText = cleanText.replace(/&amp;/g, '和');
  cleanText = cleanText.replace(/&lt;/g, '小于');
  cleanText = cleanText.replace(/&gt;/g, '大于');
  cleanText = cleanText.replace(/&quot;/g, '"');

  // 移除链接和邮箱
  cleanText = cleanText.replace(/https?:\/\/[^\s]+/g, '');
  cleanText = cleanText.replace(/www\.[^\s]+/g, '');
  cleanText = cleanText.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '');

  // 移除列表符号
  cleanText = cleanText.replace(/^\d+\.\s*/gm, '');
  cleanText = cleanText.replace(/^[-*+]\s*/gm, '');
  cleanText = cleanText.replace(/^>\s*/gm, '');

  // 清理空白字符
  cleanText = cleanText.replace(/\s+/g, ' ');
  cleanText = cleanText.replace(/^\s+|\s+$/g, '');
  cleanText = cleanText.replace(/\n\s*\n/g, '\n');

  // 移除纯符号行
  cleanText = cleanText.replace(/^[^\u4e00-\u9fa5a-zA-Z0-9]+$/gm, '');

  // 优化标点符号
  cleanText = cleanText.replace(/\.\.\./g, '，停顿，');
  cleanText = cleanText.replace(/—/g, '，');
  cleanText = cleanText.replace(/–/g, '，');
  cleanText = cleanText.replace(/"/g, '');
  cleanText = cleanText.replace(/"/g, '');
  cleanText = cleanText.replace(/'/g, '');
  cleanText = cleanText.replace(/'/g, '');

  // 最终清理
  cleanText = cleanText.replace(/\s+/g, ' ').trim();

  // 长度限制
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

  if (!cleanText || cleanText.trim().length === 0) {
    cleanText = '智者正在思考中。';
  }

  return cleanText;
}

const sampleTexts = [
  '**欢迎**来到易经智慧殿堂，我是通晓古今的*智者*。\\n请告诉我，您心中有什么`困惑`需要解答？',
  '根据您的问题，我建议您：\\n1. 保持冷静\\n2. 深入思考\\n- 多读书\\n* 多实践',
  '乾卦【天】象征刚健不息（这是最重要的卦象），代表着积极向上的力量。您可以访问https://example.com了解更多。',
  '您需要在工作&amp;生活之间找到平衡，这&lt;很重要&gt;。如有疑问请联系help@example.com。',
  '```javascript\\nconst wisdom = "易经智慧";\\nconsole.log(wisdom);\\n```\\n以上是代码示例。',
];

export const TTSTextCleaningDemo: React.FC = () => {
  const [inputText, setInputText] = useState(sampleTexts[0]);
  const [cleanedText, setCleanedText] = useState('');

  const handleClean = () => {
    const result = cleanTextForTTS(inputText);
    setCleanedText(result);
  };

  const loadSample = (index: number) => {
    setInputText(sampleTexts[index]);
    setCleanedText('');
  };

  if (process.env.NODE_ENV !== 'development') {
    return null; // 只在开发环境显示
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">🔊 TTS文本清理演示</h2>
          <p className="text-gray-600 text-center">测试语音播报文本清理效果</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 示例文本按钮 */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700">示例文本：</span>
            {sampleTexts.map((_, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => loadSample(index)}
                className="text-xs"
              >
                示例 {index + 1}
              </Button>
            ))}
          </div>

          {/* 输入文本 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              原始文本（包含格式符号）
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="输入包含markdown、转义符等格式的文本..."
            />
            <div className="text-xs text-gray-500 mt-1">
              字符数: {inputText.length}
            </div>
          </div>

          {/* 清理按钮 */}
          <div className="text-center">
            <Button onClick={handleClean} className="bg-amber-500 hover:bg-amber-600">
              🧹 清理文本
            </Button>
          </div>

          {/* 清理后文本 */}
          {cleanedText && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                清理后文本（适合语音播报）
              </label>
              <div className="w-full min-h-32 p-3 bg-green-50 border border-green-300 rounded-lg">
                <p className="text-gray-800 leading-relaxed">{cleanedText}</p>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                字符数: {cleanedText.length} | 减少了 {inputText.length - cleanedText.length} 个字符
              </div>
            </div>
          )}

          {/* 对比显示 */}
          {cleanedText && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-red-600 mb-2">❌ 清理前（会读出格式符号）</h4>
                <div className="p-3 bg-red-50 border border-red-200 rounded text-sm">
                  <code className="text-red-700">{inputText}</code>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-green-600 mb-2">✅ 清理后（纯文字播报）</h4>
                <div className="p-3 bg-green-50 border border-green-200 rounded text-sm">
                  <span className="text-green-700">{cleanedText}</span>
                </div>
              </div>
            </div>
          )}

          {/* 说明 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">🔍 清理功能说明</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 移除Markdown格式：**粗体**、*斜体*、`代码`等</li>
              <li>• 清理转义符：\n、\t、\r等</li>
              <li>• 处理HTML实体：&amp;、&lt;、&gt;等</li>
              <li>• 移除括号注释：【】、（）、[]等</li>
              <li>• 删除链接和邮箱地址</li>
              <li>• 优化列表格式和标点符号</li>
              <li>• 智能长度控制，保持句子完整性</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
