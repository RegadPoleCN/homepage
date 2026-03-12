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

  // 刚刚（小于 1 秒）
  if (Math.abs(diff) < 1000) {
    return '刚刚';
  }

  // 未来时间
  if (diff < 0) {
    const absDiff = Math.abs(diff);
    for (const [ms, unit] of intervals) {
      const count = Math.floor(absDiff / ms);
      if (count >= 1) {
        return `${count}${unit}后`;
      }
    }
    return '刚刚';
  }

  // 过去时间
  for (const [ms, unit] of intervals) {
    const count = Math.floor(diff / ms);
    if (count >= 1) {
      return `${count}${unit}前`;
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
