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

export default function InterviewSetup() {
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
              <div>
                <Label htmlFor="company">
                  Target Company <span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="amazon">Amazon</SelectItem>
                    <SelectItem value="microsoft">Microsoft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="role">
                  Target Role <span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sde">SDE</SelectItem>
                    <SelectItem value="intern">Intern</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>
                  Interview Type <span className="text-red-500">*</span>
                </Label>
                <ToggleGroup type="single" className="mt-2 flex gap-4">
                  <ToggleGroupItem
                    value="technical"
                    className="w-full py-4 border rounded-md data-[state=on]:bg-muted data-[state=on]:border-primary"
                  >
                    <div className="text-center">
                      <div className="font-medium">Technical</div>
                      <div className="text-sm text-muted-foreground">
                        Coding & Technical Skills
                      </div>
                    </div>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="hr"
                    className="w-full py-4 border rounded-md data-[state=on]:bg-muted data-[state=on]:border-primary"
                  >
                    <div className="text-center">
                      <div className="font-medium">HR</div>
                      <div className="text-sm text-muted-foreground">
                        Behavioral & HR Questions
                      </div>
                    </div>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              <Button className="w-full mt-4" disabled>
                Start Interview
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
