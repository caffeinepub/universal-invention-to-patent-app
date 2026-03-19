import { useEffect, useRef } from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useVoiceInput } from '@/hooks/useVoiceInput';

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
  fieldName?: string;
  className?: string;
}

export function VoiceInputButton({ onTranscript, fieldName = 'field', className = '' }: VoiceInputButtonProps) {
  const { isListening, transcript, state, error, isSupported, startListening, stopListening, clearTranscript } = useVoiceInput();
  const prevTranscriptRef = useRef('');

  useEffect(() => {
    if (transcript && transcript !== prevTranscriptRef.current) {
      const newText = transcript.slice(prevTranscriptRef.current.length);
      if (newText.trim()) {
        onTranscript(newText);
      }
      prevTranscriptRef.current = transcript;
    }
  }, [transcript, onTranscript]);

  useEffect(() => {
    if (!isListening) {
      prevTranscriptRef.current = '';
      clearTranscript();
    }
  }, [isListening, clearTranscript]);

  if (!isSupported) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={`h-8 w-8 text-muted-foreground opacity-50 cursor-not-allowed ${className}`}
              disabled
            >
              <MicOff className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Voice input not supported in this browser</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={isListening ? stopListening : startListening}
            className={`h-8 w-8 transition-all duration-200 ${
              isListening
                ? 'text-gold bg-gold/15 border border-gold/40 pulse-ring mic-active'
                : state === 'error'
                ? 'text-destructive hover:text-destructive'
                : 'text-muted-foreground hover:text-gold hover:bg-gold/10'
            } ${className}`}
            aria-label={isListening ? `Stop voice input for ${fieldName}` : `Start voice input for ${fieldName}`}
          >
            {state === 'error' ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {state === 'error' && error ? (
            <p className="text-destructive">{error}</p>
          ) : isListening ? (
            <p>🎙️ Listening... Click to stop</p>
          ) : (
            <p>Click to dictate into {fieldName}</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
