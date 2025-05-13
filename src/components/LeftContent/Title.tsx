import { Bars3Icon } from "@heroicons/react/24/outline";

const Title = () => {
  return (
    <>
      <div className="p-[30px] h-[50px] flex items-center justify-start gap-4">
        <Bars3Icon className="w-6 h-6" />
        <div className="text-2xl font-medium  ">Calendar</div>
      </div>
    </>
  );
};

export default Title;
