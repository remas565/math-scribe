import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogEntry {
  id: string;
  timestamp: Date;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
}

interface LoggingPanelProps {
  logs: LogEntry[];
}

export function LoggingPanel({ logs }: LoggingPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date);
  };

  const getTypeColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-console-accent';
    }
  };

  const getTypePrefix = (type: LogEntry['type']) => {
    switch (type) {
      case 'success': return '✓';
      case 'warning': return '⚠';
      case 'error': return '✗';
      default: return '●';
    }
  };

  return (
    <Card variant="glass" className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-accent">
            <Terminal className="w-4 h-4 text-accent-foreground" />
          </div>
          <div>
            <CardTitle className="text-base">Event Log</CardTitle>
            <CardDescription className="text-xs">Live processing events</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          ref={scrollRef}
          className="h-40 rounded-xl bg-console-bg p-3 overflow-y-auto font-mono text-xs"
        >
          {logs.length === 0 ? (
            <p className="text-console-text opacity-50">Waiting for events...</p>
          ) : (
            <div className="space-y-1.5">
              {logs.map((log) => (
                <div key={log.id} className="flex gap-2">
                  <span className="text-console-text opacity-50 flex-shrink-0">
                    [{formatTime(log.timestamp)}]
                  </span>
                  <span className={cn("flex-shrink-0", getTypeColor(log.type))}>
                    {getTypePrefix(log.type)}
                  </span>
                  <span className="text-console-text">{log.message}</span>
                </div>
              ))}
            </div>
          )}
          <div className="h-px w-3 bg-console-accent mt-2 animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}
