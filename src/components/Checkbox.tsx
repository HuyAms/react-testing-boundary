export const Checkbox = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
        <div
          className={`w-10 h-6 rounded-full shadow-inner ${checked ? 'bg-blue-500' : 'bg-gray-300'}`}
        ></div>
        <div
          className={`absolute w-4 h-4 bg-white rounded-full shadow top-1 transition-transform duration-300 ${checked ? 'transform translate-x-5' : 'left-1'}`}
        ></div>
      </div>
      <span className="ml-3 text-lg font-medium">{label}</span>
    </label>
  );
};
