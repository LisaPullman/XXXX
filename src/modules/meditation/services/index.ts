import {
  MeditationRecord,
  MeditationProgress,
  MeditationTimer,
  MeditationCourse,
  Achievement,
  MeditationGoal,
  MeditationInsight,
  MindfulnessReminder,
  MeditationJournal,
  MeditationPreferences,
  BreathingExercise,
  AmbientSound,
  MoodLevel,
  MeditationCategory
} from '../types';
import { meditationDatabase } from '../data/meditationData';

export class MeditationService {
  // 获取冥想课程
  static getCourses(): MeditationCourse[] {
    return meditationDatabase.courses;
  }

  // 获取特定课程
  static getCourse(courseId: string): MeditationCourse | null {
    return meditationDatabase.courses.find(course => course.id === courseId) || null;
  }

  // 获取环境音效
  static getAmbientSounds(): AmbientSound[] {
    return meditationDatabase.ambientSounds;
  }

  // 获取呼吸练习
  static getBreathingExercises(): BreathingExercise[] {
    return meditationDatabase.breathingExercises;
  }

  // 获取成就列表
  static getAchievements(): Achievement[] {
    return meditationDatabase.achievements;
  }

  // 创建冥想计时器
  static createTimer(duration: number, ambientSoundId?: string): MeditationTimer {
    const ambientSound = ambientSoundId 
      ? this.getAmbientSounds().find(sound => sound.id === ambientSoundId)
      : undefined;

    return {
      id: this.generateId(),
      duration: duration * 60, // 转换为秒
      ambientSound,
      startTime: new Date(),
      paused: false,
      totalPauseTime: 0
    };
  }

  // 开始冥想会话
  static async startMeditationSession(
    type: 'guided' | 'timer' | 'free',
    courseId?: string,
    sessionId?: string,
    duration?: number
  ): Promise<string> {
    const sessionRecord: Partial<MeditationRecord> = {
      id: this.generateId(),
      userId: 'current-user',
      type,
      courseId,
      sessionId,
      duration: duration || 0,
      date: new Date(),
      completionRate: 0,
      interruptions: 0,
      environment: 'indoor'
    };

    // 保存会话记录
    this.saveMeditationRecord(sessionRecord as MeditationRecord);
    
    return sessionRecord.id!;
  }

  // 完成冥想会话
  static async completeMeditationSession(
    recordId: string,
    completedDuration: number,
    moodBefore: MoodLevel,
    moodAfter: MoodLevel,
    rating: number,
    notes?: string
  ): Promise<void> {
    const records = this.getMeditationRecords();
    const recordIndex = records.findIndex(record => record.id === recordId);
    
    if (recordIndex >= 0) {
      records[recordIndex] = {
        ...records[recordIndex],
        duration: completedDuration,
        mood: { before: moodBefore, after: moodAfter },
        rating,
        notes,
        completionRate: Math.min(100, (completedDuration / (records[recordIndex].duration || completedDuration)) * 100)
      };

      localStorage.setItem('meditation-records', JSON.stringify(records));
      
      // 更新进度并检查成就
      await this.updateProgress(records[recordIndex]);
      this.checkAchievements();
    }
  }

  // 获取用户进度
  static getMeditationProgress(): MeditationProgress {
    try {
      const saved = localStorage.getItem('meditation-progress');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('获取冥想进度失败:', error);
    }

    // 返回默认进度
    return {
      userId: 'current-user',
      totalSessions: 0,
      totalMinutes: 0,
      longestStreak: 0,
      currentStreak: 0,
      favoriteCategory: 'mindfulness',
      completedCourses: [],
      achievements: [],
      weeklyGoal: 60, // 默认每周60分钟
      weeklyProgress: 0,
      lastSessionDate: new Date(),
      averageSessionLength: 0
    };
  }

  // 获取冥想记录
  static getMeditationRecords(): MeditationRecord[] {
    try {
      const records = localStorage.getItem('meditation-records');
      return records ? JSON.parse(records) : [];
    } catch (error) {
      console.error('获取冥想记录失败:', error);
      return [];
    }
  }

  // 设置冥想目标
  static setMeditationGoal(goal: Omit<MeditationGoal, 'id' | 'progress' | 'completed'>): MeditationGoal {
    const newGoal: MeditationGoal = {
      ...goal,
      id: this.generateId(),
      progress: 0,
      completed: false
    };

    const goals = this.getMeditationGoals();
    goals.push(newGoal);
    localStorage.setItem('meditation-goals', JSON.stringify(goals));

    return newGoal;
  }

  // 获取冥想目标
  static getMeditationGoals(): MeditationGoal[] {
    try {
      const goals = localStorage.getItem('meditation-goals');
      return goals ? JSON.parse(goals) : [];
    } catch (error) {
      console.error('获取冥想目标失败:', error);
      return [];
    }
  }

  // 创建冥想日记
  static createMeditationJournal(entry: Omit<MeditationJournal, 'id'>): MeditationJournal {
    const journal: MeditationJournal = {
      ...entry,
      id: this.generateId()
    };

    const journals = this.getMeditationJournals();
    journals.push(journal);
    
    // 只保留最近100条记录
    if (journals.length > 100) {
      journals.splice(0, journals.length - 100);
    }

    localStorage.setItem('meditation-journals', JSON.stringify(journals));
    return journal;
  }

  // 获取冥想日记
  static getMeditationJournals(): MeditationJournal[] {
    try {
      const journals = localStorage.getItem('meditation-journals');
      return journals ? JSON.parse(journals) : [];
    } catch (error) {
      console.error('获取冥想日记失败:', error);
      return [];
    }
  }

  // 设置提醒
  static setMindfulnessReminder(reminder: Omit<MindfulnessReminder, 'id'>): MindfulnessReminder {
    const newReminder: MindfulnessReminder = {
      ...reminder,
      id: this.generateId()
    };

    const reminders = this.getMindfulnessReminders();
    reminders.push(newReminder);
    localStorage.setItem('mindfulness-reminders', JSON.stringify(reminders));

    return newReminder;
  }

  // 获取提醒
  static getMindfulnessReminders(): MindfulnessReminder[] {
    try {
      const reminders = localStorage.getItem('mindfulness-reminders');
      return reminders ? JSON.parse(reminders) : [];
    } catch (error) {
      console.error('获取冥想提醒失败:', error);
      return [];
    }
  }

  // 获取用户偏好
  static getUserPreferences(): MeditationPreferences {
    try {
      const prefs = localStorage.getItem('meditation-preferences');
      if (prefs) {
        return JSON.parse(prefs);
      }
    } catch (error) {
      console.error('获取用户偏好失败:', error);
    }

    // 返回默认偏好
    return {
      userId: 'current-user',
      preferredDuration: 15,
      preferredTime: 'flexible',
      favoriteCategories: ['mindfulness'],
      ambientSounds: ['silence'],
      reminderSettings: {
        enabled: false,
        frequency: 'daily',
        times: ['09:00', '18:00']
      },
      privacy: {
        showProgress: true,
        showAchievements: true,
        joinCommunity: false
      },
      accessibility: {
        subtitles: false,
        slowedInstructions: false,
        largeText: false,
        highContrast: false
      }
    };
  }

  // 更新用户偏好
  static updateUserPreferences(preferences: Partial<MeditationPreferences>): void {
    const current = this.getUserPreferences();
    const updated = { ...current, ...preferences };
    localStorage.setItem('meditation-preferences', JSON.stringify(updated));
  }

  // 生成洞察报告
  static generateInsights(period: 'week' | 'month' | 'quarter' | 'year'): MeditationInsight {
    const records = this.getMeditationRecords();
    const progress = this.getMeditationProgress();
    
    const endDate = new Date();
    const startDate = new Date();
    
    switch (period) {
      case 'week':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(endDate.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
    }

    const periodRecords = records.filter(record => 
      record.date >= startDate && record.date <= endDate
    );

    const totalSessions = periodRecords.length;
    const totalMinutes = periodRecords.reduce((sum, record) => sum + record.duration, 0);
    const averageRating = totalSessions > 0 
      ? periodRecords.reduce((sum, record) => sum + record.rating, 0) / totalSessions 
      : 0;

    // 计算情绪改善
    const moodChanges = periodRecords
      .filter(record => record.mood)
      .map(record => record.mood!.after - record.mood!.before);
    const moodImprovement = moodChanges.length > 0
      ? moodChanges.reduce((sum, change) => sum + change, 0) / moodChanges.length
      : 0;

    // 分析趋势
    const trends = this.analyzeTrends(periodRecords);

    // 生成建议
    const recommendations = this.generateRecommendations(periodRecords, progress);

    return {
      id: this.generateId(),
      userId: 'current-user',
      period,
      startDate,
      endDate,
      metrics: {
        totalSessions,
        totalMinutes,
        averageRating: Math.round(averageRating * 10) / 10,
        moodImprovement: Math.round(moodImprovement * 10) / 10,
        consistencyScore: this.calculateConsistencyScore(periodRecords),
        preferredTime: this.findPreferredTime(periodRecords),
        favoriteCategory: this.findFavoriteCategory(periodRecords)
      },
      trends,
      recommendations
    };
  }

  // 获取统计数据
  static getStatistics() {
    const records = this.getMeditationRecords();
    const progress = this.getMeditationProgress();
    const goals = this.getMeditationGoals();
    
    return {
      totalSessions: progress.totalSessions,
      totalMinutes: progress.totalMinutes,
      currentStreak: progress.currentStreak,
      longestStreak: progress.longestStreak,
      completedCourses: progress.completedCourses.length,
      achievements: progress.achievements.length,
      activeGoals: goals.filter(goal => !goal.completed).length,
      averageRating: this.calculateAverageRating(records),
      weeklyProgress: progress.weeklyProgress,
      weeklyGoal: progress.weeklyGoal
    };
  }

  // 私有方法
  private static async updateProgress(record: MeditationRecord): Promise<void> {
    const progress = this.getMeditationProgress();
    
    progress.totalSessions += 1;
    progress.totalMinutes += record.duration;
    progress.lastSessionDate = record.date;
    progress.averageSessionLength = progress.totalMinutes / progress.totalSessions;
    
    // 更新连击记录
    const daysDiff = Math.floor((new Date().getTime() - new Date(progress.lastSessionDate).getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff <= 1) {
      progress.currentStreak += 1;
      progress.longestStreak = Math.max(progress.longestStreak, progress.currentStreak);
    } else {
      progress.currentStreak = 1;
    }

    // 更新本周进度
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const thisWeekRecords = this.getMeditationRecords().filter(r => r.date >= weekStart);
    progress.weeklyProgress = thisWeekRecords.reduce((sum, r) => sum + r.duration, 0);

    // 更新最喜欢的类别
    progress.favoriteCategory = this.findFavoriteCategory(this.getMeditationRecords());

    localStorage.setItem('meditation-progress', JSON.stringify(progress));
  }

  private static checkAchievements(): void {
    const progress = this.getMeditationProgress();
    const allAchievements = this.getAchievements();
    const unlockedIds = progress.achievements.map(a => a.id);

    allAchievements.forEach(achievement => {
      if (!unlockedIds.includes(achievement.id)) {
        if (this.isAchievementUnlocked(achievement, progress)) {
          progress.achievements.push({
            ...achievement,
            unlockedAt: new Date()
          });
        }
      }
    });

    localStorage.setItem('meditation-progress', JSON.stringify(progress));
  }

  private static isAchievementUnlocked(achievement: Achievement, progress: MeditationProgress): boolean {
    switch (achievement.category) {
      case 'milestone':
        return progress.totalSessions >= 1;
      case 'streak':
        if (achievement.id.includes('week')) return progress.currentStreak >= 7;
        if (achievement.id.includes('month')) return progress.currentStreak >= 30;
        return false;
      case 'duration':
        if (achievement.id.includes('hour')) return progress.totalMinutes >= 60;
        if (achievement.id.includes('1000')) return progress.totalMinutes >= 1000;
        return false;
      case 'course':
        return progress.completedCourses.length >= 1;
      default:
        return false;
    }
  }

  private static analyzeTrends(records: MeditationRecord[]) {
    if (records.length < 2) {
      return {
        sessionFrequency: 'stable' as const,
        sessionLength: 'stable' as const,
        moodTrend: 'stable' as const
      };
    }

    const firstHalf = records.slice(0, Math.floor(records.length / 2));
    const secondHalf = records.slice(Math.floor(records.length / 2));

    const firstHalfAvgLength = firstHalf.reduce((sum, r) => sum + r.duration, 0) / firstHalf.length;
    const secondHalfAvgLength = secondHalf.reduce((sum, r) => sum + r.duration, 0) / secondHalf.length;

    const firstHalfMood = firstHalf
      .filter(r => r.mood)
      .reduce((sum, r) => sum + (r.mood!.after - r.mood!.before), 0) / firstHalf.length;
    const secondHalfMood = secondHalf
      .filter(r => r.mood)
      .reduce((sum, r) => sum + (r.mood!.after - r.mood!.before), 0) / secondHalf.length;

    return {
      sessionFrequency: secondHalf.length > firstHalf.length ? 'increasing' : 'stable',
      sessionLength: secondHalfAvgLength > firstHalfAvgLength ? 'increasing' : 
                     secondHalfAvgLength < firstHalfAvgLength ? 'decreasing' : 'stable',
      moodTrend: secondHalfMood > firstHalfMood ? 'improving' : 
                 secondHalfMood < firstHalfMood ? 'declining' : 'stable'
    };
  }

  private static generateRecommendations(records: MeditationRecord[], progress: MeditationProgress): string[] {
    const recommendations: string[] = [];

    if (progress.currentStreak < 7) {
      recommendations.push('建议建立每日冥想习惯，即使是5分钟也能带来显著效果');
    }

    if (progress.averageSessionLength < 10) {
      recommendations.push('尝试逐渐延长冥想时间，10-15分钟是理想的练习时长');
    }

    const recentRatings = records.slice(-5).map(r => r.rating);
    const avgRating = recentRatings.reduce((sum, r) => sum + r, 0) / recentRatings.length;
    if (avgRating < 3) {
      recommendations.push('可以尝试不同类型的冥想练习，找到最适合您的方式');
    }

    if (progress.weeklyProgress < progress.weeklyGoal * 0.5) {
      recommendations.push('建议调整冥想目标或增加练习频率，保持可持续的进步');
    }

    return recommendations;
  }

  private static calculateConsistencyScore(records: MeditationRecord[]): number {
    if (records.length < 7) return 0;

    const days = new Set(records.map(r => r.date.toDateString())).size;
    const totalDays = Math.ceil((Date.now() - records[0].date.getTime()) / (1000 * 60 * 60 * 24));
    
    return Math.round((days / totalDays) * 100);
  }

  private static findPreferredTime(records: MeditationRecord[]): string {
    const timeSlots = { morning: 0, afternoon: 0, evening: 0 };
    
    records.forEach(record => {
      const hour = record.date.getHours();
      if (hour < 12) timeSlots.morning++;
      else if (hour < 18) timeSlots.afternoon++;
      else timeSlots.evening++;
    });

    return Object.entries(timeSlots).reduce((a, b) => timeSlots[a[0]] > timeSlots[b[0]] ? a : b)[0];
  }

  private static findFavoriteCategory(records: MeditationRecord[]): MeditationCategory {
    const categoryCount = new Map<MeditationCategory, number>();
    
    records.forEach(record => {
      categoryCount.set(record.category, (categoryCount.get(record.category) || 0) + 1);
    });

    let favorite: MeditationCategory = 'mindfulness';
    let maxCount = 0;
    
    categoryCount.forEach((count, category) => {
      if (count > maxCount) {
        maxCount = count;
        favorite = category;
      }
    });

    return favorite;
  }

  private static calculateAverageRating(records: MeditationRecord[]): number {
    if (records.length === 0) return 0;
    return records.reduce((sum, r) => sum + r.rating, 0) / records.length;
  }

  private static saveMeditationRecord(record: MeditationRecord): void {
    const records = this.getMeditationRecords();
    records.push(record);
    
    // 只保留最近200条记录
    if (records.length > 200) {
      records.splice(0, records.length - 200);
    }
    
    localStorage.setItem('meditation-records', JSON.stringify(records));
  }

  private static generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}