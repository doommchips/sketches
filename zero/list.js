var words = [
    {"word": "absolute", "syllables": 3},
    {"word": "zero", "syllables": 2},
    {"word": "is", "syllables": 1},
    {"word": "the", "syllables": 1},
    {"word": "lower", "syllables": 2},
    {"word": "limit", "syllables": 2},
    {"word": "of", "syllables": 1},
    {"word": "the", "syllables": 1},
    {"word": "thermodynamic", "syllables": 5},
    {"word": "temperature", "syllables": 4},
    {"word": "scale", "syllables": 2},
    {"word": "a", "syllables": 1},
    {"word": "state", "syllables": 1},
    {"word": "at", "syllables": 1},
    {"word": "which", "syllables": 1},
    {"word": "the", "syllables": 1},
    {"word": "enthalpy", "syllables": 3},
    {"word": "and", "syllables": 1},
    {"word": "entropy", "syllables": 3},
    {"word": "of", "syllables": 1},
    {"word": "a", "syllables": 1},
    {"word": "cooled", "syllables": 1},
    {"word": "ideal", "syllables": 3},
    {"word": "gas", "syllables": 1},
    {"word": "reach", "syllables": 1},
    {"word": "their", "syllables": 1},
    {"word": "minimum", "syllables": 3},
    {"word": "value", "syllables": 2},
    {"word": "taken", "syllables": 2},
    {"word": "as", "syllables": 1},
    {"word": "zero", "syllables": 2},
    {"word": "absolute", "syllables": 3},
    {"word": "zero", "syllables": 2},
    {"word": "is", "syllables": 1},
    {"word": "the", "syllables": 1},
    {"word": "point", "syllables": 1},
    {"word": "at", "syllables": 1},
    {"word": "which", "syllables": 1},
    {"word": "the", "syllables": 1},
    {"word": "fundamental", "syllables": 4},
    {"word": "particles", "syllables": 3},
    {"word": "of", "syllables": 1},
    {"word": "nature", "syllables": 2},
    {"word": "have", "syllables": 1},
    {"word": "minimal", "syllables": 3},
    {"word": "vibrational", "syllables": 4},
    {"word": "motion", "syllables": 2},
    {"word": "retaining", "syllables": 3},
    {"word": "only", "syllables": 1},
    {"word": "quantum", "syllables": 2},
    {"word": "mechanical", "syllables": 4},
    {"word": "zero-point", "syllables": 3},
    {"word": "energy-induced", "syllables": 5},
    {"word": "particle", "syllables": 3},
    {"word": "motion", "syllables": 2},
    {"word": "the", "syllables": 1},
    {"word": "theoretical", "syllables": 5},
    {"word": "temperature", "syllables": 4},
    {"word": "is", "syllables": 1},
    {"word": "determined", "syllables": 3},
    {"word": "by", "syllables": 1},
    {"word": "extrapolating", "syllables": 5},
    {"word": "the", "syllables": 1},
    {"word": "ideal", "syllables": 3},
    {"word": "gas", "syllables": 1},
    {"word": "law", "syllables": 1},
    {"word": "by", "syllables": 1},
    {"word": "international", "syllables": 5},
    {"word": "agreement", "syllables": 3},
    {"word": "absolute", "syllables": 3},
    {"word": "zero", "syllables": 2},
    {"word": "is", "syllables": 1},
    {"word": "taken", "syllables": 2},
    {"word": "as", "syllables": 1},
    {"word": "on", "syllables": 1},
    {"word": "the", "syllables": 1},
    {"word": "Celsius", "syllables": 3},
    {"word": "scale", "syllables": 2},
    {"word": "international", "syllables": 5},
    {"word": "system", "syllables": 2},
    {"word": "of", "syllables": 1},
    {"word": "units", "syllables": 2},
    {"word": "which", "syllables": 1},
    {"word": "equates", "syllables": 2},
    {"word": "to", "syllables": 1},
    {"word": "on", "syllables": 1},
    {"word": "the", "syllables": 1},
    {"word": "scale", "syllables": 2},
    {"word": "the", "syllables": 1},
    {"word": "corresponding", "syllables": 4},
    {"word": "Kelvin", "syllables": 2},
    {"word": "and", "syllables": 1},
    {"word": "Rankine", "syllables": 2},
    {"word": "temperature", "syllables": 4},
    {"word": "scales", "syllables": 2},
    {"word": "set", "syllables": 1},
    {"word": "the", "syllables": 1},
    {"word": "their", "syllables": 1},
    {"word": "zero", "syllables": 2},
    {"word": "points", "syllables": 1},
    {"word": "at", "syllables": 1},
    {"word": "absolute", "syllables": 3},
    {"word": "zero", "syllables": 2},
    {"word": "by", "syllables": 1},
    {"word": "definition", "syllables": 4},
    {"word": "it", "syllables": 1},
    {"word": "is", "syllables": 1},
    {"word": "commonly", "syllables": 3},
    {"word": "thought", "syllables": 2},
    {"word": "of", "syllables": 1},
    {"word": "as", "syllables": 1},
    {"word": "the", "syllables": 1},
    {"word": "lowest", "syllables": 2},
    {"word": "temperature", "syllables": 4},
    {"word": "possible", "syllables": 3},
    {"word": "but", "syllables": 1},
    {"word": "it", "syllables": 1},
    {"word": "is", "syllables": 1},
    {"word": "not", "syllables": 1},
    {"word": "the", "syllables": 1},
    {"word": "lowest", "syllables": 2},
    {"word": "enthalpy", "syllables": 3},
    {"word": "state", "syllables": 1},
    {"word": "possible", "syllables": 3},
    {"word": "because", "syllables": 2},
    {"word": "all", "syllables": 1},
    {"word": "real", "syllables": 1},
    {"word": "substances", "syllables": 3},
    {"word": "begin", "syllables": 2},
    {"word": "to", "syllables": 1},
    {"word": "depart", "syllables": 2},
    {"word": "from", "syllables": 1},
    {"word": "the", "syllables": 1},
    {"word": "ideal", "syllables": 3},
    {"word": "gas", "syllables": 1},
    {"word": "when", "syllables": 1},
    {"word": "cooled", "syllables": 1},
    {"word": "as", "syllables": 1},
    {"word": "they", "syllables": 1},
    {"word": "approach", "syllables": 2},
    {"word": "the", "syllables": 1},
    {"word": "change", "syllables": 1},
    {"word": "of", "syllables": 1},
    {"word": "state", "syllables": 1},
    {"word": "to", "syllables": 1},
    {"word": "liquid", "syllables": 2},
    {"word": "and", "syllables": 1},
    {"word": "then", "syllables": 1},
    {"word": "to", "syllables": 1},
    {"word": "solid", "syllables": 2},
    {"word": "and", "syllables": 1},
    {"word": "the", "syllables": 1},
    {"word": "sum", "syllables": 1},
    {"word": "of", "syllables": 1},
    {"word": "the", "syllables": 1},
    {"word": "enthalpy", "syllables": 3},
    {"word": "of", "syllables": 1},
    {"word": "vapourisation", "syllables": 5},
    {"word": "gas", "syllables": 1},
    {"word": "to", "syllables": 1},
    {"word": "liquid", "syllables": 2},
    {"word": "and", "syllables": 1},
    {"word": "enthalpy", "syllables": 3},
    {"word": "of", "syllables": 1},
    {"word": "fusion", "syllables": 2},
    {"word": "liquid", "syllables": 2},
    {"word": "to", "syllables": 1},
    {"word": "solid", "syllables": 2},
    {"word": "exceeds", "syllables": 2},
    {"word": "the", "syllables": 1},
    {"word": "ideal", "syllables": 3},
    {"word": "gas's", "syllables": 2},
    {"word": "change", "syllables": 1},
    {"word": "in", "syllables": 1},
    {"word": "enthalpy", "syllables": 3},
    {"word": "to", "syllables": 1},
    {"word": "absolute", "syllables": 3},
    {"word": "zero", "syllables": 2},
    {"word": "in", "syllables": 1},
    {"word": "the", "syllables": 1},
    {"word": "quantum", "syllables": 2},
    {"word": "mechanical", "syllables": 4},
    {"word": "description", "syllables": 3},
    {"word": "matter", "syllables": 2},
    {"word": "solid", "syllables": 2},
    {"word": "at", "syllables": 1},
    {"word": "absolute", "syllables": 3},
    {"word": "zero", "syllables": 2},
    {"word": "is", "syllables": 1},
    {"word": "in", "syllables": 1},
    {"word": "its", "syllables": 1},
    {"word": "ground", "syllables": 1},
    {"word": "state", "syllables": 1},
    {"word": "the", "syllables": 1},
    {"word": "point", "syllables": 1},
    {"word": "of", "syllables": 1},
    {"word": "lowest", "syllables": 2},
    {"word": "internal", "syllables": 3},
    {"word": "energy", "syllables": 3},
    {"word": "the", "syllables": 1},
    {"word": "laws", "syllables": 1},
    {"word": "of", "syllables": 1},
    {"word": "the", "syllables": 1},
    {"word": "thermodynamics", "syllables": 5},
    {"word": "indicate", "syllables": 3},
    {"word": "that", "syllables": 1},
    {"word": "absolute", "syllables": 3},
    {"word": "zero", "syllables": 2},
    {"word": "cannot", "syllables": 2},
    {"word": "be", "syllables": 1},
    {"word": "reached", "syllables": 1},
    {"word": "using", "syllables": 2},
    {"word": "only", "syllables": 1},
    {"word": "the", "syllables": 1},
    {"word": "thermodynamic", "syllables": 5},
    {"word": "means", "syllables": 1},
    {"word": "because", "syllables": 2},
    {"word": "the", "syllables": 1},
    {"word": "temperature", "syllables": 4},
    {"word": "of", "syllables": 1},
    {"word": "the", "syllables": 1},
    {"word": "substance", "syllables": 2},
    {"word": "being", "syllables": 2},
    {"word": "cooled", "syllables": 1},
    {"word": "approaches", "syllables": 3},
    {"word": "the", "syllables": 1},
    {"word": "temperature", "syllables": 4},
    {"word": "of", "syllables": 1},
    {"word": "the", "syllables": 1},
    {"word": "cooling", "syllables": 2},
    {"word": "agent", "syllables": 2},
    {"word": "asymptotically", "syllables": 6},
    {"word": "and", "syllables": 1},
    {"word": "a", "syllables": 1},
    {"word": "system", "syllables": 2},
    {"word": "at", "syllables": 1},
    {"word": "absolute", "syllables": 3},
    {"word": "zero", "syllables": 2},
    {"word": "still", "syllables": 1},
    {"word": "possesses", "syllables": 3},
    {"word": "quantum", "syllables": 2},
    {"word": "mechanical", "syllables": 4},
    {"word": "zero-point", "syllables": 3},
    {"word": "energy", "syllables": 3},
    {"word": "the", "syllables": 1},
    {"word": "energy", "syllables": 3},
    {"word": "of", "syllables": 1},
    {"word": "its", "syllables": 1},
    {"word": "ground", "syllables": 1},
    {"word": "state", "syllables": 1},
    {"word": "at", "syllables": 1},
    {"word": "absolute", "syllables": 3},
    {"word": "zero", "syllables": 2},
    {"word": "the", "syllables": 1},
    {"word": "kinetic", "syllables": 3},
    {"word": "energy", "syllables": 3},
    {"word": "of", "syllables": 1},
    {"word": "the", "syllables": 1},
    {"word": "ground", "syllables": 1},
    {"word": "state", "syllables": 1},
    {"word": "cannot", "syllables": 2},
    {"word": "be", "syllables": 1},
    {"word": "removed", "syllables": 2},
    {"word": "scientists", "syllables": 3},
    {"word": "and", "syllables": 1},
    {"word": "technologists", "syllables": 4},
    {"word": "routinely", "syllables": 3},
    {"word": "achieve", "syllables": 2},
    {"word": "temperatures", "syllables": 4},
    {"word": "close", "syllables": 1},
    {"word": "to", "syllables": 1},
    {"word": "absolute", "syllables": 3},
    {"word": "zero", "syllables": 2},
    {"word": "where", "syllables": 1},
    {"word": "matter", "syllables": 2},
    {"word": "exhibits", "syllables": 3},
    {"word": "quantum", "syllables": 2},
    {"word": "effects", "syllables": 2},
    {"word": "such", "syllables": 1},
    {"word": "as", "syllables": 1},
    {"word": "superconductivity", "syllables": 7},
    {"word": "and", "syllables": 1},
    {"word": "superfluidity", "syllables": 6}
]
