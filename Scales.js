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

export const Keys = {
    Major: {

        C: {
            chords: ["C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G", "A", "B"],
        },

        CSharp: {
            chords: ["CSharp", "DSharp", "ESharp", "FSharp", "GSharp", "ASharp", "BSharp", "CSharp", "DSharp", "ESharp", "FSharp", "GSharp", "ASharp", "BSharp"],
        },

        DFlat: {
            chords: ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C", "Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
        },

        D: {
            chords: ["D", "E", "FSharp", "G", "A", "B", "CSharp", "D", "E", "FSharp", "G", "A", "B", "CSharp"],
        },

        DSharp: {
            chords: ["DSharp", "ESharp", "FSharpSharp", "GSharp", "ASharp", "BSharp", "CSharpSharp", "DSharp", "ESharp", "FSharpSharp", "GSharp", "ASharp", "BSharp", "CSharpSharp"],
        },

        EFlat: {
            chords: ["Eb", "F", "G", "Ab", "Bb", "C", "D", "Eb", "F", "G", "Ab", "Bb", "C", "D"],
        },

        E: {
            chords: ["E", "FSharp", "GSharp", "A", "B", "CSharp", "DSharp", "E", "FSharp", "GSharp", "A", "B", "CSharp", "DSharp"],
        },

        F: {
            chords: ["F", "G", "A", "Bb", "C", "D", "E", "F", "G", "A", "Bb", "C", "D", "E"],
        },

        FSharp: {
            chords: ["FSharp", "GSharp", "ASharp", "B", "CSharp", "DSharp", "ESharp", "FSharp", "GSharp", "ASharp", "B", "CSharp", "DSharp", "ESharp"],
        },

        GFlat: {
            chords: ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F", "Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"],
        },

        G: {
            chords: ["G", "A", "B", "C", "D", "E", "FSharp", "G", "A", "B", "C", "D", "E", "FSharp"],
        },

        GSharp: {
            chords: ["GSharp", "ASharp", "BSharp", "CSharp", "DSharp", "ESharp", "FSharpSharp", "GSharp", "ASharp", "BSharp", "CSharp", "DSharp", "ESharp", "FSharpSharp"],
        },

        AFlat: {
            chords: ["Ab", "Bb", "C", "Db", "Eb", "F", "G", "Ab", "Bb", "C", "Db", "Eb", "F", "G"],
        },

        A: {
            chords: ["A", "B", "CSharp", "D", "E", "FSharp", "GSharp", "A", "B", "CSharp", "D", "E", "FSharp", "GSharp"],
        },

        ASharp: {
            chords: ["ASharp", "BSharp", "CSharpSharp", "DSharp", "ESharp", "FSharpSharp", "GSharpSharp", "ASharp", "BSharp", "CSharpSharp", "DSharp", "ESharp", "FSharpSharp", "GSharpSharp"],
        },

        BFlat: {
            chords: ["Bb", "C", "D", "Eb", "F", "G", "A", "Bb", "C", "D", "Eb", "F", "G", "A"],
        },

        B: {
            chords: ["B", "CSharp", "DSharp", "E", "FSharp", "GSharp", "ASharp", "B", "CSharp", "DSharp", "E", "FSharp", "GSharp", "ASharp"],
        }
    },
    Minor: {}
}


export const Preset = {
    Major: {
        intervals: [0, 3, 4]
    },
    MajorMinor: {
        intervals: [0, 5, 3, 4]
    },
    BluesTwelve: {
        intervals: [7, 7, 7, 7, 10, 10, 7, 7, 11, 10, 7, 11]
    }
}


export const ChordSet = {
    Easy: {
        chords1: ["DMajor", "AMajor"],
        chords2: ["DMajor", "EMajor"],
        chords3: ["DMajor", "GMajor"]
    },

    Medium: {
        chords1: ["AMinor", "EMajor"],
        chords2: ["GMajor", "EMinor"],
        chords3: ["CMajor", "AMinor"]
    },

    Hard: {
        chords1: ["FMajor", "DMajor"],
        chords2: ["GMajor", "DMinor"],
        chords3: ["BDim", "FMajor"]
    }
}