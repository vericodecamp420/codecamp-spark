import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Lesson, QuizQuestion } from "@/lib/courses-data";

interface QuizProps {
  lesson: Lesson;
  onComplete: () => void;
}

export function Quiz({ lesson, onComplete }: QuizProps) {
  const questions = lesson.questions ?? [];
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);
  const correctCount = questions.filter((q) => answers[q.id] === q.correctIndex).length;
  const allCorrect = correctCount === questions.length;

  function handleSubmit() {
    if (!allAnswered) return;
    setSubmitted(true);
    if (allCorrect) {
      onComplete();
    }
  }

  return (
    <div className="space-y-6">
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          selected={answers[question.id]}
          onSelect={(index) => setAnswers((prev) => ({ ...prev, [question.id]: index }))}
          submitted={submitted}
        />
      ))}

      {submitted && (
        <Alert className={allCorrect ? "border-success/30 bg-success/10" : "border-destructive/30 bg-destructive/10"}>
          {allCorrect ? <CheckCircle className="h-4 w-4 text-success" /> : <XCircle className="h-4 w-4 text-destructive" />}
          <AlertTitle>{allCorrect ? "All correct!" : "Keep trying"}</AlertTitle>
          <AlertDescription>
            {allCorrect
              ? "Great job. This lesson is marked as complete."
              : `You got ${correctCount} out of ${questions.length} correct. Review the explanations and try again.`}
          </AlertDescription>
        </Alert>
      )}

      <Button onClick={handleSubmit} disabled={!allAnswered || (submitted && allCorrect)} className="w-full" size="lg">
        {submitted ? (allCorrect ? "Completed" : "Try Again") : "Submit Answers"}
      </Button>

      {submitted && !allCorrect && (
        <Button variant="outline" className="w-full" size="lg" onClick={() => { setSubmitted(false); setAnswers({}); }}>
          Reset Quiz
        </Button>
      )}
    </div>
  );
}

interface QuestionCardProps {
  question: QuizQuestion;
  selected?: number;
  onSelect: (index: number) => void;
  submitted: boolean;
}

function QuestionCard({ question, selected, onSelect, submitted }: QuestionCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <h4 className="mb-4 font-medium text-foreground">{question.question}</h4>
      <RadioGroup
        value={selected?.toString()}
        onValueChange={(value) => onSelect(Number(value))}
        disabled={submitted}
        className="space-y-3"
      >
        {question.options.map((option, index) => {
          const isCorrect = index === question.correctIndex;
          const isSelected = selected === index;
          const showCorrect = submitted && isCorrect;
          const showWrong = submitted && isSelected && !isCorrect;

          return (
            <div
              key={index}
              className={`flex items-center gap-3 rounded-lg border p-3 transition-colors ${
                showCorrect
                  ? "border-success bg-success/10"
                  : showWrong
                    ? "border-destructive bg-destructive/10"
                    : "border-border hover:border-primary/30"
              }`}
            >
              <RadioGroupItem value={index.toString()} id={`${question.id}-${index}`} />
              <Label htmlFor={`${question.id}-${index}`} className="flex-1 cursor-pointer text-sm font-normal">
                {option}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
      {submitted && selected !== undefined && (
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Explanation:</span> {question.explanation}
        </p>
      )}
    </div>
  );
}
