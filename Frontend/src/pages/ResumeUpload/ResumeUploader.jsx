import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const ResumeUploader = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResponse("");
  };

  const handleSend = async () => {
    if (!file) {
      alert("Please upload a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:5000/parse-resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResponse(JSON.stringify(res.data, null, 2));
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || "Unknown error";
      setResponse("Error: " + errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6 p-4">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Upload Your Resume</h2>

          <Input type="file" accept=".pdf" onChange={handleFileChange} />
          {file && <p className="text-sm text-muted-foreground">Selected: {file.name}</p>}

          <div className="flex gap-4">
            <Button onClick={handleSend} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Sending..." : "Send"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {response && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-2">API Response:</h3>
            <pre className="text-sm whitespace-pre-wrap">{response}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResumeUploader;
