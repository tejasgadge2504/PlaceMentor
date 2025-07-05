"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResumeUploader() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await axios.post("http://127.0.0.1:5000/parse-resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Resume uploaded successfully:", response.data);

      // Store the response in localStorage
      localStorage.setItem("ResumeSummary", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error uploading resume:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef2fb] flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-xl">
        <Card className="rounded-xl shadow-md">
          <CardContent className="p-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold">Upload Your Resume</h3>
              <p className="text-sm text-muted-foreground">
                Upload a PDF resume to extract summary
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="resume">Resume (PDF only)</Label>
                <Input
                  id="resume"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>

              <Button
                className="w-full"
                disabled={!file || loading}
                onClick={handleUpload}
              >
                {loading ? "Uploading..." : "Upload Resume"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
