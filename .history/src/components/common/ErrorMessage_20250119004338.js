export default function ErrorMessage({ message }) {
  return (
    <div className="text-center py-12">
      <p className="text-red-500">{message}</p>
    </div>
  );
}
