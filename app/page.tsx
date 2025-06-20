import SignupForm from "@/components/SignupForm";
import { SITE_TITLE, SITE_DESCRIPTION, PROJECT_TAG } from "@/config";

export default function Home() {
  return (
    <>
      <div className="background-glow"></div>
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-8 w-full max-w-md">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-text">{SITE_TITLE}</h1>
            <p className="text-xl text-text-muted mx-auto">
              {SITE_DESCRIPTION}
            </p>
          </div>

          <SignupForm tag={PROJECT_TAG} />
        </div>
      </main>
    </>
  );
}
