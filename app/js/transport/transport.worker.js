self.state = {
    intervalDuration: 0,
    interval: null,
    beatCount: 0,
    maxBeatCount: 31
};

self.onmessage = e => {
    switch (e.data.action) {
        case "TRANSPORT_START":
            self.state.interval = setInterval(
                self.tick,
                self.state.intervalDuration
            );
            break;
        case "TRANSPORT_STOP":
            break;
        case "SET_BPM":
            self.state.intervalDuration = ((60 / e.data.bpm) * 1000) / 8;
            break;
        default:
            break;
    }
};

self.tick = () => {
    postMessage({
        event: "TRANSPORT_TICK",
        beatCount: self.state.beatCount
    });

    if (self.state.beatCount < self.state.maxBeatCount) {
        self.state.beatCount++;
    } else {
        self.state.beatCount = 0;
    }
};
