import React from "react";
import { Box, Typography } from "@material-ui/core";
import { translate, datestr } from "./translate";
import Svgcircle from "./Svgcircle";

function Row(props) {
  return (
    <Box
      py={1}
      px={2}
      bgcolor={props.colored ? "#F4F4F2" : "#ffffff"}
      display="flex"
      justifyContent="space-between"
    >
      <Typography variant="body1" component="span">
        {props.l}
      </Typography>
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
        l="Klassifikation"
        r={
          <Box display="flex">
            <Svgcircle color={palette[p.IndxKls - 1]} />
            {translate("IndxKls", p.IndxKls)}
          </Box>
        }
      />
      <Row
        l="Klassifikation2030"
        r={
          <Box display="flex">
            <Svgcircle color={palette[p.IndK2030 - 1]} />
            {translate("IndxKls", p.IndK2030)}
          </Box>
        }
        colored
      />
      <Row l="Kategori" r={translate("Vägktgr", p.Vägktgr)} />
      <Row l="Vägtyp" r={translate("Vägtyp", p.Vägtyp)} colored />
      <Row l="Hastighetsbegränsning" r={`${p.Hastght} km/h`} />
      <Row l="Tillstånd" r={`${p.TllstnI}%`} colored />
      <Row l="Bärighet" r={translate("Brghtsk", p.Brghtsk)} />
      <Row l="Beläggning" r={translate("Blggnngst", p.Blggnngst)} colored />
      <Row l="Drift och underhållsklass" r={translate("DoU2017", p.DoU2017)} />
      <Row l="Trafikklass" r={`${p.Trfkkls}`} colored />
      <Row l="IRI underhållsstandard" r={`${p.IRI_ndr}`} />
      <Row l="Spårdjup underhållsstandard" r={`${p.Sprdjp_}`} colored />
      <Row l="Spårdjup" r={`${p.Spårdjp} mm`} />
      <Row l="Ålder (år 2020)" r={`${p.Ålder} år`} colored />
      <Row l="Återstående Livslängd" r={`${p.ÅtrstnL} år`} />
      <Row l="Förväntad Livslängd" r={`${p.FrvntdL} år`} colored />
      <Row l="Längd vägsträcka" r={`${p.Längd} m`} />
      <Row
        l={`Tunga fordon (år ${p.ÅDT_mtr})`}
        r={`${p.ÅDT_tng} fordon/dygn`}
        colored
      />
      <Row l={`Alla fordon (år ${p.ÅDT_mtr})`} r={`${p.ÅDT_frd} fordon/dygn`} />
      <Row l="IRI" r={`${p.IRI} mm/m`} colored />
      <Row l="Vägbredd" r={`${p.Vägbrdd} m`} />
      <Row
        l="Beläggningsdatum"
        r={datestr(p.Byear, p.Bmonth, p.Bday)}
        colored
      />
      <Row l="Mätdatum" r={datestr(p.Myear, p.Mmonth, p.Mday)} />
      <Row l="Vägnummer" r={`${p.Vägnmmr}`} colored />
      <Row l="Län" r={translate("Län_nr", p.Län_nr)} />
      <Row l="Kommun" r={translate("Kmmn_nr", p.Kmmn_nr)} colored />
      <Row l="Region" r={translate("Region", p.Region)} />
    </Box>
  );
}
