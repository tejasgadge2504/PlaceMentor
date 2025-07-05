"use client";

import { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Code2, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function InterviewSetup() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [round, setRound] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const resumeSummary = localStorage.getItem('ResumeSummary')
  
  // 👇 Set summary variable
  
  const handleStartInterview = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/generate-interview-questions", {
        resume_summary: resumeSummary,
        company,
        role,
        round,
      });
      console.log("Interview started:", response.data.interview_plan);

      localStorage.setItem("QuestionCount", 1);
      
      localStorage.setItem("InterviewPlan", JSON.stringify(response.data.interview_plan));
      navigate('/start-interview')
    } catch (error) {
      console.error("Error starting interview:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef2fb] flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-xl">
        <div className="mb-4 flex items-center justify-between">
          <Button variant="ghost" className="text-muted-foreground">
            &lt; Previous
          </Button>
          <h2 className="text-lg font-semibold">Interview Setup</h2>
          <Button variant="ghost" className="text-red-500 px-0">
            ✕ Exit
          </Button>
        </div>

        <Card className="rounded-xl shadow-md">
          <CardContent className="p-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold">Setup Your Interview</h3>
              <p className="text-sm text-muted-foreground">
                Configure your interview preferences to get personalized
                questions
              </p>
            </div>

            <div className="space-y-4">
              {/* Company Select */}
              <div>
                <Label htmlFor="company">
                  Target Company <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => setCompany(value)}>
                  <SelectTrigger className="mt-1 bg-white">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Google">Google</SelectItem>
                    <SelectItem value="Amazon">Amazon</SelectItem>
                    <SelectItem value="Microsoft">Microsoft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Role Select */}
              <div>
                <Label htmlFor="role">
                  Target Role <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => setRole(value)}>
                  <SelectTrigger className="mt-1 bg-white">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SDE">SDE</SelectItem>
                    <SelectItem value="Intern">Intern</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Interview Type Toggle */}
              <div>
                <Label htmlFor="interviewType">
                  Interview Type <span className="text-red-500">*</span>
                </Label>
                <ToggleGroup
                  type="single"
                  className="mt-3 flex gap-4"
                  onValueChange={(value) => setRound(value)}
                >
                  <ToggleGroupItem
                    value="technical"
                    className="flex-1 flex flex-col items-center justify-center border rounded-lg px-4 py-5 h-[120px] data-[state=on]:bg-muted data-[state=on]:border-primary transition-all"
                  >
                    <Code2 className="h-6 w-6 mb-2" />
                    <div className="font-medium">Technical</div>
                    <div className="text-sm text-muted-foreground text-center">
                      Coding & Skills
                    </div>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="hr"
                    className="flex-1 flex flex-col items-center justify-center border rounded-lg px-4 py-5 h-[120px] data-[state=on]:bg-muted data-[state=on]:border-primary transition-all"
                  >
                    <User className="h-6 w-6 mb-2" />
                    <div className="font-medium">HR</div>
                    <div className="text-sm text-muted-foreground text-center">
                      Behavioral Qs
                    </div>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {/* Start Button */}
              <Button
                className="w-full mt-4"
                disabled={!company || !role || !round || loading}
                onClick={handleStartInterview}
              >
                {loading ? "Starting..." : "Start Interview"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                * Required fields
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
