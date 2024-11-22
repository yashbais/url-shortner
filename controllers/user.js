const User = require('../models/user')
const globalConstants = require('../utils/globalConstans')

exports.handleGetAllUsers = async (req, res) => {
    try {
        const allDbUsers = await User.find({})
        return res.status(globalConstants.SUCCESS_STATUS.Code).json({ data: allDbUsers, message: globalConstants.SUCCESS_STATUS.Message })
    } catch (err) {
        return res.status(globalConstants.INTERNAL_SERVER_ERROR.Code).json({ message: globalConstants.INTERNAL_SERVER_ERROR.Message })
    }
}

exports.handleGetUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(globalConstants.DATA_NOT_AVAILABLE.Code).json({ message: globalConstants.DATA_NOT_AVAILABLE.Message })
        return res.status(globalConstants.SUCCESS_STATUS.Code).json({ data: user, message: globalConstants.SUCCESS_STATUS.Message })
    } catch (err) {
        return res.status(globalConstants.INTERNAL_SERVER_ERROR.Code).json({ message: globalConstants.INTERNAL_SERVER_ERROR.Message })
    }
}

exports.handleDeleteUserById = async (req, res) => {
    try {
        const id = req.params.id
        const deletedUser = await User.findByIdAndDelete(id)
        if (!deletedUser) return res.status(globalConstants.DATA_NOT_AVAILABLE.Code).json({ id: id, message: globalConstants.DATA_NOT_AVAILABLE.Message })
        return res.status(globalConstants.DELETE_STATUS.Code).json({ message: globalConstants.DELETE_STATUS.Message })
    } catch (err) {
        return res.status(globalConstants.INTERNAL_SERVER_ERROR.Code).json({ message: globalConstants.INTERNAL_SERVER_ERROR.Message })
    }

}

exports.handleUpdateUserById = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body;
        const user = await User.findByIdAndUpdate(id, { ...body })
        if (!user) return res.status(globalConstants.WENT_WRONG.Code).json({  message: globalConstants.WENT_WRONG.Message })
        return res.status(globalConstants.UPDATE_STATUS.Code).json({ message: globalConstants.UPDATE_STATUS.Message })
    } catch (err) {
        return res.status(globalConstants.INTERNAL_SERVER_ERROR.Code).json({ message: globalConstants.INTERNAL_SERVER_ERROR.Message })
    }

}

exports.handleCreateUser = async (req, res) => {
    try {
        const body = req.body;
        const result = await User.create({ ...body })

        if (!result) return res.status(globalConstants.CREATE_STATUS.Code).json({  message: globalConstants.CREATE_STATUS.Message })
            return res.status(globalConstants.CREATE_STATUS.Code).json({id: result._id , message: globalConstants.CREATE_STATUS.Message })

    } catch (err) {
        return res.status(globalConstants.INTERNAL_SERVER_ERROR.Code).json({error:err, message: globalConstants.INTERNAL_SERVER_ERROR.Message })
    }

}

