export function formatSeconds(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export type TimerStatus = 'normal' | 'warning' | 'critical' | 'expired';

export function getTimerStatus(remaining: number, total: number): TimerStatus {
  if (remaining <= 0) return 'expired';
  if (remaining <= 10) return 'critical';
  if (remaining <= 30 && total > 30) return 'warning';
  return 'normal';
}
