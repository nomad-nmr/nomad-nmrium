const nmr_parser_1 = require("nmr-parser");
const Constants_1 = require("../component/reducer/core/Constants");
const Data1DManager = __importStar(require("./data1d/Data1DManager"));
const Datum1D = __importStar(require("./data1d/Spectrum1D"));
const Data2DManager = __importStar(require("./data2d/Data2DManager"));
const Datum2D = __importStar(require("./data2d/Spectrum2D"));
const MigrationManager_1 = require("./migration/MigrationManager");
const Molecule = __importStar(require("./molecules/Molecule"));




async function addBruker(options, data, usedColors) {
    const spectra = [];
    let result = await (0, nmr_parser_1.fromBruker)(data, {
        xy: true,
        noContours: true,
        keepOriginal: true,
    });
    let entries = result;
    for (let entry of entries) {
        let { info, dependentVariables } = entry;
        if (info.dimension === 1) {
            if (dependentVariables[0].components) {
                spectra.push(Data1DManager.fromBruker(entry, {
                    ...options,
                    display: { ...options.display },
                }, usedColors));
            }
        }
        else if (info.dimension === 2) {
            if (info.isFt) {
                spectra.push(Data2DManager.fromBruker(entry, {
                    ...options,
                    info,
                    display: { ...options.display },
                }, usedColors));
            }
            else {
                // in case of 2D FID spectrum
            }
        }
    }
    return spectra;
}
exports.addBruker = addBruker;
// handle zip files
async function fromZip(zipFiles) {
    const spectra = [];
    for (let zipFile of zipFiles) {
        await addBruker(spectra, { display: { name: zipFile.name } }, zipFile.binary);
    }
    return spectra;
}
exports.fromZip = fromZip;
function toJSON(state, dataExportOption = DataExportOptions.DATA_SOURCE) {
    const { data, molecules: mols, correlations, multipleAnalysis, toolOptions: { data: { exclusionZones }, }, } = state || {
        data: [],
        molecules: [],
        correlations: {},
        multipleAnalysis: {},
        exclusionZones: {},
    };
    const spectra = data.map((ob) => {
        return ob.info.dimension === 1
            ? Datum1D.toJSON(ob, dataExportOption)
            : Datum2D.toJSON(ob, dataExportOption);
    });
    const preferences = getPreferences(state);
    const molecules = mols.map((mol) => Molecule.toJSON(mol));
    return {
        spectra,
        molecules,
        correlations,
        multipleAnalysis,
        exclusionZones,
        version: MigrationManager_1.CURRENT_EXPORT_VERSION,
        preferences,
    };
}
exports.toJSON = toJSON;
