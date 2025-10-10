import React from "react";

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between max-w-3xl mx-auto relative">
      {steps.map((label, index) => {
        const stepNum = index + 1;
        const isActive = stepNum <= currentStep;

        return (
          <div key={index} className="flex-1 flex flex-col items-center relative">
            {/* Step Circle */}
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold z-10
                ${isActive ? "bg-sky-500 text-white" : "bg-gray-300 text-gray-600"}`}
            >
              {stepNum}
            </div>

            {/* Step Label */}
            <span
              className={`mt-2 text-sm font-medium text-center ${
                isActive ? "text-sky-600" : "text-gray-500"
              }`}
            >
              {label}
            </span>

            {/* Connecting Line (behind circles) */}
            {index < steps.length - 1 && (
              <div
                className={`absolute top-4 left-1/2 right-[-50%] h-1 z-0`}
                style={{
                  background: stepNum < currentStep
                    ? "rgb(14 165 233)" // sky-500 color
                    : "rgba(14, 165, 233, 0.2)", // transparent version
                }}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
