import type { ChangeEvent } from 'react';

export default ({ title, value, placeholder, onChange }: TextInputProps) => {
  return (
    <>
      <div className="block text-sm font-medium mb-1 text-gray-300">
        {title}
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500 caret-blue-400"
      />
    </>
  );
};

export type TextInputProps = {
  title: string;
  value: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};
