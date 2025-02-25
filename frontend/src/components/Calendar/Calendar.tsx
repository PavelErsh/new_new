import { useEffect, useState } from "react";
import "./styles.css";

export const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [days, setDays] = useState<string[]>([]);;

  useEffect(() => {
    generateCalendar(currentMonth, currentYear);
  }, [currentMonth, currentYear]);

  const generateCalendar = (month: number, year: number) => {
    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const newDays: string[] = [];

    const monthTitle =
      new Date(year, month, 1).toLocaleString("ru", { month: "long" }) +
      " " +
      year;

    for (let i = 0; i < firstDay; i++) {
      newDays.push("");
    }

    for (let date = 1; date <= daysInMonth; date++) {
      newDays.push(date.toString());
    }

    setDays(newDays);
    const titleElement = document.getElementById("calendar-title");
    if (titleElement) {
        titleElement.textContent = monthTitle;
    }
  };

  const changeMonth = (offset:number) => {
    const newMonth = currentMonth + offset;
    if (newMonth < 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else if (newMonth > 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(newMonth);
    }
  };

  return (
    <div className="calendar-widget">
      <div className="calendar-header">
        <button className="nav-btn" onClick={() => changeMonth(-1)}>
          &lt;
        </button>
        <h3 id="calendar-title">Декабрь 2024</h3>
        <button className="nav-btn" onClick={() => changeMonth(1)}>
          &gt;
        </button>
      </div>
      <table className="calendar">
        <thead>
          <tr>
            <th>Пн</th>
            <th>Вт</th>
            <th>Ср</th>
            <th>Чт</th>
            <th>Пт</th>
            <th>Сб</th>
            <th>Вс</th>
          </tr>
        </thead>
        <tbody id="calendar-body">
          {Array.from({ length: 6 }, (_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: 7 }, (_, cellIndex) => {
                const dayIndex = rowIndex * 7 + cellIndex;
                const day = days[dayIndex] || "";
                const isToday =
                  day === new Date().getDate().toString() &&
                  currentMonth === new Date().getMonth() &&
                  currentYear === new Date().getFullYear();
                return (
                  <td key={cellIndex} className={isToday ? "today" : ""}>
                    {day}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
