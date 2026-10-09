(() => {
    const player = document.querySelector(".music-player");
    const playButton = player.querySelector(".music-play");
    const muteButton = player.querySelector(".music-mute");
    const status = player.querySelector(".music-status");
    const labels = {
        en: { player: "Imperial hymn player", play: "Play hymn", pause: "Pause hymn", mute: "Mute hymn", unmute: "Unmute hymn", ready: "Click to play", playing: "Playing", paused: "Paused", muted: "Muted", loading: "Preparing music…", unavailable: "Music is unavailable" },
        "zh-CN": { player: "帝皇圣歌播放器", play: "播放圣歌", pause: "暂停圣歌", mute: "静音", unmute: "取消静音", ready: "点击播放", playing: "播放中", paused: "已暂停", muted: "已静音", loading: "准备音乐…", unavailable: "暂时无法播放音乐" },
        ja: { player: "帝皇の聖歌プレーヤー", play: "聖歌を再生", pause: "聖歌を一時停止", mute: "ミュート", unmute: "ミュート解除", ready: "クリックして再生", playing: "再生中", paused: "一時停止", muted: "ミュート中", loading: "音楽を準備中…", unavailable: "音楽を再生できません" }
    };
    const storageKey = "hukai-hymn-muted";
    let muted = false;
    try {
        muted = localStorage.getItem(storageKey) === "true";
    } catch {
        muted = false;
    }
    let context;
    let gain;
    let source;
    let buffer;
    let rendering;
    let failed = false;
    let hasPlayed = false;
    let resumeOnReturn = false;

    function update() {
        const text = labels[document.documentElement.lang] || labels.en;
        const playing = Boolean(source && context.state === "running");
        player.setAttribute("aria-label", text.player);
        playButton.setAttribute("aria-label", playing ? text.pause : text.play);
        playButton.title = playing ? text.pause : text.play;
        muteButton.setAttribute("aria-label", muted ? text.unmute : text.mute);
        muteButton.title = muted ? text.unmute : text.mute;
        muteButton.setAttribute("aria-pressed", String(muted));
        playButton.querySelector(".icon-play").hidden = playing;
        playButton.querySelector(".icon-pause").hidden = !playing;
        muteButton.querySelector(".icon-sound").hidden = muted;
        muteButton.querySelector(".icon-muted").hidden = !muted;
        playButton.disabled = failed;
        muteButton.disabled = failed;
        let state = "ready";
        if (hasPlayed) state = "paused";
        if (playing) state = muted ? "muted" : "playing";
        if (!buffer) state = "loading";
        if (failed) state = "unavailable";
        status.textContent = text[state];
    }

    function fail() {
        failed = true;
        update();
    }

    function startSource() {
        if (!buffer || context.state !== "running") {
            update();
            return;
        }
        if (!source) {
            source = context.createBufferSource();
            source.buffer = buffer;
            source.loop = true;
            source.connect(gain);
            source.start();
        }
        hasPlayed = true;
        update();
    }

    function initialize() {
        if (rendering) return rendering;
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        context = new AudioContextClass();
        gain = context.createGain();
        gain.gain.value = muted ? 0 : 0.2;
        gain.connect(context.destination);
        context.addEventListener("statechange", update);
        rendering = window.createImperialHymn().then(hymn => {
            buffer = hymn;
            startSource();
        }).catch(fail);
        return rendering;
    }

    function play() {
        try {
            const ready = initialize();
            // resume() runs in the click handler too, satisfying autoplay policies.
            context.resume().then(() => ready.then(startSource)).catch(update);
        } catch {
            fail();
        }
    }

    playButton.addEventListener("click", () => {
        if (source && context.state === "running") {
            context.suspend().then(update).catch(fail);
        } else {
            play();
        }
    });
    muteButton.addEventListener("click", () => {
        muted = !muted;
        if (gain) gain.gain.setTargetAtTime(muted ? 0 : 0.2, context.currentTime, 0.02);
        try {
            localStorage.setItem(storageKey, String(muted));
        } catch {
            // The current page still honors mute when browser storage is blocked.
        }
        update();
    });
    new MutationObserver(update).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    window.addEventListener("pagehide", () => {
        resumeOnReturn = Boolean(context && context.state === "running");
        if (context) context.suspend().catch(update);
    });
    window.addEventListener("pageshow", event => {
        if (event.persisted && resumeOnReturn) play();
    });
    player.hidden = false;
    play();
    update();
})();
