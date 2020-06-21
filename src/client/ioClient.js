import React, { useEffect, useState } from "react";
import {Grid, CircularProgress} from '@material-ui/core';
import socketIOClient from "socket.io-client";
import PumpComponent from "./pumpStatus/PumpComponent";
const ENDPOINT = "http://192.168.0.100:4001";

export default function ClientComponent(props) {
    const [pumps, setPumps] = useState([]);
    const [pin, setPin] = useState(false);

    const socket = socketIOClient(ENDPOINT);

    function fetchCurrentStatus(){

        socket.emit('getPumps', '');
        socket.on('getPumps', (pumpData) => {
            setPumps(pumpData);
        });
        // setTimeout(function () {
        //     socket.disconnect()
        // }, 5000, socket);
    }

    useEffect(() => {
        fetchCurrentStatus();
        console.log(`Pumps Updated !`);
        }, []);

    return (
            <Grid container>
                {
                    pumps && pumps.length > 0 ?
                        pumps.map(
                            ({id, pinStatus, runtime}) =>
                                <PumpComponent id={id} pinStatus={pinStatus} setPumps={setPumps} pumps={pumps[id]} socket={socket} runtime={runtime}/>
                            ) : <CircularProgress />

                }

            </Grid>
    );
}