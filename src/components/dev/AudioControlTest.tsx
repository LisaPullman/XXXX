import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import siliconFlowService from '../../services/siliconFlowService';

/**
 * 音频控制测试组件
 * 仅在开发环境中使用，用于测试音频播放和停止功能
 */

const testTexts = [
  '欢迎来到易经智慧殿堂，我是通晓古今的智者。',
  '根据您的问题，我建议您保持冷静，深入思考问题的本质。',
  '乾卦象征刚健不息，代表着积极向上的力量。',
  '这是一段较长的测试文本，用来验证音频播放和停止功能是否正常工作。在播放过程中，您应该能够随时停止播放。',
];

export const AudioControlTest: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  // 检查播放状态
  useEffect(() => {
    const checkStatus = () => {
      const actuallyPlaying = siliconFlowService.isPlaying();
      if (actuallyPlaying !== isPlaying) {
        setIsPlaying(actuallyPlaying);
        if (!actuallyPlaying) {
          setPlayingIndex(null);
          setCurrentText('');
        }
      }
    };

    const interval = setInterval(checkStatus, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const playText = async (text: string, index: number) => {
    if (isPlaying) {
      // 如果正在播放同一个文本，则停止
      if (playingIndex === index) {
        stopAudio();
        return;
      }
      // 如果正在播放其他文本，先停止
      stopAudio();
    }

    try {
      setIsPlaying(true);
      setCurrentText(text);
      setPlayingIndex(index);

      await siliconFlowService.speakAsWiseMaster(text, {
        voice: 'FunAudioLLM/CosyVoice2-0.5B:benjamin',
        speed: 0.85,
        gain: 1.5,
        autoPlay: true
      });
    } catch (error) {
      console.error('播放失败:', error);
    } finally {
      setIsPlaying(false);
      setCurrentText('');
      setPlayingIndex(null);
    }
  };

  const stopAudio = () => {
    try {
      siliconFlowService.stopCurrentAudio();
    } catch (error) {
      console.error('停止失败:', error);
    } finally {
      setIsPlaying(false);
      setCurrentText('');
      setPlayingIndex(null);
    }
  };

  if (process.env.NODE_ENV !== 'development') {
    return null; // 只在开发环境显示
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">🔊 音频控制测试</h2>
          <p className="text-gray-600 text-center">测试语音播放和停止功能</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 播放状态显示 */}
          <div className={`p-4 rounded-lg border-2 ${
            isPlaying 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-300 bg-gray-50'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <span className={`font-medium ${
                  isPlaying ? 'text-green-700' : 'text-gray-700'
                }`}>
                  播放状态: {isPlaying ? '🔊 正在播放' : '⏸️ 已停止'}
                </span>
                {currentText && (
                  <p className="text-sm text-gray-600 mt-1">
                    当前播放: {currentText.substring(0, 50)}...
                  </p>
                )}
              </div>
              {isPlaying && (
                <Button
                  onClick={stopAudio}
                  variant="outline"
                  size="sm"
                  className="border-red-500 text-red-600 hover:bg-red-50"
                >
                  ⏹️ 停止
                </Button>
              )}
            </div>
          </div>

          {/* 测试文本列表 */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-700">测试文本:</h3>
            {testTexts.map((text, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <Button
                  onClick={() => playText(text, index)}
                  size="sm"
                  className={`flex-shrink-0 ${
                    playingIndex === index
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-amber-500 hover:bg-amber-600'
                  }`}
                >
                  {playingIndex === index ? '⏹️ 停止' : '▶️ 播放'}
                </Button>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{text}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    长度: {text.length} 字符
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 全局控制 */}
          <div className="border-t pt-4">
            <div className="flex justify-center gap-3">
              <Button
                onClick={stopAudio}
                variant="outline"
                disabled={!isPlaying}
                className="border-red-500 text-red-600 hover:bg-red-50 disabled:opacity-50"
              >
                🛑 全局停止
              </Button>
            </div>
          </div>

          {/* 说明 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">🔍 测试说明</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 点击"播放"按钮开始播放语音</li>
              <li>• 播放过程中按钮变为"停止"，可随时停止</li>
              <li>• 播放其他文本时会自动停止当前播放</li>
              <li>• "全局停止"按钮可停止任何正在播放的音频</li>
              <li>• 播放状态会实时更新显示</li>
            </ul>
          </div>

          {/* 技术信息 */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-2">⚙️ 技术信息</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• TTS引擎: 硅基流动 CosyVoice2-0.5B</p>
              <p>• 音色: benjamin (低沉男声)</p>
              <p>• 语速: 0.85倍速</p>
              <p>• 音量: 1.5倍增益</p>
              <p>• 状态检查: 每500ms同步一次</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
