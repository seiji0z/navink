import { useState } from "react";
import Stepper from "../components/Stepper";
import StepUploadPreview from "../steps/StepUploadPreview";
import StepConfigurePrint from "../steps/StepConfigurePrint";
import StepReviewConfirm from "../steps/StepReviewConfirm";
import Sidebar from "../components/Sidebar";

export default function PrintFiles() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [printData, setPrintData] = useState({});
  const steps = ["Upload & Preview", "Configure Request", "Review & Confirm"];

  const nextStep = (data) => {
    if (data) setPrintData((prev) => ({ ...prev, ...data }));
    setCurrentStep((s) => Math.min(s + 1, steps.length));
  };

  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepUploadPreview onNext={nextStep} />;
      case 2:
        return <StepConfigurePrint onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <StepReviewConfirm onBack={prevStep} data={printData} />;
      default:
        return null;
    }
  };

return (
  <div className="fade-in flex min-h-screen bg-sky-100">
    {/* Sidebar Section */}
    <div className="sticky top-0 h-screen">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
    </div>

    {/* Main Content */}
    <main className="flex-1 p-8 overflow-y-auto transition-all duration-300">
      <h2 className="text-xl font-semibold text-navi mb-4">Saved Files</h2>
      <div className="bg-white rounded-3xl p-6 shadow-md">

        {/* Stepper */}
        <Stepper steps={steps} currentStep={currentStep} />

        {/* Step Content */}
        <div className="mt-10">{renderStep()}</div>
      </div>
    </main>
  </div>
);



}
