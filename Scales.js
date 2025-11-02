export const Scales = {
    Major: {
        None: {
            notes: []
        },

        C: {
            notes: ["C", "D", "E", "F", "G", "A", "B"],
        },

        CSharp: {
            notes: ["C#", "D#", "E#", "F#", "G#", "A#", "B#"],
        },

        DFlat: {
            notes: ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
        },

        D: {
            notes: ["D", "E", "F#", "G", "A", "B", "C#"],
        },

        DSharp: {
            notes: ["D#", "E#", "F##", "G#", "A#", "B#", "C##"],
        },

        EFlat: {
            notes: ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
        },

        E: {
            notes: ["E", "F#", "G#", "A", "B", "C#", "D#"],
        },

        F: {
            notes: ["F", "G", "A", "Bb", "C", "D", "E"],
        },

        FSharp: {
            notes: ["F#", "G#", "A#", "B", "C#", "D#", "E#"],
        },

        GFlat: {
            notes: ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"],
        },

        G: {
            notes: ["G", "A", "B", "C", "D", "E", "F#"],
        },

        GSharp: {
            notes: ["G#", "A#", "B#", "C#", "D#", "E#", "F##"],
        },

        AFlat: {
            notes: ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
        },

        A: {
            notes: ["A", "B", "C#", "D", "E", "F#", "G#"],
        },

        ASharp: {
            notes: ["A#", "B#", "C##", "D#", "E#", "F##", "G##"],
        },

        BFlat: {
            notes: ["Bb", "C", "D", "Eb", "F", "G", "A"],
        },

        B: {
            notes: ["B", "C#", "D#", "E", "F#", "G#", "A#"],
        }
    },
    Minor: {}
}


export const Preset = {
    Major:{
        intervals:[0, 3, 4]
    },
    MajorMinor:{
        intervals:[0, 5, 3, 4]
    },
    BluesTwelve:{
        intervals:[0, 0, 0, 0, 3, 3, 0, 0, 4, 3, 0, 4]
    }
}