import React, { useState } from "react";
import "./scenariobuttons.css";
import { Typography } from "@material-ui/core";
import clsx from "clsx";
import { translatekey } from "../Roadinfo/translate";
import Tooltip from "../LightTooltip";
import { tooltiptext } from "./scenariobuttonstooltip";
import ReactMarkdown from "react-markdown";

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
                <ReactMarkdown>{tooltiptext[name]}</ReactMarkdown>
              </Typography>
            }
          >
            <button
              onClick={handleClick(name)}
              className={clsx({
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
