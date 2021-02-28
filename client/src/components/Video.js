import { useLocation } from "react-router-dom";
import RoomIdDisplay from './RoomIdDisplay'
import ReactPlayer from 'react-player/lazy'
import { useEffect, useState, useRef } from 'react';
import { v4 as uuid } from 'uuid'
import socketIOClient from "socket.io-client";
// import VideoPlayer from './VideoPlayer'

import '../Chat.css'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
const ENDPOINT = `/`

// const ENDPOINT = `http://localhost:8000`


function Video() {
    const location = useLocation();
    const [videoID, setVideoID] = useState("");
    const [keyword, setKeyword] = useState("");
    const [theatreStarted, toggleTheatreStarted] = useState(false);
    const [roomId, setRoomId] = useState("");
    const [messages, setMessages] = useState([]);
    const currentMsg = useRef("");
    const socketRef = useRef();
    const [theatreName, setTheatreName] = useState("");
    const [playing, setPlaying] = useState(true);
    const [url, setUrl] = useState(null);
    const [summary, setSummary] = useState("");
    const [timestamps, setTimestamps] = useState([])



    useEffect(() => {
        setVideoID(location.state.videoID);
        console.log("Video is ", `https://www.youtube.com/watch?v=${location.state.videoID}`)
        setUrl(`https://www.youtube.com/watch?v=${location.state.videoID}`)
        console.log("Recieved video ID : ", location.state.videoID);

        socketRef.current = socketIOClient.connect(ENDPOINT);
        socketRef.current.on("chatToClient", data => {
            console.log("Recieved chat message from server : ", data);
            // var newChats = messages;
            // newChats.push(data);
            // setMessages(newChats)
            // console.log("Now messages are :: ", newChats)
            setMessages((oldChats) => [
                ...oldChats, data,
            ])
        });

        socketRef.current.on("playVideo", () => {
            console.log("Playing videos")
            setPlaying(true);
        })
        socketRef.current.on("pauseVideo", () => {
            console.log("Pausing videos")
            setPlaying(false);
        })

        socketRef.current.on("resetVideo", () => {
            var newUrl = `https://www.youtube.com/watch?v=${location.state.videoID}&t=0s`;
            console.log("New URL : ", newUrl)
            setUrl(newUrl)
        })

    }, [])

    function handleMsgSend() {
        const data = {
            msg: currentMsg.current.value,
            from: window.$name,
            roomId: window.$roomId
        }
        socketRef.current.emit("chatToServer", data)

    }

    function handleCreateTheatre(e) {
        const ID = uuid();
        setRoomId(ID);
        toggleTheatreStarted(true);
        window.$roomId = ID;
        socketRef.current.emit("join room", ID);
    }



    function handleJoinTheatre(e) {
        toggleTheatreStarted(true);
        setRoomId(theatreName);
        window.$roomId = theatreName;
        socketRef.current.emit("join room", theatreName)
    }

    function theatreNameChange(e) {
        setTheatreName(e.target.value);
    }


    function handleKeywordChange(e) {
        setKeyword(e.target.value);
    }

    async function searchKeyword(e) {
        if (keyword === "") return;
        code for searching keyword
        var url = `http://captionapi.herokuapp.com/?video_id=${videoID}&keyword=${keyword}`;
        console.log(url)
        const data = await fetch(url).then(res => res.json()).then(res => res).catch(e => console.log(e));
        console.log("Keyword search result : ", data);
        setTimestamps(data)
//         setTimestamps(hardcode_timestamps)

    }

    async function getCaptions() {
        var url = `http://captionapi.herokuapp.com/?video_id=${videoID}&keyword=none`;
        console.log(url)
        const data = await fetch(url).then(res => res.json()).then(res => res).catch(e => console.log(e));
        console.log("Captions : ", data.text);
        return data.text;
        // setTimestamps(data)
    }

    async function getSummary(e) {
        // code for getting summary
        console.log("Getting summary...");
        const captions = await getCaptions();
        var url = `https://api-summary.herokuapp.com/`;
        const payload = {
            text: captions,

        }
        const body = JSON.stringify(payload)
        // console.log(body)
        const data = await fetch(url, { method: "POST", body: body }).then(res => res.json()).then(res => res).catch(e => console.log(e));
        console.log("Summary : ", data);
        setSummary(data.summary);
        

    }


    function playVideo() {
        socketRef.current.emit("playVideo", window.$roomId);
    }
    function pauseVideo() {
        socketRef.current.emit("pauseVideo", window.$roomId);
    }


    function togglePlay() {
        console.log("current playing : ", playing)
        const bool = !playing
        setPlaying(bool);
        if (bool) {
            playVideo();
        } else {
            pauseVideo();
        }
    }

    function handleTimestampList(e) {
        console.log("For timestamp : ", e.target.value);
        var time = Math.floor(e.target.value);
        var newUrl = `${url}&t=${time}s`;
        setUrl(newUrl)
    }


    return (
        <div >
            <Grid container xs={12} spacing={4}>
                <Grid item container xs={12} spacing={3} direction="row">
                    <Grid item xs={8} justify="center">
                        {url &&
                            <ReactPlayer
                                url={url}
                                playing={playing}
                                controls={true} />
                        }
                        <Button color="primary" onClick={togglePlay}>Toggle</Button>
                    </Grid>
                    <Grid item container xs={4} spacing={3} justify="center">
                        <Grid item container xs={12} spacing={3}>

                            {!theatreStarted &&
                                <Grid item container xs={12} spacing={4}>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={handleCreateTheatre}>
                                            Create a theatre
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label="Enter Theatre ID" id="standard-basic" onChange={theatreNameChange} />
                                        <Button
                                            color="secondary"
                                            variant="contained"
                                            onClick={handleJoinTheatre}>
                                            Enter Theatre
                                        </Button>
                                    </Grid>

                                </Grid>
                            }

                            {theatreStarted &&
                                <Grid item xs={12}>
                                    <RoomIdDisplay roomId={roomId} />
                                </Grid>
                            }

                            {theatreStarted &&
                                <Grid container item xs={12}>
                                    <Grid item xs={12} className="textChat">
                                        {messages && messages.map((message, index) => {
                                            // return (<div key={index} className="otherUserChat">{message.msg}</div>)
                                            if (message.from !== window.$name) {
                                                return <div key={index} className="otherUserChat">{message.msg}</div>
                                            } else {
                                                return <div key={index} className="currentUserChat">{message.msg}</div>
                                            }
                                        })}
                                        <input
                                            type="text"
                                            ref={currentMsg}
                                            label="Type your message"
                                        />
                                        <button onClick={handleMsgSend}>Send</button>
                                    </Grid>
                                </Grid>
                            }

                        </Grid>
                    </Grid>
                </Grid>
                {!theatreStarted &&
                    <Grid item container xs={12} direction="row" justify="center" alignItems="center">
                        <Grid item container xs={6}>
                            <Grid item container xs={12}>
                                <TextField onChange={handleKeywordChange} id="standard-basic" label="Standard" />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={searchKeyword}>
                                    Search keyword
                            </Button>
                            </Grid>
                            <Grid item container xs={12}>
                                {timestamps &&
                                    timestamps.map((timestamp, index) => {
                                        console.log(timestamp)
                                        return <div key={index}><button onClick={handleTimestampList} value={timestamp}>{timestamp}</button></div>
                                    })
                                }
                            </Grid>
                        </Grid>
                        <Grid item container xs={6} >
                            <Grid item container xs={12}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={getSummary}>
                                    Get summary of the video
                            </Button>
                            </Grid>
                            <Grid item container xs={12}>
                                {/* <TextField
                                    id="standard-read-only-input"
                                    label="Read Only"
                                    defaultValue=""
                                    value={summary}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                /> */}
                                <TextareaAutosize aria-label="empty textarea" placeholder="Empty" value={summary} />
                            </Grid>
                        </Grid>
                    </Grid>
                }
                {/* <Grid item container xs={12}>
                    <TextareaAutosize aria-label="empty textarea" placeholder="Empty" value={summary} />
                </Grid> */}

            </Grid>
        </div>
    );
}

export default Video;
