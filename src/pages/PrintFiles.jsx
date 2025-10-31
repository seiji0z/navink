import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Stepper from "../components/Stepper";
import StepUploadPreview from "../components/steps/StepUploadPreview";
import StepConfigurePrint from "../components/steps/StepConfigurePrint";
import StepReviewConfirm from "../components/steps/StepReviewConfirm";
import { supabase } from "../supabaseClient";

export default function PrintFiles() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [printData, setPrintData] = useState({});
  const [user, setUser] = useState(null);
  const [student, setStudent] = useState(null); // row from student table

  const steps = ["Upload & Preview", "Configure Request", "Review & Confirm"];

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // get authenticated user
        const {
          data: { user: supaUser },
        } = await supabase.auth.getUser();

        if (!supaUser) {
          if (mounted) setUser(null);
          return;
        }

        if (mounted) setUser(supaUser);

        // fetch student row with token_balance
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
        return (
          <StepReviewConfirm
            onBack={prevStep}
            data={printData}
            user={user}
            student={student}
            onSuccess={() => {
              // optional: reset flow after success
              setPrintData({});
              setCurrentStep(1);
              // refresh student balance
              (async () => {
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
              })();
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <main className="flex-1 p-6 flex flex-col relative max-h-screen overflow-hidden">
        <h2 className="text-2xl font-semibold text-navi mb-4">Print Files</h2>
        <div className="bg-white rounded-3xl p-6 shadow-md flex-1">
          <Stepper steps={steps} currentStep={currentStep} />
          <div className="mt-2">{renderStep()}</div>
        </div>
      </main>
    </div>
  );
}
