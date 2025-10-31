import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Stepper from "../components/Stepper";
import StepUploadPreview from "../components/steps/StepUploadPreview";
import StepConfigurePrint from "../components/steps/StepConfigurePrint";
import StepReviewConfirm from "../components/steps/StepReviewConfirm";
import StepAgreementConfirm from "../components/steps/StepAgreementConfirm";
import { supabase } from "../supabaseClient";

export default function PrintFiles() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [printData, setPrintData] = useState({});
  const [user, setUser] = useState(null);
  const [student, setStudent] = useState(null); // row from student table

  // 🪜 Added the new step name for the Stepper
  const steps = [
    "Upload & Preview",
    "Configure Request",
    "Review & Confirm",
    "Agreement & Finish",
  ];

  // 🔹 Fetch user + student info
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const {
          data: { user: supaUser },
        } = await supabase.auth.getUser();

        if (!supaUser) {
          if (mounted) setUser(null);
          return;
        }

        if (mounted) setUser(supaUser);

        const { data: studentRow, error: studentError } = await supabase
          .from("student")
          .select("*")
          .eq("user_id", supaUser.id)
          .maybeSingle();

        if (studentError) {
          console.warn("Failed to fetch student row:", studentError);
        } else if (mounted) {
          setStudent(studentRow);
        }
      } catch (err) {
        console.warn("Error fetching user/student:", err);
      }
    })();

    return () => (mounted = false);
  }, []);

  // 🔹 Go to next step
  const nextStep = (data) => {
    if (data) setPrintData((prev) => ({ ...prev, ...data }));
    setCurrentStep((s) => Math.min(s + 1, steps.length));
  };

  // 🔹 Go to previous step
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  // 🔹 Handle successful submission (from last step)
  const handleFinish = async () => {
    // Optional: reset the flow after success
    setPrintData({});
    setCurrentStep(1);

    // Refresh student balance
    try {
      const {
        data: { user: supaUser },
      } = await supabase.auth.getUser();
      const { data: studentRow } = await supabase
        .from("student")
        .select("*")
        .eq("user_id", supaUser.id)
        .maybeSingle();
      setStudent(studentRow);
    } catch (e) {
      console.warn(e);
    }
  };

  // 🔹 Render correct step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepUploadPreview onNext={nextStep} />;
      case 2:
        return <StepConfigurePrint onNext={nextStep} onBack={prevStep} data={printData} />;
      case 3:
        return (
          <StepReviewConfirm
            onBack={prevStep}
            onNext={nextStep}
            data={printData}
            user={user}
            student={student}
            onSuccess={nextStep} // proceed to Agreement step on success
          />
        );
      case 4:
        return (
          <StepAgreementConfirm
            onBack={prevStep}
            onFinish={handleFinish}
            data={printData}
            user={user}
            student={student}
            setStudent={setStudent}
          />
        );
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
