const getDayEventsTemplate = (date, numberOfDay) => {
  const MONTH_NAMES = [
    `JAN`,
    `FEB`,
    `MAR`,
    `APR`,
    `MAY`,
    `JUN`,
    `JUL`,
    `AUG`,
    `SEP`,
    `OCT`,
    `NOV`,
    `DEC`,
  ];

  const year = date.getFullYear();
  const month = MONTH_NAMES[date.getMonth()];
  const day = date.getDate();

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${numberOfDay}</span>
        <time class="day__date" datetime="${year}-${month}-${day}">${month} ${day}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
     </li>`
  );
};

export {getDayEventsTemplate};
