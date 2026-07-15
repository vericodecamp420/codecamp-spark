import { useState } from "react";
import { AlertCircle, CheckCircle, Lightbulb, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Lesson } from "@/lib/courses-data";

interface CodePlaygroundProps {
  lesson: Lesson;
  onComplete: () => void;
}

interface Feedback {
  status: "idle" | "success" | "error";
  headline: string;
  message: string;
  problems?: string[];
  suggestions?: string[];
}

const initialFeedback: Feedback = { status: "idle", headline: "", message: "" };

export function CodePlayground({ lesson, onComplete }: CodePlaygroundProps) {
  const [code, setCode] = useState(lesson.starterCode ?? "");
  const [feedback, setFeedback] = useState<Feedback>(initialFeedback);

  function analyze(): Feedback {
    const expected = (lesson.expectedOutput ?? "").trim();
    const trimmedCode = code.trim();

    if (!trimmedCode) {
      return {
        status: "error",
        headline: "No code to run",
        message: "The editor is empty. Write some code before running.",
        problems: ["Your editor doesn't contain any code."],
        suggestions: ["Start from the starter code and follow the lesson instructions."],
      };
    }

    if (!expected) {
      return {
        status: "success",
        headline: "Code executed",
        message: "There's no specific output check for this exercise. Review your solution and mark it complete when ready.",
      };
    }

    const normalizedCode = code.toLowerCase();
    const normalizedExpected = expected.toLowerCase();

    if (normalizedCode.includes(normalizedExpected)) {
      return {
        status: "success",
        headline: "Nice work — your output looks right!",
        message: `We found "${expected}" in your code output. You can mark this lesson as complete.`,
      };
    }

    // Wrong output — build detailed feedback
    const problems: string[] = [];
    const suggestions: string[] = [];

    problems.push(`Your output is missing the expected text: "${expected}".`);

    // Case-only mismatch?
    if (normalizedCode.includes(normalizedExpected) === false) {
      const caseMatchIndex = normalizedCode.indexOf(normalizedExpected);
      if (caseMatchIndex >= 0) {
        problems.push(`The text appears but the letter casing doesn't match "${expected}" exactly.`);
        suggestions.push(`Match the exact capitalization: "${expected}".`);
      }
    }

    // Suggest based on lesson type / keywords
    const codeLower = normalizedCode;
    if (codeLower.includes("console.log") === false && (lesson.starterCode ?? "").includes("console.log")) {
      suggestions.push("Use `console.log(...)` to print your value to the output.");
    }
    if (codeLower.includes("print(") === false && (lesson.starterCode ?? "").includes("print")) {
      suggestions.push("Use `print(...)` to display your value.");
    }
    if (codeLower.includes("printf") === false && (lesson.starterCode ?? "").includes("printf")) {
      suggestions.push("Use `printf(\"...\\n\")` to print output in C.");
    }
    if (normalizedExpected.length <= 40) {
      suggestions.push(`Make sure your code produces the string "${expected}" (spelling and spacing must match).`);
    }

    // Quote hint if expected looks like a word
    if (/^[a-z0-9 ,.!?'-]+$/i.test(expected)) {
      suggestions.push(
        `Wrap "${expected}" in quotes when you output it, e.g. print or log the exact string.`,
      );
    }

    if (lesson.hints && lesson.hints.length > 0) {
      suggestions.push(`Tip: ${lesson.hints[0]}`);
    }

    return {
      status: "error",
      headline: "Output doesn't match yet",
      message: `We expected to see "${expected}" in your output, but it wasn't found.`,
      problems,
      suggestions: Array.from(new Set(suggestions)),
    };
  }

  function runCode() {
    setFeedback(analyze());
  }

  function handleComplete() {
    const result = analyze();
    setFeedback(result);
    if (result.status === "success") {
      onComplete();
    }
  }

  const output =
    feedback.status === "idle"
      ? "Click Run to see your output here."
      : feedback.status === "success"
        ? `✅ ${feedback.message}`
        : `❌ ${feedback.message}`;

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Code Editor</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => { setCode(lesson.starterCode ?? ""); setFeedback(initialFeedback); }}>
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
        <pre className="whitespace-pre-wrap font-mono text-sm text-code-foreground">{output}</pre>
      </div>

      {feedback.status === "success" && (
        <Alert className="border-success/30 bg-success/10 text-success-foreground">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>{feedback.headline}</AlertTitle>
          <AlertDescription>You can mark this lesson as complete.</AlertDescription>
        </Alert>
      )}

      {feedback.status === "error" && (
        <Alert variant="destructive" className="border-destructive/40 bg-destructive/10">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{feedback.headline}</AlertTitle>
          <AlertDescription className="space-y-3">
            <p>{feedback.message}</p>
            {feedback.problems && feedback.problems.length > 0 && (
              <div>
                <p className="text-sm font-semibold">What's wrong:</p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
                  {feedback.problems.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            )}
            {feedback.suggestions && feedback.suggestions.length > 0 && (
              <div>
                <p className="text-sm font-semibold">How to fix it:</p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
                  {feedback.suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </AlertDescription>
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
