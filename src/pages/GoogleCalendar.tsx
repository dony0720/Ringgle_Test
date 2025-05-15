import Header from "@/components/Header";
import LeftContent from "@/components/LeftContent/LeftContent";
import CalendarList from "@/components/RightContent/CalendarList";
const GoogleCalendar = () => {
  return (
    <div className="w-[100vw] h-[100vh] min-w-[1280px] ">
      <Header />
      <div className="flex h-[85%]">
        <LeftContent />
        <CalendarList />
      </div>
    </div>
  );
};

export default GoogleCalendar;
