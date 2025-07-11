import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback } = this.props;
      
      if (Fallback) {
        return <Fallback error={this.state.error} />;
      }

      return (
        <div className="min-h-screen bg-red-50 p-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-red-900 mb-4">组件错误</h1>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-red-800 mb-4">发生了错误</h2>
              {this.state.error && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800">错误信息:</h3>
                  <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                    {this.state.error.message}
                  </pre>
                </div>
              )}
              {this.state.errorInfo && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800">错误堆栈:</h3>
                  <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-64">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              )}
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                重新加载页面
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
