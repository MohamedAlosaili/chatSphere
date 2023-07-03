import { Component, PropsWithChildren } from "react";
import { MdError } from "react-icons/md";
import Button from "./Button";

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
  triesCounter: number;
}

interface ErrorBoundaryProps extends PropsWithChildren {
  message?: string;
  onReset?: () => void;
}

const resetState: Omit<ErrorBoundaryState, "triesCounter"> = {
  hasError: false,
  message: "",
};

const initialState = { ...resetState, triesCounter: 0 };

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = initialState;
    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      message: error.message ?? "Oops, something went wrong!",
    };
  }

  // For logging errors in external service
  componentDidCatch() {}

  componentDidUpdate(
    prevProps: ErrorBoundaryProps,
    prevState: ErrorBoundaryState
  ) {
    if (prevState.hasError && !this.state.hasError) {
      this.setState({
        triesCounter: 0,
      });
    }
  }

  resetErrorBoundary() {
    this.setState(prev => ({
      ...resetState,
      triesCounter: prev.triesCounter + 1,
    }));
    this.props.onReset && this.props.onReset();
  }

  render() {
    const { hasError, message, triesCounter } = this.state;

    if (hasError) {
      return (
        <div className="flex h-full items-center justify-center py-4">
          <div className="flex max-w-sm flex-col items-center justify-center gap-4 rounded-xl p-2 py-4 text-center">
            <MdError size={50} className="text-rose-500" />
            <p className="font-medium text-tcolor">
              {this.props.message ?? message}
            </p>
            {triesCounter < 3 ? (
              <Button onClick={this.resetErrorBoundary}>Try again</Button>
            ) : (
              <p className="text-tcolor">
                The error appears to be persistent, please contact the support
                to report this issue{" "}
                <a
                  href="mailto:mohamedweb85@gmail.com?subject=Error while using ChatSphere"
                  className="text-accent"
                >
                  here
                </a>
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
