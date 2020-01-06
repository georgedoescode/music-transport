self.state = {
    intervalDuration: 0,
    beatCount: 0,
    maxBeatCount: 15
};

self.onmessage = e => {
    switch (e.data.action) {
        case "TRANSPORT_START":
            self.tick();
            break;
        case "TRANSPORT_STOP":
            break;
        case "SET_BPM":
            self.state.intervalDuration = ((60 / e.data.bpm) * 1000) / 4;
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

    setTimeout(self.tick, self.state.intervalDuration)
};
