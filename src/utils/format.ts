/**
 * 时间格式化工具函数
 * 自动计算并格式化时间戳为相对时间描述
 */

/**
 * 将时间戳或日期字符串格式化为相对时间描述
 * @param timestamp - 时间戳（毫秒）或 ISO 日期字符串
 * @returns 相对时间描述，如 "刚刚"、"5 分钟前"、"2 小时前"、"3 天前"、"1 年后" 等
 *
 * @example
 * formatRelativeTime(Date.now() - 5 * 60 * 1000)  // "5 分钟前"
 * formatRelativeTime(Date.now() + 2 * 60 * 60 * 1000) // "2 小时后"
 * formatRelativeTime('2024-01-01T10:00:00Z')      // "3 天前"
 * formatRelativeTime(1704067200000)               // "1 个月前"
 */
export function formatRelativeTime(timestamp: number | string): string {
  // 处理字符串类型的日期
  let timeValue: number;
  if (typeof timestamp === 'string') {
    timeValue = new Date(timestamp).getTime();
    if (isNaN(timeValue)) {
      return '未知时间';
    }
  } else {
    timeValue = timestamp;
  }

  const now = Date.now();
  const diff = now - timeValue;
  const absDiff = Math.abs(diff);

  // 刚刚（小于 1 秒）
  if (absDiff < 1000) {
    return '刚刚';
  }

  // 时间间隔（毫秒）
  const intervals: Array<[number, string]> = [
    [1000 * 60 * 60 * 24 * 365, '年'],
    [1000 * 60 * 60 * 24 * 30, '个月'],
    [1000 * 60 * 60 * 24 * 7, '周'],
    [1000 * 60 * 60 * 24, '天'],
    [1000 * 60 * 60, '小时'],
    [1000 * 60, '分钟'],
    [1000, '秒'],
  ];

  // 找到合适的时间单位
  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    if (!interval) continue;
    
    const [ms, unit] = interval;
    const count = Math.floor(absDiff / ms);
    
    if (count >= 1) {
      // 如果接近下一个更大的单位（超过 80% 且当前单位不是最小单位），使用更大的单位
      if (i > 0 && count >= 12) {
        const largerInterval = intervals[i - 1];
        if (!largerInterval) continue;
        
        const [largerMs, largerUnit] = largerInterval;
        const largerCount = Math.floor(absDiff / largerMs);
        if (largerCount >= 1) {
          const prefix = diff < 0 ? '后' : '前';
          return `${largerCount}${largerUnit}${prefix}`;
        }
      }
      
      const prefix = diff < 0 ? '后' : '前';
      return `${count}${unit}${prefix}`;
    }
  }

  return '刚刚';
}

/**
 * 格式化日期为本地日期字符串
 * @param timestamp - 时间戳或日期字符串
 * @returns 格式化的日期字符串，如 "2024-01-15 10:30:00"
 */
export function formatDateTime(timestamp: number | string): string {
  let dateValue: Date;
  if (typeof timestamp === 'string') {
    dateValue = new Date(timestamp);
  } else {
    dateValue = new Date(timestamp);
  }

  if (isNaN(dateValue.getTime())) {
    return '无效日期';
  }

  const year = dateValue.getFullYear();
  const month = String(dateValue.getMonth() + 1).padStart(2, '0');
  const day = String(dateValue.getDate()).padStart(2, '0');
  const hours = String(dateValue.getHours()).padStart(2, '0');
  const minutes = String(dateValue.getMinutes()).padStart(2, '0');
  const seconds = String(dateValue.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 格式化日期为简洁的日期字符串
 * @param timestamp - 时间戳或日期字符串
 * @returns 格式化的日期字符串，如 "2024-01-15"
 */
export function formatDate(timestamp: number | string): string {
  let dateValue: Date;
  if (typeof timestamp === 'string') {
    dateValue = new Date(timestamp);
  } else {
    dateValue = new Date(timestamp);
  }

  if (isNaN(dateValue.getTime())) {
    return '无效日期';
  }

  const year = dateValue.getFullYear();
  const month = String(dateValue.getMonth() + 1).padStart(2, '0');
  const day = String(dateValue.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
