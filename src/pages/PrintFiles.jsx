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
  const [mobileOpen, setMobileOpen] = useState(false);
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
    <div className="fade-in flex h-screen bg-sky-100 overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg"
        aria-label="Open sidebar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <main className="flex-1 h-screen overflow-y-auto p-4 sm:p-6 lg:p-8 flex flex-col relative">
        <h2 className="text-2xl sm:text-3xl font-semibold text-navi mb-4 sm:mb-6 truncate">Print Files</h2>
        <div className="flex flex-col gap-6">
          <div className="my-4 sm:my-6">
            <Stepper steps={steps} currentStep={currentStep} />
          </div>
          <div className="mt-2 sm:mt-4">{renderStep()}</div>
        </div>
      </main>
    </div>
  );
}
