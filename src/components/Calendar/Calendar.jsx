// Словари для локализации
const DAYS_OF_WEEK_SHORT = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const DAYS_OF_WEEK_FULL = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];
const MONTHS_NOMINATIVE = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
const MONTHS_GENITIVE = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];

const Calendar = ({ date }) => {
  // Если дата не передана, используем текущую
  const currentDate = date || new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();

  // Получаем день недели (0 - Пн, ..., 6 - Вс)
  const dayOfWeekIndex = (currentDate.getDay() + 6) % 7;

  // 1. Вычисляем сетку дат
  const firstDayOfMonth = new Date(year, month, 1);
  // Получаем день недели 1-го числа месяца (0 - Пн, ..., 6 - Вс)
  const firstDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7;

  // Начало сетки (может быть в предыдущем месяце)
  const startDate = new Date(year, month, 1 - firstDayOfWeek);

  // Генерируем 42 дня (максимум 6 недель)
  const totalDays = 42;

  const gridDates = [];
  for (let i = 0; i < totalDays; i++) {
    const currentGridDate = new Date(startDate);
    currentGridDate.setDate(startDate.getDate() + i);
    gridDates.push(currentGridDate);
  }

  // Разбиваем на недели (строки таблицы)
  const weeks = [];
  for (let i = 0; i < gridDates.length; i += 7) {
    weeks.push(gridDates.slice(i, i + 7));
  }

  // ФИЛЬТРАЦИЯ: Оставляем только те недели, в которых есть хотя бы один день текущего месяца
  const visibleWeeks = weeks.filter((week) =>
    week.some((dayItem) => dayItem.getMonth() === month),
  );

  return (
    <div className="ui-datepicker">
      {/* Верхняя часть (Material Header) */}
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">
          {DAYS_OF_WEEK_FULL[dayOfWeekIndex]}
        </div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{day}</div>
          <div className="ui-datepicker-material-month">
            {MONTHS_GENITIVE[month]}
          </div>
          <div className="ui-datepicker-material-year">{year}</div>
        </div>
      </div>

      {/* Заголовок месяца */}
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">
            {MONTHS_NOMINATIVE[month]}
          </span>
          &nbsp;
          <span className="ui-datepicker-year">{year}</span>
        </div>
      </div>

      {/* Таблица календаря */}
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            {DAYS_OF_WEEK_SHORT.map((dayName, index) => (
              <th key={index} scope="col" title={DAYS_OF_WEEK_FULL[index]}>
                {dayName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleWeeks.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((dateItem, dayIndex) => {
                const isOtherMonth = dateItem.getMonth() !== month;
                const isToday = dateItem.getDate() === day && !isOtherMonth;

                let className = "";
                if (isOtherMonth) className = "ui-datepicker-other-month";
                if (isToday) className = "ui-datepicker-today";

                return (
                  <td key={dayIndex} className={className}>
                    {dateItem.getDate()}
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

export default Calendar;
