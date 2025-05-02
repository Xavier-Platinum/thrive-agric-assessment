const service = require("#root/src/domain/ai/service.js");
const AppError = require("#root/src/shared/constants/errors/AppError.js");
const { formatResponse } = require("#root/src/shared/utils/http/response.js");

// suggest name
exports.suggestName = async (req, res, next) => {
  try {
    const input = req.body.input;
    const suggestion = await service.suggestName(input);
    return res.status(200).json(formatResponse({
      success: true,
      statusCode: 200,
      data: suggestion,
      message: 'Name suggestion retrieved successfully',
    }));
  } catch (error) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
  }
}

// explain item
exports.explainItem = async (req, res) => {
  try {
    const itemName = req.body.itemName;
    const explanation = await service.explainItem(itemName);

    if (!explanation) {
      return res.json(formatResponse({
        success: true,
        statusCode: 400,
        data: explanation,
        message: 'No explantion generated',
      }))
    }

    res.status(200).json(formatResponse({
      success: true,
      statusCode: 200,
      data: explanation,
      message: 'Item explanation retrieved successfully',
    }));
  } catch (error) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
  }
}
