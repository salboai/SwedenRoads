import React, { useState } from "react";
import "./scenariobuttons.css";
import { Typography } from "@material-ui/core";
import classnames from "classnames";
import { translatekey } from "../Roadinfo/translate";

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
            onClick={handleClick(name)}
            className={classnames({
              scenariobutton: true,
              active: selected === name,
            })}
          >
            <Typography variant="body1">{translatekey(name)}</Typography>
          </button>
        ))}
      </div>
    </div>
  );
}
