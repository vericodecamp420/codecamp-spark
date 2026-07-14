import { useState } from "react";
import { CheckCircle, Lightbulb, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Lesson } from "@/lib/courses-data";

interface CodePlaygroundProps {
  lesson: Lesson;
  onComplete: () => void;
}

export function CodePlayground({ lesson, onComplete }: CodePlaygroundProps) {
  const [code, setCode] = useState(lesson.starterCode ?? "");
  const [output, setOutput] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function runCode() {
    setOutput("");
    setStatus("idle");

    const normalized = code.toLowerCase().replace(/\s+/g, " ");
    const expected = (lesson.expectedOutput ?? "").toLowerCase();

    if (!expected) {
      setOutput("Code executed. No specific output check for this exercise.");
      setStatus("success");
      return;
    }

    if (normalized.includes(expected.toLowerCase())) {
      setOutput(`✅ Great job! Your output contains the expected result: "${lesson.expectedOutput}".`);
      setStatus("success");
    } else {
      setOutput(`❌ Not quite. We expected to see "${lesson.expectedOutput}" somewhere in your output.`);
      setStatus("error");
    }
  }

  function handleComplete() {
    runCode();
    onComplete();
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Code Editor</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setCode(lesson.starterCode ?? "")}>
            <RotateCcw className="mr-1 h-3.5 w-3.5" />
            Reset
          </Button>
          <Button size="sm" onClick={runCode}>
            <Play className="mr-1 h-3.5 w-3.5" />
            Run
          </Button>
        </div>
      </div>

      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="min-h-[240px] flex-1 font-mono text-sm leading-relaxed"
        spellCheck={false}
        placeholder="Write your code here..."
      />

      <div className="rounded-lg border bg-code p-4">
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-code-foreground/70">Output</h4>
        <pre className="whitespace-pre-wrap font-mono text-sm text-code-foreground">
          {output || "Click Run to see your output here."}
        </pre>
      </div>

      {status === "success" && (
        <Alert className="border-success/30 bg-success/10 text-success-foreground">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Exercise passed</AlertTitle>
          <AlertDescription>You can mark this lesson as complete.</AlertDescription>
        </Alert>
      )}

      {lesson.hints && lesson.hints.length > 0 && (
        <Accordion type="single" collapsible className="rounded-lg border bg-card">
          <AccordionItem value="hints" className="border-none">
            <AccordionTrigger className="px-4 py-3 text-sm hover:no-underline">
              <span className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-warning" />
                Need a hint?
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {lesson.hints.map((hint, i) => (
                  <li key={i}>{hint}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      <Button onClick={handleComplete} className="w-full" size="lg">
        <CheckCircle className="mr-2 h-4 w-4" />
        Mark as Complete
      </Button>
    </div>
  );
}
