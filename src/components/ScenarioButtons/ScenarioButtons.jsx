import React, { useState } from "react";
import "./scenariobuttons.css";
import { Typography } from "@material-ui/core";
import classnames from "classnames";

export default function ScenarioButtons(props) {
  const names = props.names;
  const [selected, setSelected] = useState(names[0]);

  const handleClick = (name) => () => {
    setSelected(name);
    props.setPaint(name);
  };

  return (
    <div className="container">
      <div className="heading">
        <Typography variant="subtitle2">Visa Färg Enligt</Typography>
      </div>
      <div className="scenariobuttons">
        {names.map((name) => (
          <button
            key={name}
            className={classnames({
              scenariobutton: true,
              active: selected === name,
            })}
            onClick={handleClick(name)}
          >
            <Typography variant="body1">{name}</Typography>
          </button>
        ))}
      </div>
    </div>
  );
}
