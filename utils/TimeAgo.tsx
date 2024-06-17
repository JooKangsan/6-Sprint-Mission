export function TimeAgo(dateString: string): string {
  const givenTime: Date = new Date(dateString);
  const now: Date = new Date();
  const diffInSeconds: number = Math.floor(
    (now.getTime() - givenTime.getTime()) / 1000
  );

  const secondsInMinute: number = 60;
  const secondsInHour: number = 3600;
  const secondsInDay: number = 86400;

  if (diffInSeconds < secondsInMinute) {
    return `${diffInSeconds}초 전`;
  } else if (diffInSeconds < secondsInHour) {
    const minutes: number = Math.floor(diffInSeconds / secondsInMinute);
    return `${minutes}분 전`;
  } else if (diffInSeconds < secondsInDay) {
    const hours: number = Math.floor(diffInSeconds / secondsInHour);
    return `${hours}시간 전`;
  } else {
    const days: number = Math.floor(diffInSeconds / secondsInDay);
    return `${days}일 전`;
  }
}
