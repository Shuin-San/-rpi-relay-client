import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Grid, TextField, Card, CardContent, CardActions, Typography, LinearProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        margin: 10
    },
    media: {
        height: 140,
    },
    active : {
        color : '#02c39a'
    },
    inactive : {
        color : '#e63946'
    }
});

const PumpComponent = props => {
    const [runtime, setRuntime] = useState(1000);
    const classes = useStyles();

    const handleRuntimeChange = (e) => {
        setRuntime(e.value);
    };

    const managePump = (e) => {
        const pumpId = e.currentTarget.id;
        props.socket.emit('managePump', pumpId, runtime);
        props.socket.on('managePump', (data) => {
            props.setPumps(data);
        });
        setTimeout(function () {
            props.socket.disconnect()
        }, runtime + 1000, props.socket);
    };

    useEffect(() => {
        console.log(props.pumps)
    }, [props]);

    const {name, id, pinStatus, running} = props.pumps

    return (
        <Grid item sm={6} xs={12} lg={4} xl={4}>
            <Card className={classes.root}>
                <CardContent>
                    <h4>{name}</h4>
                    <Typography variant="body2" color="textSecondary" component="p">

                            Status :
                        <span className={pinStatus === 0 ? classes.active : classes.inactive} >
                            {' '}{pinStatus === 0 ? 'Active' : 'Inactive'}
                        </span>
                        {pinStatus === 0 ? <LinearProgress /> : ''}
                    </Typography>
                <hr/>
                    <TextField id={props.id} onChange={(e)=> {handleRuntimeChange(e.target)}} value={runtime} label={`Pump Run Time`}/>

                </CardContent>
                <CardActions>
                    <Button color={"primary"} onClick={managePump} id={props.id} >
                        Water Pots
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

PumpComponent.propTypes = {
    id : PropTypes.number,
    running : PropTypes.bool,
    start : PropTypes.func,
    setStart : PropTypes.func
};

export default PumpComponent;