import { Input } from "@/components/ui/input";

const ModalTitle = ({
  title,
  onTitleChange,
}: {
  title: string;
  onTitleChange: (title: string) => void;
}) => {
  return (
    <div className="w-full box-border pl-[50px]">
      <Input
        placeholder="제목 추가"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="w-full p-0 box-border border-0 border-b border-gray-300 border-solid shadow-none rounded-none focus:border-b-2 focus:border-blue-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:ring-offset-0 text-xl placeholder:text-gray-400 placeholder:text-xl"
      />
    </div>
  );
};

export default ModalTitle;
