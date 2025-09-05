'use client';

import React, { useState, useCallback } from 'react';
import { AlertCircle, Camera, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface ScreenshotResult {
  page: string;
  viewport: string;
  identical: boolean;
  differencePercentage: number;
  beforePath?: string;
  afterPath?: string;
  diffPath?: string;
}

interface ValidationStatus {
  isRunning: boolean;
  phase: 'idle' | 'capturing-before' | 'waiting' | 'capturing-after' | 'comparing' | 'complete';
  results: ScreenshotResult[];
  error?: string;
}

export function ScreenshotValidator() {
  const [status, setStatus] = useState<ValidationStatus>({
    isRunning: false,
    phase: 'idle',
    results: []
  });

  const [selectedPages, setSelectedPages] = useState<string[]>(['home']);
  const [threshold, setThreshold] = useState(1.0);

  const availablePages = [
    { id: 'home', name: 'Home Page', url: '/' },
    { id: 'about', name: 'About Page', url: '/about' },
    { id: 'courses', name: 'Courses Page', url: '/courses' },
    { id: 'study-app', name: 'Study App', url: '/study-app' },
    { id: 'faq', name: 'FAQ Page', url: '/faq' }
  ];

  const runValidation = useCallback(async () => {
    setStatus({ isRunning: true, phase: 'capturing-before', results: [] });

    try {
      // Start validation session
      const sessionResponse = await fetch('/api/screenshot/start-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: `dev-validation-${Date.now()}`,
          pages: selectedPages
        })
      });

      if (!sessionResponse.ok) throw new Error('Failed to start session');
      const { sessionId } = await sessionResponse.json();

      // Capture before state
      for (const pageId of selectedPages) {
        const page = availablePages.find(p => p.id === pageId);
        if (!page) continue;

        await fetch('/api/screenshot/capture-before', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            pageName: page.id,
            url: page.url
          })
        });
      }

      // Wait for user to make changes
      setStatus(prev => ({ ...prev, phase: 'waiting' }));
      
      // In a real implementation, this would wait for user action
      // For now, we'll simulate with a timeout
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Capture after state and compare
      setStatus(prev => ({ ...prev, phase: 'capturing-after' }));
      
      const results: ScreenshotResult[] = [];
      
      for (const pageId of selectedPages) {
        const response = await fetch('/api/screenshot/capture-after', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            pageName: pageId
          })
        });

        if (response.ok) {
          const comparisons = await response.json();
          results.push(...comparisons);
        }
      }

      setStatus({
        isRunning: false,
        phase: 'complete',
        results
      });

    } catch (error) {
      setStatus({
        isRunning: false,
        phase: 'idle',
        results: [],
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }, [selectedPages]);

  const togglePage = (pageId: string) => {
    setSelectedPages(prev => 
      prev.includes(pageId) 
        ? prev.filter(id => id !== pageId)
        : [...prev, pageId]
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Screenshot Validation Tool
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Validate visual changes before committing your code
        </p>
      </div>

      {/* Page Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Select Pages to Validate:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {availablePages.map(page => (
            <label
              key={page.id}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedPages.includes(page.id)}
                onChange={() => togglePage(page.id)}
                disabled={status.isRunning}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">{page.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Threshold Setting */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Difference Threshold: {threshold}%
        </label>
        <input
          type="range"
          min="0.1"
          max="5"
          step="0.1"
          value={threshold}
          onChange={(e) => setThreshold(parseFloat(e.target.value))}
          disabled={status.isRunning}
          className="w-full"
        />
      </div>

      {/* Action Button */}
      <div className="mb-6">
        <button
          onClick={runValidation}
          disabled={status.isRunning || selectedPages.length === 0}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium 
                     hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed
                     transition-colors duration-200 flex items-center justify-center"
        >
          {status.isRunning ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              {status.phase === 'capturing-before' && 'Capturing Before State...'}
              {status.phase === 'waiting' && 'Waiting for Changes...'}
              {status.phase === 'capturing-after' && 'Capturing After State...'}
              {status.phase === 'comparing' && 'Comparing Screenshots...'}
            </>
          ) : (
            <>
              <Camera className="w-5 h-5 mr-2" />
              Start Validation
            </>
          )}
        </button>
      </div>

      {/* Status Messages */}
      {status.phase === 'waiting' && (
        <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
            <div>
              <p className="font-medium text-yellow-800 dark:text-yellow-200">
                Make your changes now!
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                The tool is waiting for you to modify the code. It will automatically continue after a few seconds.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {status.error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center">
            <XCircle className="w-5 h-5 text-red-600 mr-2" />
            <p className="text-red-800 dark:text-red-200">{status.error}</p>
          </div>
        </div>
      )}

      {/* Results Display */}
      {status.phase === 'complete' && status.results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Validation Results:</h3>
          
          {/* Summary */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm text-green-600 dark:text-green-400">Identical</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                {status.results.filter(r => r.identical).length}
              </p>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">Changed</p>
              <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                {status.results.filter(r => !r.identical).length}
              </p>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="space-y-2">
            {status.results.map((result, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  result.identical
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {result.identical ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 mr-2" />
                    )}
                    <span className="font-medium">
                      {result.page} - {result.viewport}
                    </span>
                  </div>
                  <span className="text-sm">
                    {result.identical 
                      ? 'No changes' 
                      : `${result.differencePercentage.toFixed(2)}% different`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}