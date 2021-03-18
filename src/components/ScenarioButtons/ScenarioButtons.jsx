import React, { useState } from "react";
import "./scenariobuttons.css";
import { Typography } from "@material-ui/core";
import classnames from "classnames";
import { translatekey } from "../Roadinfo/translate";
import Tooltip from "../LightTooltip";

export default function ScenarioButtons(props) {
  const names = props.names;
  const [selected, setSelected] = useState(names[0]);

  const handleClick = (name) => () => {
    setSelected(name);
    props.setPaint(name);
  };

  return (
    <div className="container">
      <div className="scenariobuttons">
        {names.map((name) => (
          <Tooltip
            key={name}
            arrow
            title={
              <Typography variant="body1" component="span">
                tooltiptext here long more text if lala land hej mer text
              </Typography>
            }
          >
            <button
              onClick={handleClick(name)}
              className={classnames({
                scenariobutton: true,
                active: selected === name,
              })}
            >
              <Typography variant="body1">{translatekey(name)}</Typography>
            </button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
