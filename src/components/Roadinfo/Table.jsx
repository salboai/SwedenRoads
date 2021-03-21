import React from "react";
import { Box, Typography } from "@material-ui/core";
import { translate, translatekey, datestr } from "./translate";
import Svgcircle from "./Svgcircle";
import InfoDialog from "../InfoDialog";
import { descriptions } from "./descriptions";

function Row(props) {
  return (
    <Box
      py={1}
      px={2}
      bgcolor={props.colored ? "#F4F4F2" : "#ffffff"}
      display="flex"
      justifyContent="space-between"
    >
      <InfoDialog label={props.l} description={descriptions[props.name]} />
      <Typography variant="body1" component="span" align="right">
        {props.r}
      </Typography>
    </Box>
  );
}

const palette = ["#C40A3B", "#F2203E", "#FABF20", "#71C94B", "#20AC65", "#ccc"];

export default function Table({ p }) {
  return (
    <Box>
      <Row
        name="TllstnI"
        l={translatekey("TllstnI")}
        r={`${p.TllstnI}%`}
        colored
      />
      <Row
        name="IndxKls"
        l={translatekey("IndxKls")}
        r={
          <Box display="flex">
            <Svgcircle color={palette[p.IndxKls - 1]} />
            {translate("IndxKls", p.IndxKls)}
          </Box>
        }
      />
      <Row
        name="IndK2030"
        l={translatekey("IndK2030")}
        r={
          <Box display="flex">
            <Svgcircle color={palette[p.IndK2030 - 1]} />
            {translate("IndxKls", p.IndK2030)}
          </Box>
        }
        colored
      />
      <Row
        name="IKls_2"
        l={translatekey("IKls_2")}
        r={
          <Box display="flex">
            <Svgcircle color={palette[p.IKls_2 - 1]} />
            {translate("IndxKls", p.IKls_2)}
          </Box>
        }
      />
      <Row
        name="IKls_3"
        l={translatekey("IKls_3")}
        r={
          <Box display="flex">
            <Svgcircle color={palette[p.IKls_3 - 1]} />
            {translate("IndxKls", p.IKls_3)}
          </Box>
        }
        colored
      />
      <Row name="Spårdjp" l={translatekey("Spårdjp")} r={`${p.Spårdjp} mm`} />
      <Row
        name="Sprdjp_"
        l={translatekey("Sprdjp_")}
        r={`${p.Sprdjp_} mm`}
        colored
      />
      <Row name="IRI" l={translatekey("IRI")} r={`${p.IRI} mm/m`} />
      <Row
        name="IRI_ndr"
        l={translatekey("IRI_ndr")}
        r={`${p.IRI_ndr} mm/m`}
        colored
      />
      <Row
        name="Mätdatm"
        l={translatekey("Mätdatm")}
        r={datestr(p.Myear, p.Mmonth, p.Mday)}
      />
      <Row
        name="Blggnngst"
        l={translatekey("Blggnngst")}
        r={translate("Blggnngst", p.Blggnngst)}
        colored
      />
      <Row
        name="Blggnngsd"
        l={translatekey("Blggnngsd")}
        r={datestr(p.Byear, p.Bmonth, p.Bday)}
      />
      <Row name="Ålder" l={translatekey("Ålder")} r={`${p.Ålder} år`} colored />
      <Row name="FrvntdL" l={translatekey("FrvntdL")} r={`${p.FrvntdL} år`} />
      <Row
        name="Län_nr"
        l={translatekey("Län_nr")}
        r={translate("Län_nr", p.Län_nr)}
        colored
      />
      <Row
        name="Kmmn_nr"
        l={translatekey("Kmmn_nr")}
        r={translate("Kmmn_nr", p.Kmmn_nr)}
      />

      <Row
        name="Vägnmmr"
        l={translatekey("Vägnmmr")}
        r={`${p.Vägnmmr}`}
        colored
      />
      <Row
        name="Vägktgr"
        l={translatekey("Vägktgr")}
        r={translate("Vägktgr", p.Vägktgr)}
      />
      <Row
        name="Vägtyp"
        l={translatekey("Vägtyp")}
        r={translate("Vägtyp", p.Vägtyp)}
        colored
      />
      <Row
        name="ÅDT_frd"
        l={`${translatekey("ÅDT_frd")} (år ${p.ÅDT_mtr})`}
        r={`${p.ÅDT_frd} fordon/dygn`}
      />
      <Row
        name="ÅDT_tng"
        l={`${translatekey("ÅDT_tng")} (år ${p.ÅDT_mtr})`}
        r={`${p.ÅDT_tng} fordon/dygn`}
        colored
      />
      <Row
        name="Brghtsk"
        l={translatekey("Brghtsk")}
        r={translate("Brghtsk", p.Brghtsk)}
      />
      <Row
        name="Hastght"
        l={translatekey("Hastght")}
        r={`${p.Hastght} km/h`}
        colored
      />

      <Row
        name="DoU2017"
        l={translatekey("DoU2017")}
        r={translate("DoU2017", p.DoU2017)}
      />
      <Row
        name="Vägbrdd"
        l={translatekey("Vägbrdd")}
        r={`${p.Vägbrdd} m`}
        colored
      />
      <Row name="Längd" l={translatekey("Längd")} r={`${p.Längd} m`} />
    </Box>
  );
}
