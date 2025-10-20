"use client";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function MyCalendar() {
  return (
    //center by width and height of the parent div
    <div className="h-screen flex justify-center items-center">
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        className="w-2/3"
        style={{ height: "80vh" }}
      />
    </div>
  );
}
