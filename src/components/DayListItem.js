import React from "react";
import classnames from "classnames/bind";

import "components/DayListItem.scss";

// Renders the day info. Gets called in DayList component
export default function DayListItem(props) {
const dayClass = classnames("day-list__item", {
  "day-list__item--selected": props.selected,
  "day-list__item--full": !props.spots
});
  const formatSpots = () => {
    if (props.spots === 0) return `no spots remaining`;
    if (props.spots === 1) return ` ${props.spots} spot remaining`;
    return `${props.spots} spots remaining`
  }
  return (
    <li className={dayClass} data-testid="day"
      onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}