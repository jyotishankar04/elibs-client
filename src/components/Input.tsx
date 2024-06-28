interface InputComponentProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
  label: string;
  placeholder?: string;
}

const Input: React.FC<InputComponentProps> = ({
  value,
  onChange,
  type,
  name,
  label,
  placeholder,
}) => {
  return (
    <div>
      <div className="flex mt-4 flex-col w-full items-start gap-2">
        <label className="text-gray-800 text-sm font-semibold">{label}</label>
        <input
          type={type}
          className="text-gray-900 border bg-transparent p-2 w-full rounded-lg focus-within:ring-2 ring-gray-400  outline-none
             ring-1
            focus-within:ring-black 
            "
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
        />
      </div>
    </div>
  );
};

export default Input;
