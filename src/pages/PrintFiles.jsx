import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Stepper from "../components/Stepper";
import StepUploadPreview from "../components/steps/StepUploadPreview";
import StepConfigurePrint from "../components/steps/StepConfigurePrint";
import StepReviewConfirm from "../components/steps/StepReviewConfirm";

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
        return <StepConfigurePrint onNext={nextStep} onBack={prevStep} data={printData} />;
      case 3:
        return <StepReviewConfirm onBack={prevStep} data={printData} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <main className="flex-1 p-6">
        <Stepper steps={steps} currentStep={currentStep} />
        <div className="mt-8">{renderStep()}</div>
      </main>
    </div>
  );
}
