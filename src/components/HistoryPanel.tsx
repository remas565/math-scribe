import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { History, Trash2, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HistoryItem {
  id: string;
  latex: string;
  timestamp: Date;
  thumbnail?: string;
}

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
  onCopy: (latex: string) => void;
}

export function HistoryPanel({ history, onSelect, onDelete, onCopy }: HistoryPanelProps) {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  return (
    <Card variant="elevated" className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-accent">
            <History className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <CardTitle>History</CardTitle>
            <CardDescription>Recent conversions</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="h-24 rounded-xl bg-secondary flex items-center justify-center">
            <p className="text-sm text-muted-foreground">No history yet</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {history.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelect(item)}
                className={cn(
                  "group flex items-center gap-3 p-3 rounded-xl cursor-pointer",
                  "bg-secondary hover:bg-accent transition-all duration-200"
                )}
              >
                {item.thumbnail && (
                  <div className="w-10 h-10 rounded-lg bg-background overflow-hidden flex-shrink-0">
                    <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-mono truncate text-foreground">{item.latex}</p>
                  <p className="text-xs text-muted-foreground">{formatTime(item.timestamp)}</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCopy(item.latex);
                    }}
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item.id);
                    }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
