'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, FileText } from 'lucide-react';
import { useState } from 'react';
import { CSVUploadInfo } from './csv-upload-info';

interface CSVUploadProps {
  onUpload: (file: File) => Promise<void>;
  isAnalyzing?: boolean;
}

export function CSVUpload({ onUpload, isAnalyzing }: CSVUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
    } else {
      toast({
        title: 'Invalid file',
        description: 'Please select a valid CSV file',
        variant: 'destructive',
      });
    }
  };

    if (selectedFile.size > 10 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Maximum file size is 10MB',
        variant: 'destructive',
      });
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      await onUpload(file);
      setFile(null);
      setIsOpen(false);
      toast({
        title: 'Success',
        description: 'CSV file uploaded successfully',
      });
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: 'Failed to process CSV file',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={isAnalyzing} className="w-full sm:w-auto">
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload CSV
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Upload Reviews CSV
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              {file && (
                <p className="text-sm text-muted-foreground">
                  Selected: {file.name}
                </p>
              )}
            </div>
          </div>
          <CSVUploadInfo />
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleUpload}
              disabled={!file || isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Upload and Analyze'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
