/**
 * Determines whether the anonymous-question dialog should be open after a
 * standard form redirect or when a reader explicitly requests a fresh form.
 */
export function shouldOpenQuestionDialog(search: string): boolean {
  const params = new URLSearchParams(search);
  const submissionState = params.get("submitted");

  return (
    params.get("ask") === "1" ||
    submissionState === "1" ||
    submissionState === "error"
  );
}
