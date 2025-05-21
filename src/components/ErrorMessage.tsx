export function ErrorMessage({errorMessage}: {errorMessage: string}) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-red-500 text-xl font-semibold p-4 bg-red-50 rounded-lg shadow">
        {errorMessage}
      </div>
    </div>
  );
}
