export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="mt-4 text-base-content/60">Loading...</p>
    </div>
  );
}
