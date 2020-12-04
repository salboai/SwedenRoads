import React from "react";
import {
  Container,
  Divider,
  Drawer,
  Typography,
  Button,
  Box,
  Grid,
} from "@material-ui/core";
import MapillaryBox from "./MapillaryBox";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function isnotempty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return true;
  }
  return false;
}

const palette = ["#FF0000", "#FF8000", "#FFFF00", "#9FCC00", "#00CC00"];

const T = (props) => {
  return (
    <Typography variant="body1" {...props}>
      {props.children}
    </Typography>
  );
};
function Row(props) {
  return (
    <TableRow
      style={
        props.colored ? { background: "lightblue" } : { background: "white" }
      }
    >
      <TableCell component="th" scope="row">
        <T>{props.l}</T>
      </TableCell>
      <TableCell align="right">
        <T>{props.r}</T>
      </TableCell>
    </TableRow>
  );
}

function datestr(y, m, d) {
  let month = m < 10 ? `0${m}` : `${m}`;
  let day = d < 10 ? `0${d}` : `${d}`;
  return `${y}-${month}-${day}`;
}

export default function InfoDrawer(props) {
  const road = props.roadproperties;
  const open = isnotempty(road);
  const imageexist = props.images.length > 0;
  const imagekey = imageexist && props.images[0].properties.key;
  const imagecapturedate = imageexist && props.images[0].properties.captured_at;

  return (
    <Drawer variant="persistent" anchor="left" open={open}>
      <Box my={2} style={{ width: "50vv" }}>
        <Container>
          <Box width="640px" height="480px">
            {imageexist ? (
              <>
                <MapillaryBox imagekey={imagekey} />
                <Typography variant="body2" align="center">
                  Image captured {imagecapturedate.slice(0, 10)}
                </Typography>
              </>
            ) : (
              <Typography align="center">
                No image at this location (150m radius).
              </Typography>
            )}
          </Box>
          <Box my={4}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Egenskap</TableCell>
                    <TableCell align="right">Klassifikation</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <Row
                    colored
                    l="Indexklass"
                    r={translate("IndxKls", road.IndxKls)}
                  />
                  {/*<Row l="ID" r={road.id} />*/}
                  <Row
                    l="Bärighetsklass"
                    r={translate("Brghtsk", road.Brghtsk)}
                  />
                  <Row
                    colored
                    l="Drift och underhållsklass"
                    r={translate("DoU2017", road.DoU2017)}
                  />
                  <Row
                    l="Beläggningstyp"
                    r={translate("Blggnngst", road.Blggnngst)}
                  />
                  <Row
                    colored
                    l="Vägkategori"
                    r={translate("Vägktgr", road.Vägktgr)}
                  />
                  <Row l="Vägtyp" r={translate("Vägtyp", road.Vägtyp)} />
                  <Row
                    colored
                    l="Region"
                    r={translate("Region", road.Region)}
                  />
                  <Row l="Längd" r={`${road.Längd} m`} />
                  <Row colored l="Spårdjup" r={`${road.Spårdjp} mm`} />
                  <Row l="Spårdjup underhållsstandard" r={`${road.Sprdjp_}`} />
                  <Row colored l="IRI" r={`${road.IRI} mm/m`} />
                  <Row l="IRI underhållsstandard" r={`${road.IRI_ndr}`} />
                  <Row
                    colored
                    l="Mätdatum"
                    r={datestr(road.Myear, road.Mmonth, road.Mday)}
                  />
                  <Row
                    l="Beläggningsdatum"
                    r={datestr(road.Byear, road.Bmonth, road.Bday)}
                  />
                  <Row
                    colored
                    l="Ålder"
                    r={`${road.Ålder} år (mätt år 2020)`}
                  />
                  <Row l="Förväntad Livslängd" r={`${road.FrvntdL} år`} />
                  <Row
                    colored
                    l="Återstående Livslängd"
                    r={`${road.ÅtrstnL} år`}
                  />
                  <Row
                    l="Medeltrafik (alla fordon)"
                    r={`${road.ÅDT_frd} fordon/dygn (mätt år ${road.ÅDT_mtr})`}
                  />
                  <Row
                    colored
                    l="Medeltrafik (tunga fordon)"
                    r={`${road.ÅDT_tng} fordon/dygn (mätt år ${road.ÅDT_mtr})`}
                  />
                  <Row l="Hastighetsbegränsning" r={`${road.Hastght} km/h`} />
                  <Row colored l="Vägbredd" r={`${road.Vägbrdd} m`} />
                  <Row l="Län nr" r={`${road.Län_nr}`} />
                  <Row colored l="Kommun nr" r={`${road.Kmmn_nr}`} />
                  <Row l="Väg nr" r={`${road.Vägnmmr}`} />
                  <Row colored l="Trafikklass" r={`${road.Trfkkls}`} />
                  <Row l="Tillstånd" r={`${road.TllstnI}%`} />
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </Box>
    </Drawer>
  );
}

function translate(name, x) {
  return translation[name][x] || x;
}

const translation = {
  Brghtsk: {
    1: "max bruttovikt 64 ton",
    2: "max bruttovikt 51.4 ton",
    3: "max bruttovikt 37.5 ton",
    4: "max bruttovikt 74 ton",
    5: "max bruttovikt 74 ton",
  },
  DoU2017: {
    1: "Vägar i storstadsområden",
    2: "Vägar som bildar större sammanhängande stråk",
    3: "Vägar för dagliga resor och arbetspendling",
    4: "Övriga för näringslivet viktiga vägar",
    5: "Vägar som är viktiga för landsbygden",
    6: "Lågtrafikerade vägar",
  },
  Blggnngst: {
    1: "Varm",
    2: "Försegling",
    3: "Halvvarm",
    4: "Indränkt i makadam",
    5: "Tunnskikt",
    6: "Varm stenrik",
    7: "Ytbehandling på bituminöst underlag",
    8: "Ytbehandling på grus",
    9: "Övrigt",
  },
  Vägktgr: {
    1: "Europaväg",
    2: "Riksväg",
    3: "Primär länsväg",
    4: "Sekundär länsväg",
  },
  Vägtyp: {
    1: "2+1 väg",
    2: "4-fälts väg",
    3: "Motorväg",
    4: "Vanlig väg",
    5: "Motortrafikled",
  },
  Region: {
    1: "Mitt",
    2: "Nord",
    3: "Öst",
    4: "Stockholm",
    5: "Syd",
    6: "Väst",
  },
  IndxKls: {
    1: "Mycket dålig",
    2: "Dålig",
    3: "Tillfredsställande",
    4: "Bra",
    5: "Mycket bra",
  },
};
