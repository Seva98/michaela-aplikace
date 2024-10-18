'use client';

import { TableRow } from '@/components/ui/table';
import Typography from '@/components/ui/typography';
import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class TableRowWithError extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <TableRow>
          {this.props.children}
          <Typography variant="error">{this.state.error?.message || 'Something went wrong, please try again'}</Typography>
        </TableRow>
      );
    }

    return <TableRow>{this.props.children}</TableRow>;
  }
}

export default TableRowWithError;
