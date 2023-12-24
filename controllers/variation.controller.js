const {Variation, Variation_option} = require('../models');


const updateVariationOption = async (req, res) => {
    const {optionId, option_value} = req.body;
    try {
        const variationOption = await Variation_option.findOne({
            id: optionId
        })
        await variationOption.update({type_value: option_value});
        return res.status(204).json({message: "Update Variation option successfully"});    
    } catch (error) {
        res.status(400).json({message: "Update failed"})
    }
}

module.exports = {updateVariationOption}
