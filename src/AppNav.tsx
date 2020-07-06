import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
} from "@material-ui/core";
import { Language, ShoppingBasket } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    position: "absolute",
    width: 250,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  menuBar: {
    marginBottom: "20px",
  },
  mainContent: {
    textAlign: "left",
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function AppNav() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [region, setRegion] = React.useState(false);
  const [regionalPrice, setRegionalPrice] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegion = (ev: any) => {
    console.log(ev.target.textContent);
    const location = ev.target.textContent;
    let price: any;
    switch (location) {
      case "USA":
        price = "35 USD";
        break;
      case "EU":
        price = "35 EUR";
        break;
      default:
        price = "35 GBP";
    }
    setRegion(location);
    setRegionalPrice(price);
    handleClose();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Change country</h2>
      <div id="simple-modal-description">
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button onClick={handleRegion}>
            <ListItemIcon>
              <Language />
            </ListItemIcon>
            <ListItemText primary="UK" />
          </ListItem>
          <ListItem button onClick={handleRegion}>
            <ListItemIcon>
              <Language />
            </ListItemIcon>
            <ListItemText primary="USA" />
          </ListItem>
          <ListItem button onClick={handleRegion}>
            <ListItemIcon>
              <Language />
            </ListItemIcon>
            <ListItemText primary="EU" />
          </ListItem>
        </List>
      </div>
    </div>
  );

  return (
    <div>
      <AppBar className={classes.menuBar} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Stich & Story
          </Typography>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleOpen}
          >
            <Language />
          </IconButton>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <ShoppingBasket />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <div className={classes.mainContent}>
          <p>Region: {region || "UK"}</p>
          <p>Price: {regionalPrice || "35 GBP"}</p>
        </div>
      </Container>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
    </div>
  );
}

export default AppNav;
