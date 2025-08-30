"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Film, Loader2 } from 'lucide-react';
import { getTrailerSummary } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TrailerSummary({ trailerUrl }: { trailerUrl: string }) {
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSummarize = async () => {
        setIsLoading(true);
        setSummary('');
        const result = await getTrailerSummary({ trailerUrl });
        setIsLoading(false);

        if (result.success && result.data?.summary) {
            setSummary(result.data.summary);
        } else {
            toast({
                variant: 'destructive',
                title: 'Error Generating Summary',
                description: result.error || 'An unknown error occurred. Please try again.',
            });
        }
    };

    return (
        <Card className="bg-background/50 border-secondary">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-center justify-center text-3xl font-bold">
                    <Film className="w-6 h-6" /> Trailer
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="aspect-video bg-black rounded-md mb-4">
                    <iframe
                        width="100%"
                        height="100%"
                        src={trailerUrl}
                        title="Movie trailer"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-md"
                    ></iframe>
                </div>
                
                <Button onClick={handleSummarize} disabled={isLoading}>
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    {isLoading ? 'Generating Summary...' : 'Generate AI Summary'}
                </Button>

                {summary && (
                    <div className="mt-4 p-4 border rounded-lg bg-secondary/30 text-card-foreground">
                        <h4 className="font-bold mb-2 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-primary" />
                            AI-Generated Summary
                        </h4>
                        <p className="text-sm text-muted-foreground">{summary}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
