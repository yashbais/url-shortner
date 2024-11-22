const shortid = require('shortid')
const Url = require('../models/url')
const globalConstants = require('../utils/globalConstans')
exports.handleGenerateNewShortURL = async (req, res) => {
    try {
        const shortId = shortid()
        const body = req.body

        if(!body.url) return res.status(globalConstants.REQUIRED_INPUT_DATA_MISSING.Code).json({ message: globalConstants.REQUIRED_INPUT_DATA_MISSING.Message })
 
        const result = await Url.create({
            shortId,
            redirectUrl:body.url,
            visitHistory:[]
        })

        return res.status(globalConstants.CREATE_STATUS.Code).json({id:shortId, message: globalConstants.CREATE_STATUS.Message }) 
        
    } catch (err) {
        return res.status(globalConstants.INTERNAL_SERVER_ERROR.Code).json({ message: globalConstants.INTERNAL_SERVER_ERROR.Message })
    }
}


exports.handleRedirectShortURL = async (req, res) => {
    try {
       
        const shortId = req.params.shortId
        if(!shortId) return res.status(globalConstants.REQUIRED_INPUT_DATA_MISSING.Code).json({ message: globalConstants.REQUIRED_INPUT_DATA_MISSING.Message })
        
        const entry = await Url.findOneAndUpdate({shortId},{
                $push: {
                    visitHistory: {timeStamp : Date.now()}
                }
            })
        
            res.redirect(entry.redirectUrl)
        
    } catch (err) {
        return res.status(globalConstants.INTERNAL_SERVER_ERROR.Code).json({ message: globalConstants.INTERNAL_SERVER_ERROR.Message })
    }
}

exports.hanldeAnalytics = async (req, res) => {
    try {
       
        const shortId = req.params.shortId
        if(!shortId) return res.status(globalConstants.REQUIRED_INPUT_DATA_MISSING.Code).json({ message: globalConstants.REQUIRED_INPUT_DATA_MISSING.Message })
        
        const result = await Url.findOne({shortId})
        if(!result)  return res.status(globalConstants.DATA_NOT_AVAILABLE.Code).json({id:shortId, message: globalConstants.DATA_NOT_AVAILABLE.Message })

        return res.status(globalConstants.CREATE_STATUS.Code).json({ 
            data:{
            totalClick:result.visitHistory.length,
            analytics:result.visitHistory
        }, message: globalConstants.CREATE_STATUS.Message }) 

        
    } catch (err) {
        return res.status(globalConstants.INTERNAL_SERVER_ERROR.Code).json({ message: globalConstants.INTERNAL_SERVER_ERROR.Message })
    }
}



