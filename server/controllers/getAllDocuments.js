const uploadpaper = require('../model/uploadpaper')

const getDocs = async (req, res) => {
    try {
        const RawAllDocs = await uploadpaper.find({});
        var AllDocs = Object.keys(RawAllDocs).map(
            function (key) {
                return RawAllDocs[key];
            }
        );
        res.status(200).json({AllDocs})
    } catch (error) {
        console.log("ERROR");
        res.status(404).json(error)
    }
}

const getDocsByID = async (req, res) => {
    try {
        const RawAllDocs = await uploadpaper.find({UserName:req.query.un});
        var AllDocs = Object.keys(RawAllDocs)
        .map(
            function (key) {
                return RawAllDocs[key];
            }
        );
        res.status(200).json({AllDocs})
    } catch (error) {
        console.log("ERROR");
        res.status(404).json(error)
    }
}


const getDocAsBase64 = async (req, res) => {
    try {
        const oid = req.query.oid
        const doc = await uploadpaper.find({_id : oid});
        res.status(200).json((doc[0]))
    } catch (error) {
        console.log("ERROR");
        res.status(404).json(error)
    }
}

module.exports = {
    getDocs,
    getDocsByID,
    getDocAsBase64
}

