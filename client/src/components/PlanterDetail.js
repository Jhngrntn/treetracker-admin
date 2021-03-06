import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Drawer from '@material-ui/core/Drawer'
import Close from "@material-ui/icons/Close";
import Person from "@material-ui/icons/Person";
import Divider from "@material-ui/core/Divider";
import api from '../api/planters';
import { getDateTimeStringLocale } from '../common/locale';

const useStyle = makeStyles(theme => ({
  root: {
    width: 441,
  },
  box: {
    padding: theme.spacing(4),
  },
  cardMedia: {
    height: "378px",
  },
  personBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
    height: "100%",
  },
  person: {
    height: 180,
    width: 180,
    fill: "gray",
  },
  name: {
    textTransform: "capitalize",
  },
}));

function PlanterDetail(props){
  
  const [planterRegistration, setPlanterRegistration] = React.useState(null)
  const classes = useStyle();
  const {planter} = props;

  React.useEffect(() => {
    if (planter && planter.id && (!planterRegistration || planterRegistration.planterId !== planter.id)) {
      setPlanterRegistration(null)
      api.getPlanterRegistrations(planter.id).then(registrations => {
        if (registrations && registrations.length) {
          setPlanterRegistration(registrations[0])
        }
      })
    }
  }, [planter, planterRegistration])

  return(
    <Drawer anchor="right" open={props.open} onClose={props.onClose}>
      <Grid className={classes.root} >
        <Grid container direction="column">
          <Grid item>
            <Grid container justify="space-between" alignItems="center" >
              <Grid item>
                <Box m={4} >
                  <Typography color="primary" variant="h6" >
                    Planter Detail
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <IconButton onClick={() => props.onClose()}>
                  <Close />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>

            {planter.imageUrl &&
              <CardMedia className={classes.cardMedia} image={planter.imageUrl} />
            }
            {!planter.imageUrl &&
              <CardMedia className={classes.cardMedia} >
                <Grid container className={classes.personBox} >
                  <Person className={classes.person} />
                </Grid>
              </CardMedia>
            }
          </Grid>
          <Grid item className={classes.box} >
            <Typography variant="h5" color="primary" className={classes.name} >{planter.firstName} {planter.lastName}</Typography>
            <Typography variant="body2">ID:{planter.id}</Typography>
          </Grid>
          <Divider/>
          <Grid container direction="column" className={classes.box}>
            <Typography variant="subtitle1" >Email address</Typography>
            <Typography variant="body1" >{planter.email || "---"}</Typography>
          </Grid>
          <Divider/>
          <Grid container direction="column" className={classes.box}>
            <Typography variant="subtitle1" >Phone number</Typography>
            <Typography variant="body1" >{planter.phone || "---"}</Typography>
          </Grid>
          <Divider/>
          <Grid container direction="column" className={classes.box}>
            <Typography variant="subtitle1" >Person ID</Typography>
            <Typography variant="body1" >{planter.personId || "---"}</Typography>
          </Grid>
          <Divider/>
          <Grid container direction="column" className={classes.box}>
            <Typography variant="subtitle1" >Organization</Typography>
            <Typography variant="body1" >{planter.organization || "---" }</Typography>
          </Grid>
          <Divider />
          <Grid container direction="column" className={classes.box}>
            <Typography variant="subtitle1" >Organization ID</Typography>
            <Typography variant="body1" >{planter.organizationId || "---"}</Typography>
          </Grid>
          <Divider />
          <Grid container direction="column" className={classes.box}>
            <Typography variant="subtitle1" >Registered</Typography>
            <Typography variant="body1" >
              {(planterRegistration && getDateTimeStringLocale(planterRegistration.createdAt)) || "---"}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  )
}

export default (PlanterDetail)