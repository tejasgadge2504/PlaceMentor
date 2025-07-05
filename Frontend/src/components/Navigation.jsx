import { ChevronLeft, ChevronRight, X } from "lucide-react";
import PropTypes from "prop-types";

const Navigation = ({
  showPrevious = false,
  showNext = false,
  showExit = true,
  onPrevious,
  onNext,
  onExit,
  title,
  nextLabel = "Next",
  previousLabel = "Previous",
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between">
        {/* Left Side - Previous Button */}
        <div className="flex items-center">
          {showPrevious ? (
            <button
              onClick={onPrevious}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              {previousLabel}
            </button>
          ) : (
            <div className="w-20"></div> // Spacer
          )}
        </div>

        {/* Center - Title */}
        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
        </div>

        {/* Right Side - Next and Exit Buttons */}
        <div className="flex items-center gap-2">
          {showNext && (
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
            >
              {nextLabel}
              <ChevronRight className="h-4 w-4" />
            </button>
          )}

          {showExit && (
            <button
              onClick={onExit}
              className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              title="Exit Interview"
            >
              <X className="h-4 w-4" />
              Exit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Navigation.propTypes = {
  showPrevious: PropTypes.bool,
  showNext: PropTypes.bool,
  showExit: PropTypes.bool,
  onPrevious: PropTypes.func,
  onNext: PropTypes.func,
  onExit: PropTypes.func,
  title: PropTypes.string,
  nextLabel: PropTypes.string,
  previousLabel: PropTypes.string,
};

export default Navigation;
